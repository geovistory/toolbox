import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActiveProjectService, InfPersistentItem, InfPersistentItemApi, InfTemporalEntity } from 'app/core';
import { SchemaObject } from 'app/core/store/model';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { DfhConfig } from '../../shared/dfh-config';

export interface ClassAndTypePk { pkClass: number, pkType: number };

export type CreateOrAddEntityAction = 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added';
export type NotInProjectClickBehavior = 'addToProject' | 'selectOnly';

export interface CreateOrAddEntityEvent {
  action: CreateOrAddEntityAction,
  pkEntity: number
}


@Component({
  selector: 'gv-create-or-add-entity',
  templateUrl: './create-or-add-entity.component.html',
  styleUrls: ['./create-or-add-entity.component.css']
})
export class CreateOrAddEntityComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  @Input() classAndTypePk: ClassAndTypePk;
  @Input() pkUiContext: number;
  @Input() alreadyInProjectBtnText: string;
  @Input() notInProjectBtnText: string;
  @Input() notInProjectClickBehavior: NotInProjectClickBehavior;


  // emits the nested PeIt or TeEn, no matter if 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added' !
  @Output() done = new EventEmitter<CreateOrAddEntityEvent>();

  // on cancel
  @Output() cancel = new EventEmitter<void>();

  searchString$ = new Subject<string>();

  classLabel$: Observable<string>;

  classType$: Observable<string>;

  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private peItApi: InfPersistentItemApi,
    private p: ActiveProjectService,
    private c: ConfigurationPipesService,
    private dialog: MatDialog
  ) {
    // super()
  }

  // getBasePath = () => this.basePath;

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
        if (systype === DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM) return 'peIt';
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

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onNotInProjectClicked(pkEntity: number) {
    if (this.notInProjectClickBehavior == 'selectOnly') {
      this.done.emit({
        action: 'notInProjectClicked',
        pkEntity
      })
    }
    else if (this.notInProjectClickBehavior == 'addToProject') {
      this.p.addPeItToProject(pkEntity, (schemaObject: SchemaObject) => {
        this.done.emit({
          action: 'added',
          pkEntity
        })
      })
    }
  }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onAlreadyInProjectClicked(pkEntity: number) {
    this.done.emit({
      action: 'alreadyInProjectClicked',
      pkEntity
    })
  }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onCreated(entity: InfPersistentItem | InfTemporalEntity) {
    this.done.emit({
      action: 'created',
      pkEntity: entity.pk_entity
    })
  }

}
