import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { SchemaObject } from '@kleiolab/lib-redux';
import { InfPersistentItem, InfTemporalEntity } from '@kleiolab/lib-sdk-lb3';
import { GvFieldProperty } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { FormCreateEntityComponent } from '../../form-create-entity/form-create-entity.component';
import { DisableIfHasStatement } from '../../search-existing-entity/search-existing-entity.component';
import { CtrlEntityModel } from '../ctrl-entity.component';


export interface CtrlEntityDialogData {
  classAndTypePk: ClassAndTypePk;
  pkUiContext: number;
  alreadyInProjectBtnText: string
  notInProjectBtnText: string
  notInProjectClickBehavior: NotInProjectClickBehavior
  hiddenProperty: GvFieldProperty
  initVal$: Observable<CtrlEntityModel>
  showAddList: boolean
  disableIfHasStatement: DisableIfHasStatement,
  defaultSearch: string;
}

export interface ClassAndTypePk { pkClass: number, pkType: number }

export type CreateOrAddEntityAction = 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added';
export type NotInProjectClickBehavior = 'addToProject' | 'selectOnly';

export interface CreateOrAddEntityEvent {
  action: CreateOrAddEntityAction,
  pkEntity: number
  pkClass: number
}



@Component({
  selector: 'gv-ctrl-entity-dialog',
  templateUrl: './ctrl-entity-dialog.component.html',
  styleUrls: ['./ctrl-entity-dialog.component.scss']
})
export class CtrlEntityDialogComponent implements OnDestroy, OnInit {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  classAndTypePk: ClassAndTypePk;
  pkUiContext: number;
  alreadyInProjectBtnText: string;
  notInProjectBtnText: string;
  notInProjectClickBehavior: NotInProjectClickBehavior;


  // input element on the right side
  searchInput: string;

  // actual search str
  searchString$ = new BehaviorSubject<string>('');

  classLabel$: Observable<string>;

  classType$: Observable<string>;

  initVal$: Observable<InfTemporalEntity | InfPersistentItem>

  @ViewChild(FormCreateEntityComponent, { static: true }) createEntity: FormCreateEntityComponent;

  constructor(
    private p: ActiveProjectService,
    private c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<CtrlEntityDialogComponent, CtrlEntityModel>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlEntityDialogData
  ) {
    this.classAndTypePk = data.classAndTypePk
    this.pkUiContext = data.pkUiContext
    this.alreadyInProjectBtnText = data.alreadyInProjectBtnText
    this.notInProjectBtnText = data.notInProjectBtnText
    this.notInProjectClickBehavior = data.notInProjectClickBehavior

    this.initVal$ = this.data.initVal$.pipe(map(v => v ? v.temporal_entity || v.persistent_item : null))

    if (this.data.defaultSearch) this.searchString$.next(this.data.defaultSearch);
  }


  ngOnInit() {
    // this.localStore = this.ngRedux.configureSubStore(this.basePath, createOrAddEntityReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    if (!this.classAndTypePk || !this.classAndTypePk.pkClass) throw new Error('You must provide classAndTypePk as Component @Input().')
    if (!this.alreadyInProjectBtnText) throw Error('please provide a alreadyInProjectBtnText')
    if (!this.notInProjectBtnText) throw Error('please provide a notInProjectBtnText')
    if (!this.notInProjectClickBehavior) throw Error('please provide a notInProjectClickBehavior')

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


  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onNotInProjectClicked(pkEntity: number) {
    if (this.notInProjectClickBehavior == 'selectOnly') {
      this.onCreateOrAdd({
        action: 'notInProjectClicked',
        pkEntity,
        pkClass: this.classAndTypePk.pkClass
      })
    }
    else if (this.notInProjectClickBehavior == 'addToProject') {
      this.p.addEntityToProject(pkEntity, (schemaObject: SchemaObject) => {
        this.onCreateOrAdd({
          action: 'added',
          pkEntity,
          pkClass: this.classAndTypePk.pkClass
        })
      })
    }
  }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onAlreadyInProjectClicked(pkEntity: number) {
    this.onCreateOrAdd({
      action: 'alreadyInProjectClicked',
      pkEntity,
      pkClass: this.classAndTypePk.pkClass
    })
  }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onCreated(entity: InfPersistentItem | InfTemporalEntity) {
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

  // When user confirms that the form is filled
  onFormOk() {
    this.createEntity.submitted = true
    if (this.createEntity.formFactory.formGroup.valid) {
      this.p.dfh$.class$.by_pk_class$.key(this.classAndTypePk.pkClass).pipe(
        first(i => !!i)
      ).subscribe((klass) => {
        const value: CtrlEntityModel = this.createEntity.formFactory.formGroupFactory.valueChanges$.value
        this.dialogRef.close(value)
      })
    } else {
      const f = this.createEntity.formFactory.formGroup.controls.childControl as FormArray;
      U.recursiveMarkAsTouched(f)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
