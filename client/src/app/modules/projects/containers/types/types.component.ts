import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, IAppState, InfPersistentItem, SysConfig, U, SysClassHasTypePropertyInterface, sortAbc } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { RootEpics } from 'app/core/store/epics';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { values } from 'ramda';
import { combineLatest, Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TypeAddFormComponent } from '../type-add-form/type-add-form.component';
import { TypeEditFormComponent } from '../type-edit-form/type-edit-form.component';
import { TypesAPIActions } from './api/types.actions';
import { TypesAPIEpics } from './api/types.epics';
import { Types } from './api/types.models';
import { typesReducer } from './api/types.reducer';
import { InformationBasicPipesService } from 'app/modules/information/new-services/information-basic-pipes.service';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { InformationPipesService } from 'app/modules/information/new-services/information-pipes.service';
import { PropertiesTreeDialogComponent, PropertiesTreeDialogData } from 'app/modules/information/new-components/properties-tree-dialog/properties-tree-dialog.component';

interface TypeItem {
  pkEntity: number
  label: string,
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
export class TypesComponent extends TypesAPIActions implements OnInit, OnDestroy, SubstoreComponent {
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

  // flag indicatig if add form is visible
  @select() add$: Observable<boolean>;

  // object containing data for edit form. If truthy, edit form is visible.
  @select() edit$: Observable<InfPersistentItem>;

  // flag indicatig if loaing info is visible
  @select() loading$: Observable<boolean>;

  t: TabLayout;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypesAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService,
    public inf: InfActions,
    public dialog: MatDialog,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
    public b: InformationBasicPipesService,
    public i: InformationPipesService
  ) {
    super();
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

    const hasTypeProp$ = this.p.sys$.class_has_type_property$.by_dfh_pk_property$.key(this.pkProperty).pipe(
      filter(object => !!object && Object.keys(object).length > 0),
      map((object) => values(object)[0]),
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

    this.typedClassLabel$ = hasTypeProp$.pipe(
      switchMap((hasTypeProp) => this.c.pipeLabelOfClass(hasTypeProp.pk_typed_class).pipe(
        tap((typedClassLabel) => {
          this.t.setTabTitle(typedClassLabel + ' Types')
        })
      )),
    )

    this.typeClassLabel$ = hasTypeProp$.pipe(
      switchMap((hasTypeProp) => this.c.pipeLabelOfClass(hasTypeProp.pk_type_class)),
    )

    this.items$ = this.typeClassPk$.pipe(
      switchMap(typeClassPk => this.b.pipePersistentItemPksByClass(typeClassPk).pipe(
        switchMap(typePks => combineLatestOrEmpty(
          typePks.map(pkEntity => this.i.pipeLabelOfEntity(pkEntity).pipe(
            map(label => ({
              pkEntity,
              label
            } as TypeItem))
          ))
        ).pipe(
          sortAbc(n => n.label),
        ))
      ))
    )
    // this.loadTypes();

  }

  ngOnDestroy() {
    this.destroy();
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

  /**
   * called when user creates a new type
   */
  added(type: InfPersistentItem) {
    this.createSucceeded(type);
  }

  /**
   * called when user clicks on edit
   */
  edit(type: TypeItem) {
    const data: PropertiesTreeDialogData = {
      appContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE,
      pkClass$: this.typeClassPk$,
      pkEntity$: of(type.pkEntity),
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



  remove(type: TypeItem) {
    this.p.openRemovePeItDialog(type.label, type.pkEntity)
  }

  /**
   * called when user clicks on add
   */
  addOrCreate() {
    this.typeClassPk$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkClass => {

      this.p.openModalCreateOrAddEntity({
        classAndTypePk: { pkClass, pkType: undefined },
        pkUiContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE
      }).subscribe((entity: InfPersistentItem) => {
      })
    })

  }
}
