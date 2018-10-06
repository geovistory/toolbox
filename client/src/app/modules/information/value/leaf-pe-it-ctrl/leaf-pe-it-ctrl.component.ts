import { NgRedux, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ClassConfig, IAppState, InfRole } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { pick } from 'ramda';
import { Subscription } from 'rxjs';
import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';
import { LeafPeItViewAPIActions } from '../leaf-pe-it-view/api/leaf-pe-it-view.actions';
import { leafPeItViewReducer } from '../leaf-pe-it-view/api/leaf-pe-it-view.reducer';



@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: leafPeItViewReducer
})
@Component({
  selector: 'gv-leaf-pe-it-ctrl',
  templateUrl: './leaf-pe-it-ctrl.component.html',
  styleUrls: ['./leaf-pe-it-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeafPeItCtrlComponent),
      multi: true
    }
  ]
})
export class LeafPeItCtrlComponent extends LeafPeItViewAPIActions implements OnInit, OnDestroy, ControlValueAccessor {

  role: InfRole;

  pkEntity: number;

  /**
   * Inputs
   */
  @Input() pkClass: number;
  @Input() basePath: string[];

  /**
   * Output
   */
  @Output() selected: EventEmitter<number> = new EventEmitter();

  @Output() open: EventEmitter<number> = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();

  classConfig: ClassConfig;

  subs: Subscription[] = [];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private modalService: NgbModal,
    private entityAddModalService: EntityAddModalService,
    private ref: ChangeDetectorRef
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.classConfig = this.ngRedux.getState().activeProject.crm.classes[this.pkClass];
    // this.openModal()
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  reset() {

    this.pkEntity = undefined;
    this.onChange(null)
    this.remove()
    this.ref.detectChanges()

  }

  openModal() {

    this.pkEntity = undefined;

    this.open.emit();

    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }
    this.modalService.open(EntityAddModalComponent, entityModalOptions);

    this.entityAddModalService.previousState = undefined;
    this.entityAddModalService.state = 'search-existing';
    this.entityAddModalService.selectRoleRange = true;
    this.entityAddModalService.selectedClass = this.classConfig;
    this.subs.push(this.entityAddModalService.onSelect.subscribe(pkEntity => {
      this.selected.emit(pkEntity);

      this.pkEntity = pkEntity;
      this.ref.detectChanges()

      // build the role
      const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role) as InfRole);
      role.fk_entity = pkEntity;

      // send the role to the parent form
      this.onChange(role)

    }))

  }


  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {
    this.role = role ? role : new InfRole();
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
  onChange = (role: InfRole | null) => {
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
