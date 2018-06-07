import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InfRole } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { pick } from 'ramda';
import { Subscription } from 'rxjs';

import { StateCreatorService } from '../../shared/state-creator.service';
import { StateToDataService } from '../../shared/state-to-data.service';
import { PeItDetail, RoleDetail } from '../../information.models';
import { PeItEntityPreviewModalComponent } from './pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';

@AutoUnsubscribe()
@Component({
  selector: 'gv-pe-it-entity-preview',
  templateUrl: './pe-it-entity-preview.component.html',
  styleUrls: ['./pe-it-entity-preview.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItEntityPreviewComponent),
      multi: true
    }
  ]
})
export class PeItEntityPreviewComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() pkEntity: number;
  @Input() isCircular: boolean;

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, '_leaf_peIt']
  basePath: string[];

  peItState: PeItDetail;

  /**
  * Outputs
  */
  @Output() touched: EventEmitter<void> = new EventEmitter();



  /**
  * Properties
  */
  label: string;

  isInProject: boolean;

  isSelected: boolean = false;

  pkProject: number;

  subs: Subscription[] = [];

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<PeItDetail>,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private stateCreator: StateCreatorService,
    private ref: ChangeDetectorRef
  ) {
  }


  ngOnInit() {

    this.basePath = this.getBasePath();
    this.subs.push(this.ngRedux.select<PeItDetail>(this.basePath).subscribe(d => {
      this.peItState = d;
      if (d)
        this.label = StateToDataService.getDisplayAppeLabelOfPeItRoleSets(d._roleSet_list);
    }))

    this.subs.push(this.ngRedux.select<RoleDetail>(this.parentPath).subscribe(d => {
      if (d)
        this.role = d.role;

    }))

    this.subs.push(this.ngRedux.select<number>(['activeProject', 'pk_project']).subscribe(d => {
      this.pkProject = d;
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
    this.ref.detach()
  }


  // called when the entity add modal is opened 
  addModalOpened() {
    this.markAsTouched();

    // send null to the parent form
    this.onChange(null)
  }

  // called when a entity was selected in the entity add modal  
  selected(pkEntity: number) {
    this.isSelected = true

    this.subs.push(this.stateCreator.initializePeItState(pkEntity, this.pkProject).subscribe(peItState => {
      this.label = StateToDataService.getDisplayAppeLabelOfPeItRoleSets(peItState._roleSet_list);
      this.ref.detectChanges()
    }))

    // build the role
    const role = new InfRole({
      ...pick(['fk_temporal_entity', 'fk_property'], this.role),
      fk_entity: pkEntity
    });

    // send the pkEntity to the parent form
    this.onChange(role)
  }

  open() {
    // const urlTree = this.router.createUrlTree(["..", this.pkEntity], { relativeTo: this.route, preserveQueryParams:true });
    // window.open(this.router.serializeUrl(urlTree), '_blank')
    const open = () => {

      this.router.navigate(["../", this.peItState.peIt.pk_entity], {
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      })
        .then(() => {
          console.log('ok')
        }).catch(() => {
          console.log('oops')
        })
    }


    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }

    const modalRef = this.modalService.open(PeItEntityPreviewModalComponent, entityModalOptions);

    modalRef.componentInstance.isInProject = (this.peItState.peIt.entity_version_project_rels && this.peItState.peIt.entity_version_project_rels.length)
    modalRef.componentInstance.parentPath = this.basePath;
    modalRef.componentInstance.peItState = this.peItState;

    modalRef.result
      .then(() => { open() })
      .catch(() => { });


  }


  /****************************************
 *  ControlValueAccessor implementation *
 ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(pk_entity: number): void {


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
