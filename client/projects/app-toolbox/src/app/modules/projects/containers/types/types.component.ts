import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DfhConfig, SysConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { IAppState, InfActions, SchemaService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineLatestOrEmpty, sortAbc } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { PropertiesTreeDialogComponent, PropertiesTreeDialogData } from 'projects/app-toolbox/src/app/modules/base/components/properties-tree-dialog/properties-tree-dialog.component';
import { BaseModalsService } from 'projects/app-toolbox/src/app/modules/base/services/base-modals.service';
import { PaginationService } from 'projects/app-toolbox/src/app/modules/base/services/pagination.service';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { ReduxMainService } from 'projects/lib-redux/src/lib/redux-store/state-schema/services/reduxMain.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToFieldPage, fieldToGvFieldTargets } from '../../../base/base.helpers';

interface TypeItem {
  pkEntity: number
  label: string,
  labelLanguage: string,
  definition?: string
}

// @WithSubStore({
//   basePathMethodName: 'getBasePath',
//   localReducer: typesReducer
// })
@Component({
  selector: 'gv-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  // localStore: ObservableStore<Types>;

  // path to the substore
  @Input() basePath;

  // has type property
  @Input() pkClass: number;

  typeClassLabel$: Observable<string>;

  // types
  items$: Observable<TypeItem[]>;
  typePks$: Observable<number[]>;

  t: TabLayout;

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService,
    public ap: ActiveProjectPipesService,
    public inf: InfActions,
    public dialog: MatDialog,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
    public b: InformationBasicPipesService,
    public i: InformationPipesService,
    private pag: PaginationService,
    public s: SchemaService,
    private m: BaseModalsService,
    private dataService: ReduxMainService
  ) {
  }

  getBasePath = () => this.basePath;
  getTypePk(_, item: TypeItem) {
    return item.pkEntity;
  }

  ngOnInit() {
    // this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

    this.typeClassLabel$ = this.c.pipeClassLabel(this.pkClass)

    this.typeClassLabel$.pipe(takeUntil(this.destroy$)).subscribe((label) => {
      this.t.setTabTitle(label + ' – Controlled Vocabulary')
    })

    this.typePks$ = this.b.pipePersistentItemPksByClass(this.pkClass)

    const appeAndDefFields$ = this.c.pipeBasicAndSpecificFields(this.pkClass).pipe(
      map(fieldDefinitions => {
        let appeField: Field, definitionField: Field;
        fieldDefinitions.forEach(f => {
          // take only appellation for language, or ...
          if (f.property.fkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF) {
            appeField = f;
          }
          // ... entit definition
          else if (f.property.fkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
            definitionField = f;
          }
        })
        return { appeField, definitionField }
      })
    )



    // const appeAndLangFields$ = appeAndDefFields$.pipe(
    //   switchMap(appeAndDefFields =>
    //     this.c.pipeBasicAndSpecificFields(appeAndDefFields.appeField.listDefinitions[0].targetClass).pipe(
    //       map(fieldDefs => fieldDefs.filter(f => f.listDefinitions[0].listType.language || f.listDefinitions[0].listType.appellation))
    //     )
    //   )
    // )

    const itemsCache: { [pkEntity: number]: boolean } = {};

    this.items$ = combineLatest(this.p.pkProject$, appeAndDefFields$, this.p.defaultLanguage$, this.typePks$).pipe(
      switchMap(([pkProject, appeAndDefFields, defaultLanguage, typePks]) => combineLatestOrEmpty(
        typePks.map(pkEntity => {
          const scope: GvFieldPageScope = { inProject: pkProject };
          const source: GvFieldSourceEntity = { fkInfo: pkEntity }

          this.pag.addPageLoaderFromField(
            pkProject,
            appeAndDefFields.definitionField,
            source,
            1,
            0,
            this.destroy$,
            scope
          )

          // pipe the properties of the naming
          const entityLabel$ = this.ap.streamEntityPreview(pkEntity).pipe(
            map((e) => e.entity_label)
          )

          const definition$ = this.i.pipeFieldPage(
            fieldToFieldPage(appeAndDefFields.definitionField, source, scope, 1, 0),
            fieldToGvFieldTargets(appeAndDefFields.definitionField),
            false
          )

          return combineLatest(entityLabel$, definition$).pipe(
            map(([entityLabel, definition]) => {

              const item: TypeItem = {
                label: entityLabel,
                labelLanguage: '',
                pkEntity,
                definition: definition.statements.map(s => s.targetLabel).join('')
              }

              return item;
            })
          )
        }
        )
      )),
      sortAbc(n => n.label),
    )



  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * called when user clicks on edit
   */
  onEdit(type: TypeItem) {
    this.edit(type.pkEntity)
  }

  /**
   * called when user clicks on remove
   */
  onRemove(type: TypeItem) {
    this.p.openRemoveEntityDialog(type.label, type.pkEntity)
  }

  /**
   * called when user clicks on add
  */
  onAddOrCreate() {

    this.m.openModalCreateOrAddEntity({
      alreadyInProjectBtnText: 'Edit',
      notInProjectClickBehavior: 'addToProject',
      notInProjectBtnText: 'Add',
      classAndTypePk: { pkClass: this.pkClass, pkType: undefined },
      pkUiContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE
    })

      .subscribe(result => {
        if (result.action === 'added' || result.action === 'created') {
          this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            // this.s.store(this.s.api.typeOfProject(pkProject, result.pkEntity), pkProject)
            this.dataService.loadInfResource(result.pkEntity, pkProject)
          })
        } else if (result.action === 'alreadyInProjectClicked') {
          this.edit(result.pkEntity)
        }
      })
  }



  /**
   * Opens dialog for editing type
   * @param pkEntity
   */
  edit(pkEntity: number) {
    const data: PropertiesTreeDialogData = {
      appContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE,
      pkClass$: of(this.pkClass),
      source: { fkInfo: pkEntity },
      readonly$: new BehaviorSubject(false),
      showOntoInfo$: new BehaviorSubject(false),
    }
    const dialogRef = this.dialog.open(PropertiesTreeDialogComponent, {
      height: '90%',
      width: '90%',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
