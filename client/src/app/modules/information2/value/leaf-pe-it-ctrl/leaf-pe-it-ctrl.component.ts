import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DfhClass, InfRole } from 'app/core';
import { pick } from 'ramda';
import { Subscription } from 'rxjs';

import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';

// import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';

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
export class LeafPeItCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  role: InfRole;

  /**
   * Inputs
   */
  @Input() dfhClass: DfhClass;

  /**
   * Output
   */
  @Output() selected: EventEmitter<number> = new EventEmitter();

  @Output() open: EventEmitter<number> = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();


  subs: Subscription[] = [];

  constructor(
    private modalService: NgbModal,
    private entityAddModalService: EntityAddModalService
  ) {
    // super(peItApi, peItService, propertyPipe, activePeItService, slimLoadingBarService, entityEditor, changeDetector, ngRedux, actions, classService, roleService, propertyService, roleSetListService)
  }

  ngOnInit() {
    this.openModal()
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  openModal() {

    this.open.emit();

    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }
    const modalRef = this.modalService.open(EntityAddModalComponent, entityModalOptions);

    this.entityAddModalService.previousState = undefined;
    this.entityAddModalService.state = 'search-existing';
    this.entityAddModalService.selectRoleRange = true;
    this.entityAddModalService.selectedClass = this.dfhClass;
    this.subs.push(this.entityAddModalService.onSelect.subscribe(pkEntity => {
      this.selected.emit(pkEntity);

      // build the role
      const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role));
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
