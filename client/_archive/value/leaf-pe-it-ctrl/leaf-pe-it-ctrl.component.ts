import { NgRedux, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassConfig, SysConfig, IAppState, InfRole } from 'app/core';
import { pick } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { LeafPeItViewAPIActions } from '../leaf-pe-it-view/api/leaf-pe-it-view.actions';
import { leafPeItViewReducer } from '../leaf-pe-it-view/api/leaf-pe-it-view.reducer';



@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: leafPeItViewReducer
})
@Component({
  selector: 'gv-leaf-pe-it-ctrl',
  templateUrl: './leaf-pe-it-ctrl.component.html',
  styleUrls: ['./leaf-pe-it-ctrl.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeafPeItCtrlComponent),
      multi: true
    }
  ]
})
export class LeafPeItCtrlComponent extends LeafPeItViewAPIActions implements OnInit, OnDestroy, ControlValueAccessor {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  role: InfRole;

  pkEntity: number;

  /**
   * Inputs
   */
  @Input() pkClass: number;
  @Input() basePath: string[];
  @select() pkEntity$: Observable<number>;

  /**
   * Output
   */
  @Output() selected: EventEmitter<number> = new EventEmitter();

  @Output() open: EventEmitter<number> = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();

  classConfig$: Observable<ClassConfig>;


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private modalService: NgbModal,
    // private entityAddModalService: EntityAddModalService,
    private ref: ChangeDetectorRef
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.classConfig$ = this.ngRedux.select<ClassConfig>(['activeProject', 'crm', 'classes', this.pkClass])


  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  reset() {

    this.pkEntity = undefined;
    this.onChange(null)
    this.remove()
    this.ref.detectChanges()

  }

  onOpenModal(modalContent) {

    this.modalService.open(modalContent, { size: 'lg' }).result.then((pkEntity) => {
      this.closeModal()
      this.selected.emit(pkEntity);

      this.pkEntity = pkEntity;
      this.setPkEntity(pkEntity);

      this.ref.detectChanges()

      // build the role
      const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role) as InfRole);
      role.fk_entity = pkEntity;

      // send the role to the parent form
      this.onChange(role)
    }, (reason) => {
      // this.closeModal()
    });

    this.openModal({
      classAndTypePk: {
        pkClass: this.pkClass,
        pkType: undefined
      },
      pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
    })

    // this.pkEntity = undefined;

    // this.open.emit();

    // const entityModalOptions: NgbModalOptions = {
    //   size: 'lg'
    // }
    // this.modalService.open(EntityAddModalComponent, entityModalOptions);

    // this.entityAddModalService.previousState = undefined;
    // this.entityAddModalService.state = 'search-existing';
    // this.entityAddModalService.selectRoleRange = true;
    // this.entityAddModalService.selectedClass = this.classConfig;
    // this.subs.push(this.entityAddModalService.onSelect.subscribe(pkEntity => {
    //   this.selected.emit(pkEntity);

    //   this.pkEntity = pkEntity;
    //   this.setPkEntity(pkEntity);

    //   this.ref.detectChanges()

    //   // build the role
    //   const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role) as InfRole);
    //   role.fk_entity = pkEntity;

    //   // send the role to the parent form
    //   this.onChange(role)

    // }))

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
