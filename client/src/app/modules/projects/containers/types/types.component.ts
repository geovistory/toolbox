import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, IAppState, sortAbc, SysConfig } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { PropertiesTreeDialogComponent, PropertiesTreeDialogData } from 'app/modules/base/components/properties-tree-dialog/properties-tree-dialog.component';
import { ConfigurationPipesService } from 'app/core/redux-queries/services/configuration-pipes.service';
import { InformationBasicPipesService } from 'app/modules/base/services/information-basic-pipes.service';
import { InformationPipesService } from 'app/modules/base/services/information-pipes.service';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { values } from 'ramda';
import { BehaviorSubject, Observable, of, Subject, combineLatest } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { Types } from './api/types.models';
import { typesReducer } from './api/types.reducer';
import { FieldDefinition, TemporalEntityItem } from 'app/modules/base/components/properties-tree/properties-tree.models';
import { createPaginateBy } from 'app/modules/base/components/temporal-entity-list/temporal-entity-list.component';
import { PaginationService } from 'app/modules/base/services/pagination.service';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';

interface TypeItem {
  pkEntity: number
  label: string,
  labelLanguage: string,
  definition?: string
}

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typesReducer
})
@Component({
  selector: 'gv-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit, OnDestroy, SubstoreComponent {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Types>;

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
    public inf: InfActions,
    public dialog: MatDialog,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
    public b: InformationBasicPipesService,
    public i: InformationPipesService,
    private pag: PaginationService,
    public s: SchemaObjectService
  ) {
  }

  getBasePath = () => this.basePath;
  getTypePk(_, item: TypeItem) {
    return item.pkEntity;
  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

    this.typeClassLabel$ = this.c.pipeClassLabel(this.pkClass)

    this.typeClassLabel$.pipe(takeUntil(this.destroy$)).subscribe((label) => {
      this.t.setTabTitle(label + ' – Controlled Vocabulary')
    })

    this.typePks$ = this.b.pipePersistentItemPksByClass(this.pkClass)

    const appeAndDefFields$ = this.c.pipeFieldDefinitions(this.pkClass).pipe(
      map(fieldDefinitions => {
        let appeField: FieldDefinition, definitionField: FieldDefinition;
        fieldDefinitions.forEach(f => {
          // take only appellation for language, or ...
          if (f.listDefinitions[0].property.pkProperty === 1111) {
            appeField = f;
          }
          // ... entit definition
          else if (f.listDefinitions[0].fkClassField === 219) {
            definitionField = f;
          }
        })
        return { appeField, definitionField }
      })
    )

    const appeAndLangFields$ = appeAndDefFields$.pipe(
      switchMap(appeAndDefFields =>
        this.c.pipeFieldDefinitions(appeAndDefFields.appeField.listDefinitions[0].targetClass).pipe(
          map(fieldDefs => fieldDefs.filter(f => f.listType === 'language' || f.listType === 'appellation'))
        )
      )
    )

    const itemsCache: { [pkEntity: number]: boolean } = {};

    this.items$ = combineLatest(this.p.pkProject$, appeAndDefFields$, appeAndLangFields$, this.p.defaultLanguage$).pipe(
      switchMap(([pkProject, appeAndDefFields, appeAndLangFields, defaultLanguage]) => this.typePks$.pipe(
        switchMap(typePks => combineLatestOrEmpty(
          typePks.map(pkEntity => {
            // get appellation
            const l = appeAndDefFields.appeField.listDefinitions[0],
              limit = 10,
              offset = 0,
              paginateBy = createPaginateBy(l, pkEntity)

            if (!itemsCache[pkEntity]) {
              itemsCache[pkEntity] = true;

              this.pag.temporalEntity.addPageLoader(
                pkProject,
                appeAndDefFields.appeField.listDefinitions[0],
                pkEntity,
                limit,
                offset,
                this.destroy$
              )
              this.p.inf.persistent_item.loadMinimal(pkProject, pkEntity)
            }
            // pipe the properties of the naming
            const namings$: Observable<TemporalEntityItem[]> = this.i.pipeTemporalEntityTableRows(
              paginateBy,
              limit,
              offset,
              pkProject,
              l,
              appeAndLangFields
            ).pipe(
              map(items => items.filter(item => {
                if (!item) return false;
                const rs = values(item.row)
                if (!rs || !rs.length) return false;
                return !rs.includes(undefined);
              }))
            )

            const definition$ = this.p.inf$.text_property$
              .by_fk_concerned_entity__fk_class_field_indexed$(pkEntity + '_'
                + appeAndDefFields.definitionField.listDefinitions[0].fkClassField).pipe(
                  map(d => {
                    const definitions = values(d);
                    if (!definitions || !definitions.length) return { string: undefined }
                    let definition = definitions.find(def => !!def && def.fk_language === defaultLanguage.pk_entity);
                    definition = definition ? definition : definitions[0];
                    return definition;
                  })
                )

            return combineLatest(namings$, definition$).pipe(
              map(([namings, definition]) => {
                // get one naming of the naming of that type
                let naming = namings.find(n =>
                  !!values(n.row).find(r => (!!r && r.pkProperty === 1113 && r.firstItem.statement.fk_object_info === defaultLanguage.pk_entity))
                )
                naming = naming ? naming : namings[0];

                // get the appellation string and the language.
                let spelling, language;
                if (naming) {
                  spelling = values(naming.row).find(r => (r.pkProperty === 1113)).label;
                  language = values(naming.row).find(r => (r.pkProperty === 1112)).label;
                }

                const item: TypeItem = {
                  label: spelling,
                  labelLanguage: language,
                  pkEntity,
                  definition: definition.string
                }

                return item;
              })
            )
          }))
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

    this.p.openModalCreateOrAddEntity({
      alreadyInProjectBtnText: 'Edit',
      notInProjectClickBehavior: 'addToProject',
      notInProjectBtnText: 'Add',
      classAndTypePk: { pkClass: this.pkClass, pkType: undefined },
      pkUiContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE
    }).subscribe(result => {
      if (result.action === 'added' || result.action === 'created') {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
          this.s.store(this.s.api.typeOfProject(pkProject, result.pkEntity), pkProject)
          // this.inf.persistent_item.typeOfProject(pkProject, result.pkEntity)
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
      pkEntity$: of(pkEntity),
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
