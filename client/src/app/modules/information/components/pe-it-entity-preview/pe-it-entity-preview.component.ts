import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ChangeDetectionStrategy, forwardRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { PeItEntityPreviewModalComponent } from '../pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';
import { InfPersistentItemApi, ActiveProjectService, EntityEditorService, InfEntityProjectRelApi, InfRole, Project, InfPersistentItem } from 'app/core';
import { PeItService } from '../../shared/pe-it.service';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { PropertyPipe } from '../../shared/property.pipe';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { PeItComponent } from '../../containers/pe-it/pe-it.component';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { NumberSymbol } from '@angular/common';
import { RoleSetListService } from '../../shared/role-set-list.service';
import { peItReducer } from '../../containers/pe-it/pe-it.reducer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormBuilder, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StateCreatorService } from '../../shared/state-creator.service';
import { Subscription } from 'rxjs';
import { IRoleState } from '../role/role.model';
import { pick } from 'ramda';

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

  getBasePath = () => [...this.parentPath, 'peItState']
  basePath: string[];

  peItState: IPeItState;

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
    private ngRedux: NgRedux<IPeItState>,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private roleSetListService: RoleSetListService,
    private stateCreator: StateCreatorService,
    private ref: ChangeDetectorRef
  ) {
  }


  ngOnInit() {

    this.basePath = this.getBasePath();
    this.subs.push(this.ngRedux.select<IPeItState>(this.basePath).subscribe(d => {
      this.peItState = d;
      if (d)
        this.label = this.roleSetListService.getDisplayAppeLabelOfPeItRoleSets(d.roleSets);
    }))

    this.subs.push(this.ngRedux.select<IRoleState>(this.parentPath).subscribe(d => {
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

    this.subs.push(this.stateCreator.initializePeItState(pkEntity, this.pkProject, 'view').subscribe(peItState => {
      this.label = this.roleSetListService.getDisplayAppeLabelOfPeItRoleSets(peItState.roleSets);
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
    modalRef.componentInstance.parentPath = this.parentPath;

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
