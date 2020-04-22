import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SysConfig, ActiveProjectService, InfRole, InfTemporalEntityApi } from 'app/core';
import { AddOrCreateEntityModalComponent, AddOrCreateEntityModalData } from 'app/modules/base/components/add-or-create-entity-modal/add-or-create-entity-modal.component';
import { CreateOrAddEntityEvent, ClassAndTypePk, NotInProjectClickBehavior } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.component';
import { BehaviorSubject, Subject, combineLatest, Observable } from 'rxjs';
import { ListDefinition } from '../properties-tree/properties-tree.models';
import { first, takeUntil } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';

type ActiveElement = 'add-existing-statements' | 'create-form' | 'create-or-add'

export interface AddDialogData {
  listDefinition: ListDefinition;

  // primary key of the source entity
  pkEntity: number;
}

@Component({
  selector: 'gv-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  activeElement$ = new BehaviorSubject<ActiveElement>('add-existing-statements')
  showOntoInfo$ = new BehaviorSubject(false)
  readonly$ = new BehaviorSubject(false)
  isLeafItemList: boolean;

  searchString$ = new Subject<string>();

  classAndTypePk: ClassAndTypePk;
  alreadyInProjectBtnText: string;
  notInProjectBtnText: string;
  notInProjectClickBehavior: NotInProjectClickBehavior;

  loading$ = new BehaviorSubject(false);

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
    public teEnApi: InfTemporalEntityApi
  ) {
    this.isLeafItemList = ['appellation', 'language', 'place', 'text-property', 'lang-string', 'entity-preview']
      .includes(data.listDefinition.listType);


    this.classAndTypePk = { pkClass: data.listDefinition.targetClass, pkType: undefined }
    this.alreadyInProjectBtnText = 'Select'
    this.notInProjectBtnText = 'Add and Select'
    this.notInProjectClickBehavior = 'selectOnly'

  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close()
  }
  onNext() {
    const isValueLike = ['appellation', 'language', 'place', 'text-property', 'lang-string']
      .includes(this.data.listDefinition.listType)

    if (isValueLike || this.data.listDefinition.identityDefiningForTarget) {
      this.activeElement$.next('create-form')
    }
    else {
      this.activeElement$.next('create-or-add')
    }
  }
  onSelected(pkEntity: number, isInProject: boolean) {
    const lDef = this.data.listDefinition;

    this.loading$.next(true)

    // create the role to add
    const r: Partial<InfRole> = {}
    if (lDef.isOutgoing) {
      r.fk_temporal_entity = this.data.pkEntity
      r.fk_entity = pkEntity
    } else {
      r.fk_entity = this.data.pkEntity
      r.fk_temporal_entity = pkEntity
    }
    r.fk_property = lDef.property.pkProperty;
    r.fk_property_of_property = lDef.property.pkPropertyOfProperty;


    combineLatest(
      this.p.pkProject$,
      this.c.pipeModelOfClass(lDef.targetClass)
    )
      .pipe(
        first(([pk, model]) => (!!pk && !!model)),
        takeUntil(this.destroy$)
      )
      .subscribe(([pkProject, model]) => {

        // create api call for upserting the role
        const obs$: Observable<any>[] = [this.p.inf.role.upsert([r], pkProject).resolved$.pipe(first(x => !!x))]

        if (!isInProject && model == 'temporal_entity') {
          // crate api call for adding teEnToProject
          const apiCall = this.teEnApi.addToProject(pkProject, pkEntity)
          obs$.push(apiCall)
        }

        combineLatest(obs$).subscribe(x => {
          this.dialogRef.close()
        });
      })

  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(term: string) {
    this.searchString$.next(term)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
