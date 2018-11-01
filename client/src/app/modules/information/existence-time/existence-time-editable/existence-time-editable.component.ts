import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppState, InfRole, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { ExistenceTimeDetail, ExTimeModalMode, RoleSetList, TeEntDetail } from 'app/core/state/models';
import { createExistenceTimeDetail, StateSettings } from 'app/core/state/services/state-creator';
import { dropLast } from 'ramda';
import { Observable, Subscription } from 'rxjs';
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { slideInOut } from '../../shared/animations';
import { ExistenceTimeModalComponent } from '../existence-time-modal/existence-time-modal.component';
import { ExistenceTimeActions } from '../existence-time.actions';
import { existenceTimeReducer } from '../existence-time.reducer';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeReducer
})
@Component({
  selector: 'gv-existence-time-editable',
  templateUrl: './existence-time-editable.component.html',
  styleUrls: ['./existence-time-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExistenceTimeEditableComponent),
      multi: true
    }
  ]
})
export class ExistenceTimeEditableComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() basePath: string[]

  @Input() mode: 'editable' | 'create';


  @Output() startEditing: EventEmitter<void> = new EventEmitter();
  @Output() stopEditing: EventEmitter<ExistenceTimeDetail> = new EventEmitter();
  @Output() onRemovePropSet: EventEmitter<void> = new EventEmitter();
  @Output() touched: EventEmitter<void> = new EventEmitter();

  localStore: ObservableStore<ExistenceTimeDetail>
  parentTeEntStore: ObservableStore<TeEntDetail>;

  showOntoInfo$: Observable<boolean>
  @select() toggle$: Observable<boolean>
  _fields: RoleSetList;

  // true, if there is no termporal information
  isEmpty = true;

  subs: Subscription[] = [];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: ExistenceTimeActions,
    private modalService: NgbModal,
    protected teEntApi: InfTemporalEntityApi
  ) {

  }

  getBasePath = () => this.basePath;

  ngOnInit() {

    if (!this.mode) throw new Error('mode of existence-time-editable is not defined');

    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer);
    this.parentTeEntStore = this.ngRedux.configureSubStore(dropLast(2, this.basePath), teEntReducer)

    const parentPeItPath = dropLast(7, this.basePath);

    this.showOntoInfo$ = this.ngRedux.select<boolean>([...parentPeItPath, 'showOntoInfo']);

    this.subs.push(this.localStore.select<ExistenceTimeDetail>('').subscribe(d => {
      if (d) {
        this._fields = d._fields;
      } else this._fields = undefined;


      // if there is temporal information, set isEmpty to false
      if (this._fields && Object.keys(this._fields).length > 0) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }

    }))
  }

  openModal(mode: ExTimeModalMode) {

    if (!mode) {
      // if only "at some time within" is given, open in "one-date" mode
      if (Object.keys(this._fields).length === 1 && this._fields._72_outgoing) {
        mode = 'one-date';
      } else if (
        // else if only "begin" and "end" is given, open in "begin-end" mode
        Object.keys(this._fields).length === 2 &&
        this._fields._150_outgoing &&
        this._fields._151_outgoing
      ) {
        mode = 'begin-end';
      } else {
        mode = 'advanced';
      }

    }

    this.startEditingExistenceTime(mode);

    const modalRef = this.modalService.open(ExistenceTimeModalComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.basePath = this.basePath.concat('_existenceTime_edit');
    modalRef.componentInstance.mode = this.mode;

    modalRef.result
      .then((data) => {
        if (this.mode == 'editable') this.save(data)
        else if (this.mode == 'create') this.emitCtrlVals(data);
      })
      .catch(() => {
        this.localStore.dispatch(this.actions.stopEditingExTime())
      })
  }



  startEditingExistenceTime(mode) {
    this.localStore.dispatch(this.actions.startEditingExTime(mode))
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  doRemovePropSet() {
    this.onRemovePropSet.emit()
  }


  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }




  private save(data: { toRemove: InfRole[], toAdd: InfRole[], unchanged: InfRole[] }) {

    const teEnt = new InfTemporalEntity({
      ...this.parentTeEntStore.getState().teEnt,
      te_roles: [
        ...data.toRemove.filter(r => (r)),
        ...data.toAdd.filter(r => (r)) // than all roles are created or added to project
      ]
    } as InfTemporalEntity);
    this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(this.ngRedux.getState().activeProject.pk_project, teEnt).subscribe(teEnts => {
      const roles = [
        // get the resulting roles of the and filter out the ones that are in project
        ...teEnts[0].te_roles.filter(role => (role.entity_version_project_rels && role.entity_version_project_rels[0].is_in_project)),
        // concat with the roles that were unchanged
        ...data.unchanged
      ];

      const settings: StateSettings = {
        pkUiContext: this.localStore.getState().pkUiContext
      }

      // update the state
      const extDetail = createExistenceTimeDetail(new ExistenceTimeDetail({ toggle: 'expanded' }), roles, this.ngRedux.getState().activeProject.crm, settings)
      this.localStore.dispatch(this.actions.existenceTimeUpdated(extDetail))

    }));
  }

  emitCtrlVals(data: { toRemove: InfRole[], toAdd: InfRole[], unchanged: InfRole[] }) {

    const settings: StateSettings = {
      pkUiContext: this.localStore.getState().pkUiContext
    }

    // TODO: Verify if this can be dropped
    // const settings: StateSettings = {
    //   isCreateMode: data.toAdd.length ? false : true
    // }

    const extDetail = createExistenceTimeDetail(new ExistenceTimeDetail({ toggle: 'expanded' }), data.toAdd, this.ngRedux.getState().activeProject.crm, settings)
    this.localStore.dispatch(this.actions.existenceTimeUpdated(extDetail))

    this.markAsTouched();
    this.onChange(data.toAdd)
  }


  /****************************************
 *  ControlValueAccessor implementation *
 ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (roles: InfRole[] | null) => {
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
