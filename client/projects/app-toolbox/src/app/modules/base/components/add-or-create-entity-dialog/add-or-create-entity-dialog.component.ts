import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ClassAndTypePk, ConfigurationPipesService } from '@kleiolab/lib-queries';
import { InfResource, InfStatement } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';


export interface AddOrCreateEntityDialogData {
  classAndTypePk: ClassAndTypePk;
  pkUiContext: number;
}

export type CreateOrAddEntityAction = 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added';
export type NotInProjectClickBehavior = 'addToProject' | 'selectOnly';

export interface CreateOrAddEntityEvent {
  action: CreateOrAddEntityAction,
  pkEntity: number
  pkClass: number
}



@Component({
  selector: 'gv-add-or-create-entity-dialog',
  templateUrl: './add-or-create-entity-dialog.component.html',
  styleUrls: ['./add-or-create-entity-dialog.component.scss']
})
export class AddOrCreateEntityDialogComponent implements OnDestroy, OnInit {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  classAndTypePk: ClassAndTypePk;
  pkUiContext: number;

  // input element on the right side
  searchInput: string;
  selectedPkEntity: number;

  // actual search str
  searchString$ = new Subject<string>();

  classLabel$: Observable<string>;

  classType$: Observable<string>;

  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private p: ActiveProjectService,
    private c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<AddOrCreateEntityDialogComponent, CreateOrAddEntityEvent>,
    @Inject(MAT_DIALOG_DATA) public data: AddOrCreateEntityDialogData
  ) {
    this.classAndTypePk = data.classAndTypePk
    this.pkUiContext = data.pkUiContext
  }


  ngOnInit() {
    // this.localStore = this.ngRedux.configureSubStore(this.basePath, createOrAddEntityReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    if (!this.classAndTypePk || !this.classAndTypePk.pkClass) throw new Error('You must provide classAndTypePk as Component @Input().')

    this.classLabel$ = this.c.pipeClassLabel(this.classAndTypePk.pkClass)
    this.classType$ = this.p.dfh$.class$.by_pk_class$.key(this.classAndTypePk.pkClass).pipe(
      filter(klass => !!klass),
      map(klass => {
        const systype = klass.basic_type;
        if (systype === DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || systype === 30) return 'peIt';
        else return 'teEnt';
      })
    )


  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(term: string) {
    this.searchString$.next(term)
  }


  // // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  // onNotInProjectClicked(pkEntity: number) {
  //   if (this.notInProjectClickBehavior == 'selectOnly') {
  //     this.onCreateOrAdd({
  //       action: 'notInProjectClicked',
  //       pkEntity,
  //       pkClass: this.classAndTypePk.pkClass
  //     })
  //   }
  //   else if (this.notInProjectClickBehavior == 'addToProject') {
  //     this.p.addEntityToProject(pkEntity, (schemaObject: SchemaObject) => {
  //       this.onCreateOrAdd({
  //         action: 'added',
  //         pkEntity,
  //         pkClass: this.classAndTypePk.pkClass
  //       })
  //     })
  //   }
  // }

  // // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  // onAlreadyInProjectClicked(pkEntity: number) {
  //   this.onCreateOrAdd({
  //     action: 'alreadyInProjectClicked',
  //     pkEntity,
  //     pkClass: this.classAndTypePk.pkClass
  //   })
  // }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onCreated(entity: InfResource | InfStatement) {
    this.onCreateOrAdd({
      action: 'created',
      pkEntity: entity.pk_entity,
      pkClass: this.classAndTypePk.pkClass
    })
  }

  onCreateOrAdd(res) {
    this.dialogRef.close(res);
  }

  closeAddForm() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onMoreClick(pkEntity: number) {
    this.selectedPkEntity = pkEntity;
  }

  onBackClick() {
    this.selectedPkEntity = undefined;
  }
}
