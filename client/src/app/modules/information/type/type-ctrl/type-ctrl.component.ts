import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfEntityAssociation, SubstoreComponent, U, ActiveProjectService } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { DropdownTreeviewComponent, TreeviewItem, TreeviewI18n, TreeviewConfig } from 'ngx-treeview';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import { TypeCtrlAPIActions } from './api/type-ctrl.actions';
import { TypeCtrlAPIEpics } from './api/type-ctrl.epics';
import { TypeCtrl, TypeOptions } from './api/type-ctrl.models';
import { typeCtrlReducer } from './api/type-ctrl.reducer';
import { DropdownTreeviewSelectI18n } from './dropdown-treeview-select-i18n';
import * as Config from '../../../../../../../common/config/Config'

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typeCtrlReducer
})
@Component({
  selector: 'gv-type-ctrl',
  templateUrl: './type-ctrl.component.html',
  styleUrls: ['./type-ctrl.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeCtrlComponent),
      multi: true
    },
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }

  ]
})
export class TypeCtrlComponent extends TypeCtrlAPIActions implements OnInit, OnDestroy, SubstoreComponent, ControlValueAccessor {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeCtrl>;

  // path to the substore
  @Input() basePath: string[];
  @Input() openOnInit = false;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() pkTypedClass$: Observable<number>;
  @select() items$: Observable<TreeviewItem[]>;

  // mark control as touched
  @Output() touched = new EventEmitter<void>();

  @ViewChild(DropdownTreeviewComponent, { static: true }) dropdownTreeviewComponent: DropdownTreeviewComponent;
  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

  // the value given by writeValue;
  entityAssociation$ = new Subject<InfEntityAssociation>();

  // the selected type option
  selectedTypeOption: TreeviewItem;

  config: TreeviewConfig;

  registered = false;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeCtrlAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    public i18n: TreeviewI18n,
    private p: ActiveProjectService
  ) {
    super()

    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: true,
      maxHeight: 500
    });
    this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typeCtrlReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest(this.p.pkProject$, this.pkTypedClass$, this.p.hasTypeProperties$).pipe(
      first(d => !d.includes(undefined)),
      takeUntil(this.destroy$)
    ).subscribe(([pkProject, pkTypedClass, hasTypeProperties]) => {

      const pkTypeClass = U.objNr2Arr(hasTypeProperties).find(p => p.pk_typed_class === pkTypedClass).pk_type_class;

      // load the available types
      this.load(pkProject, pkTypeClass)
    })

    // Listen for closing the treeview
    this.dropdownTreeviewComponent.dropdownDirective.openChange.subscribe(val => {
      if (!val) this.markAsTouched()
    })

    // open on init, if configured so
    if (this.openOnInit) {
      setTimeout(() => {
        this.dropdownTreeviewComponent.dropdownDirective.open()
      }, 0);
    }

    // Listen for items to be loaded and the writeValue
    combineLatest(this.entityAssociation$, this.items$).pipe(
      filter((d) => (d.filter(item => (!item)).length === 0)),
      takeUntil(this.destroy$)
    ).subscribe((d) => {
      const items = d[1], ea = d[0];

      const selected = items.find((item) => item.value == ea.fk_info_range)

      if (this.dropdownTreeviewSelectI18n.selectedItem !== selected) {
        this.dropdownTreeviewSelectI18n.selectedItem = selected;
        // this.emitOnChange();
      }

    })

  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  select(item: TreeviewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
  }

  private selectItem(item: TreeviewItem) {
    this.dropdownTreeviewComponent.dropdownDirective.close();
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;

      this.emitOnChange();
    }
  }


  emitOnChange() {
    this.p.crm$.pipe(first(x => !!x.classHasTypeProperty), takeUntil(this.destroy$)).subscribe((crm) => {
      const fk_property = U.obj2Arr(crm.classHasTypeProperty
        .by_pk_typed_class[this.localStore.getState().pkTypedClass])[0].dfh_pk_property;
      if (this.dropdownTreeviewSelectI18n.selectedItem
        && this.dropdownTreeviewSelectI18n.selectedItem.value
        && this.localStore.getState()) {
        this.onChange(new InfEntityAssociation({
          fk_info_domain: undefined,
          fk_property,
          fk_info_range: this.dropdownTreeviewSelectI18n.selectedItem.value
        }))
      } else {
        this.onChange(null)
      }
    })
  }

  /****************************************
 *  ControlValueAccessor implementation *
 ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(assoc: InfEntityAssociation): void {

    if (assoc) {
      this.entityAssociation$.next(assoc);
    }

    if (this.registered) this.emitOnChange();

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.registered = true;
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (assov: InfEntityAssociation | null) => {
    console.error('called before registerOnChange')
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

}
