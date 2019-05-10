import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { ActiveProjectService, ClassConfig, SysConfig, IAppState, InfPersistentItem, U } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { RootEpics } from 'app/core/store/epics';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { TypesAPIActions } from './api/types.actions';
import { TypesAPIEpics } from './api/types.epics';
import { Types } from './api/types.models';
import { typesReducer } from './api/types.reducer';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { TypeEditFormComponent } from '../type-edit-form/type-edit-form.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TypeAddFormComponent } from '../type-add-form/type-add-form.component';

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
  typeClass$: Observable<ClassConfig>;
  typedClass$: Observable<ClassConfig>;


  // types
  @select() items$: Observable<{ [key: string]: InfPersistentItem }>;

  // flag indicatig if add form is visible
  @select() add$: Observable<boolean>;

  // object containing data for edit form. If truthy, edit form is visible.
  @select() edit$: Observable<InfPersistentItem>;

  // flag indicatig if loaing info is visible
  @select() loading$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypesAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService,
    public dialog: MatDialog
  ) {
    super();
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.typedClass$ = combineLatest(this.p.classes$, this.p.hasTypeProperties$).pipe(
      first(d => !d.includes(undefined)),
      map(([classes, hasTypeProps]) => classes[hasTypeProps[this.pkProperty].pk_typed_class]),
      tap((klass) => {
        this.setTabTitle(klass.label + ' Types')
      })
    )

    this.typeClass$ = combineLatest(this.p.classes$, this.p.hasTypeProperties$).pipe(
      first(d => !d.includes(undefined)),
      map(([classes, hasTypeProps]) => classes[hasTypeProps[this.pkProperty].pk_type_class])
    )

    this.loadTypes();

  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadTypes() {
    combineLatest(this.typeClass$, this.p.pkProject$).pipe(
      filter(d => !d.includes(undefined)),
      takeUntil(this.destroy$)
    ).subscribe(([pkTypeClass, pkProject]) => {
      this.load(pkProject, pkTypeClass.dfh_pk_class)
    })
  }

  /**
   * called when user creates a new type
   */
  added(type: InfPersistentItem) {
    this.createSucceeded(type);
  }

  /**
   * called when user clicks on edit
   */
  edit(type: InfPersistentItem) {
    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pkProject => {

      this.openEditForm(pkProject, type)

      const dialogRef = this.dialog.open(TypeEditFormComponent, {
        height: '90%',
        width: '90%',
        data: { basePath: [...this.basePath, 'edit'] }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.stopEdit();
      });

    })
  }

  /**
   * called when user stops editing a type
   */
  stopEdit() {
    this.closeEditForm()
    this.loadTypes()
  }


  remove(type: InfPersistentItem) {
    this.getLabel(type)

    const dialogData: ConfirmDialogData = {
      title: 'Remove "' + this.getLabel(type) + '"',
      paragraphs: [
        'Are you sure?'
      ],
      yesBtnText: 'Remove',
      yesBtnColor: 'warn',
      noBtnText: 'Cancel',
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.p.removePeIt(type.pk_entity);
      }
    });
  }

  getLabel = (peIt: InfPersistentItem) => U.stringForPeIt(peIt);

  /**
   * called when user clicks on add
   */
  addOrCreate() {

    this.typeClass$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(typeClass => {
      this.openAddForm({
        classAndTypePk: {
          pkClass: typeClass.dfh_pk_class,
          pkType: undefined
        },
        pkUiContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE,
      })
    })

    const dialogRef = this.dialog.open(TypeAddFormComponent, {
      height: '90%',
      width: '90%',
      data: { basePath: [...this.basePath, 'add'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.added(result);
      }else{
        this.closeAddForm()
      }
    });

  }
}
