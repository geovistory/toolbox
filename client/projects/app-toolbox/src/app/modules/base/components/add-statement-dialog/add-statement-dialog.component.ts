import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, FieldTargetClass, WarSelector } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, InfStatementWithRelations, SubfieldPageControllerService, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToWarFieldChangeId } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';

export interface AddStatementDialogData {
  field: Field;
  targetClass: number

  // primary key of the source entity
  source: GvFieldSourceEntity;
}

@Component({
  selector: 'gv-add-statement-dialog',
  templateUrl: './add-statement-dialog.component.html',
  styleUrls: ['./add-statement-dialog.component.scss']
})
export class AddStatementDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  pkClass_target$: Observable<number>;
  pkClass_target: number;
  fieldWithOneTarget: Field;
  fieldTargetClass: FieldTargetClass;
  loading$ = new BehaviorSubject(false);

  // for titles
  classLabel$: Observable<string>;
  pkEntity_source: number;

  // for the slider
  sliderView: 'right' | 'left' = 'left';

  // for the search-entity-list
  searchInput: string;
  searchString$ = new BehaviorSubject<string>('');
  selectedPkEntity$ = new BehaviorSubject<number>(undefined);
  selectedInProject$: Observable<boolean>;

  // for entity card
  pkProject: number;
  showOntoInfo$ = new BehaviorSubject(false);
  entityCardReadOnly$ = new BehaviorSubject(true);
  entityCardScope: GvFieldPageScope;
  source$: Observable<GvFieldSourceEntity>;

  constructor(
    public p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    public c: ConfigurationPipesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddStatementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddStatementDialogData,
    public paginationApi: SubfieldPageControllerService,
    private dataService: ReduxMainService,
    private paginationService: PaginationService,
    private warSelector: WarSelector
  ) {
    this.pkClass_target$ = of(data.targetClass);
    this.pkClass_target = data.targetClass;
    this.pkEntity_source = data.source.fkInfo;

    // restrict the add dialog to only one class
    this.fieldTargetClass = this.data.field.targets[this.data.targetClass]
    if (!this.fieldTargetClass) throw new Error('target type is not retrievable for class: ' + this.data.targetClass);
    this.fieldWithOneTarget = {
      ...this.data.field,
      targets: { [this.data.targetClass]: this.fieldTargetClass }
    }
  }

  ngOnInit() {
    // class label
    this.classLabel$ = this.pkClass_target$.pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass)),
      takeUntil(this.destroy$)
    );

    // pkProject
    this.p.pkProject$.pipe(takeUntil(this.destroy$))
      .subscribe(n => this.pkProject = n);

    // create the source for the gv-entity-card
    this.source$ = this.selectedPkEntity$.pipe(
      map(pkEntity => (pkEntity ? { fkInfo: pkEntity } : undefined)),
      takeUntil(this.destroy$)
    )
  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(term: string) {
    this.searchString$.next(term)
  }

  private triggerPageReloads(pkProject: number, fkInfo: number, field: Field) {
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, fkInfo, field);
    this.paginationService.reloadPagesOfField(fieldId);
  }

  onClose() {
    this.dialogRef.close()
  }

  onSaved() {
    this.triggerPageReloads(this.pkProject, this.data.source.fkInfo, this.data.field)
    this.onClose()
  }

  onSelect() {
    this.loading$.next(true)
    const f = this.fieldWithOneTarget;

    // create the statement to add
    const r: Partial<InfStatementWithRelations> = {}
    if (f.isOutgoing) {
      r.fk_subject_info = this.data.source.fkInfo
      r.object_resource = { pk_entity: this.selectedPkEntity$.value, fk_class: this.pkClass_target }
    } else {
      r.fk_object_info = this.data.source.fkInfo
      r.subject_resource = { pk_entity: this.selectedPkEntity$.value, fk_class: this.pkClass_target }
    }
    r.fk_property = f.property.fkProperty;
    r.fk_property_of_property = f.property.fkPropertyOfProperty;

    this.dataService.upsertInfStatementsWithRelations(this.pkProject, [r])
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => this.onSaved());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onMoreClick(pkEntity: number) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(pkEntity)

    this.selectedInProject$ = this.warSelector.entity_preview$.by_project__pk_entity$.key(this.pkProject + '_' + pkEntity).pipe(
      map(item => !!item.fk_project),
      startWith(false)
    )

    if (this.sliderView != 'right') {
      this.sliderView = 'right';
      setTimeout(() => {
        this.selectedPkEntity$.next(pkEntity);
      }, 350)
    } else {
      this.selectedPkEntity$.next(undefined)
      setTimeout(() => {
        this.selectedPkEntity$.next(pkEntity);
      }, 0)
    }
  }

  onBackClick() {
    this.sliderView = 'left';
    this.selectedPkEntity$.next(undefined);
  }
}
