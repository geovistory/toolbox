import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, IAppState, sortAbc, SysConfig } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { PropertiesTreeDialogComponent, PropertiesTreeDialogData } from 'app/modules/information/new-components/properties-tree-dialog/properties-tree-dialog.component';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { InformationBasicPipesService } from 'app/modules/information/new-services/information-basic-pipes.service';
import { InformationPipesService } from 'app/modules/information/new-services/information-pipes.service';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { values } from 'ramda';
import { BehaviorSubject, Observable, of, Subject, combineLatest } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { Types } from './api/types.models';
import { typesReducer } from './api/types.reducer';
import { FieldDefinition, TemporalEntityItem } from 'app/modules/information/new-components/properties-tree/properties-tree.models';
import { createPaginateBy } from 'app/modules/information/new-components/temporal-entity-list/temporal-entity-list.component';
import { PaginationService } from 'app/modules/information/new-services/pagination.service';

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
  @Input() pkProperty: number;

  //  type class
  typeClassPk$: Observable<number>;
  typedClassPk$: Observable<number>;
  typeClassLabel$: Observable<string>;
  typedClassLabel$: Observable<string>;


  // types
  items$: Observable<TypeItem[]>;
  typePks$: Observable<number[]>;
  // // flag indicatig if add form is visible
  // @select() add$: Observable<boolean>;

  // // object containing data for edit form. If truthy, edit form is visible.
  // @select() edit$: Observable<InfPersistentItem>;

  // flag indicatig if loaing info is visible
  // @select() loading$: Observable<boolean>;

  t: TabLayout;

  constructor(
    // protected rootEpics: RootEpics,
    // private epics: TypesAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService,
    public inf: InfActions,
    public dialog: MatDialog,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
    public b: InformationBasicPipesService,
    public i: InformationPipesService,
    private pag: PaginationService
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


    const hasTypeProp$ = this.p.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      filter(object => !!object && Object.keys(object).length > 0),
      map((object) => values(object).find(prop => prop.pk_property === this.pkProperty)),
      map((prop) => ({
        pk_typed_class: prop.has_domain,
        pk_type_class: prop.has_range,
      })),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    this.typeClassPk$ = hasTypeProp$.pipe(
      map(item => item.pk_type_class),
      shareReplay({ bufferSize: 1, refCount: true })

    )
    this.typedClassPk$ = hasTypeProp$.pipe(
      map(item => item.pk_typed_class),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    this.typedClassLabel$ = this.typedClassPk$.pipe(
      switchMap((pk) => this.c.pipeClassLabel(pk).pipe(
        tap((typedClassLabel) => {
          this.t.setTabTitle(typedClassLabel + ' Types')
        })
      )),
    )

    this.typeClassLabel$ = this.typeClassPk$.pipe(
      switchMap((pk) => this.c.pipeClassLabel(pk)),
    )

    this.typePks$ = this.typeClassPk$.pipe(
      switchMap(typeClassPk => this.b.pipePersistentItemPksByClass(typeClassPk))
    )

    const appeAndDefFields$ = this.typeClassPk$.pipe(
      // get editable fieldDefinitions
      switchMap((fkClass) => this.c.pipeFieldDefinitions(fkClass).pipe(
        map(fieldDefinitions => {
          let appeField: FieldDefinition, definitionField: FieldDefinition;
          fieldDefinitions.forEach(f => {
            // take only appellation for language, or ...
            if (f.listDefinitions[0].pkProperty === 1111) {
              appeField = f;
            }
            // ... entit definition
            else if (f.listDefinitions[0].fkClassField === 219) {
              definitionField = f;
            }
          })
          return { appeField, definitionField }
        })
      ))
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
              //  console.log('a', JSON.stringify({ paginateBy, limit, offset }))
              // this.p.inf$.role$.pagination$.pipePageLoadNeeded(paginateBy, limit, offset).pipe(
              //   filter(loadNeeded => loadNeeded === true),
              //   takeUntil(this.destroy$)
              // ).subscribe(() => {
              //   console.log('b', JSON.stringify({ paginateBy, limit, offset }))
              //   this.inf.temporal_entity.loadPaginatedList(
              //     pkProject,
              //     pkEntity,
              //     l.pkProperty,
              //     l.targetClass,
              //     l.isOutgoing,
              //     limit,
              //     offset
              //   )
              // })
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
              .by_fk_concerned_entity__fk_class_field$.key(pkEntity + '_'
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
                  !!values(n.row).find(r => (!!r && r.pkProperty === 1113 && r.firstItem.role.fk_entity === defaultLanguage.pk_entity))
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



    // this.items$ = this.typeClassPk$.pipe(
    //   switchMap(typeClassPk => this.b.pipePersistentItemPksByClass(typeClassPk).pipe(
    //     switchMap(typePks => combineLatestOrEmpty(
    //       typePks.map(pkEntity => this.i.pipeLabelOfEntity(pkEntity).pipe(
    //         map(label => ({
    //           pkEntity,
    //           label
    //         } as TypeItem))
    //       ))
    //     ).pipe(
    //       sortAbc(n => n.label),
    //     ))
    //   ))
    // )
    // this.loadTypes();

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // loadTypes() {
  //   combineLatest(this.typeClass$, this.p.pkProject$).pipe(
  //     filter(d => !d.includes(undefined)),
  //     takeUntil(this.destroy$)
  //   ).subscribe(([pkTypeClass, pkProject]) => {
  //     this.load(pkProject, pkTypeClass.dfh_pk_class)
  //   })
  // }

  // /**
  //  * called when user creates a new type
  //  */
  // added(type: InfPersistentItem) {
  //   this.createSucceeded(type);
  // }

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
    this.p.openRemovePeItDialog(type.label, type.pkEntity)
  }

  /**
   * called when user clicks on add
  */
  onAddOrCreate() {
    this.typeClassPk$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkClass => {

      this.p.openModalCreateOrAddEntity({
        alreadyInProjectBtnText: 'Edit',
        notInProjectClickBehavior: 'addToProject',
        notInProjectBtnText: 'Add',
        classAndTypePk: { pkClass, pkType: undefined },
        pkUiContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE
      }).subscribe(result => {
        if (result.action === 'added' || result.action === 'created') {
          this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.inf.persistent_item.typeOfProject(pkProject, result.pkEntity)
          })
        } else if (result.action === 'alreadyInProjectClicked') {
          this.edit(result.pkEntity)
        }
      })
    })
  }



  /**
   * Opens dialog for editing type
   * @param pkEntity
   */
  edit(pkEntity: number) {
    const data: PropertiesTreeDialogData = {
      appContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE,
      pkClass$: this.typeClassPk$,
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
