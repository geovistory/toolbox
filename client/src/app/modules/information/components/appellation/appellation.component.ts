import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef, OnDestroy } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfAppellation, InfAppellationApi, ActiveProjectService, EntityEditorService, InfEntityProjectRel, InfRole } from 'app/core';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { AppellationStdBool } from '../role/role.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IAppellationState } from './appellation.model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { Token, TokenInterface } from '../../shared/appellation-token/appellation-token';
import { Subscription } from 'rxjs';
import { IRoleState } from '../role/role.model';
import { pick } from 'ramda';

@AutoUnsubscribe()
@Component({
  selector: 'gv-appellation',
  templateUrl: './appellation.component.html',
  styleUrls: ['./appellation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppellationComponent),
      multi: true
    }
  ]
})
export class AppellationComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'appeState']
  basePath: string[];

  appeState: IAppellationState;

  appellation: InfAppellation;

  peItAppeState: string;


  /**
  * Outputs
  */
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();


  /**
  * Properties
  */

  appellationLabel: AppellationLabel = new AppellationLabel();

  appellationLabelInEdit: AppellationLabel;

  subs: Subscription[] = [];

  formGroup: FormGroup;

  appeCtrl: FormControl;

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  //  needed to create a proper appellation value to emit onChange of the form
  fkClass: number;

  constructor(
    private fb: FormBuilder,
    private appellationApi: InfAppellationApi,
    private activeProjectService: ActiveProjectService,
    public entityEditor: EntityEditorService,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IAppellationState>,
  ) {

    // create the form control
    this.appeCtrl = new FormControl(null, [Validators.required]);

    // create the formGroup used to create/edit an appellation
    this.formGroup = this.fb.group({})
    this.formGroup.addControl('appellationLabel', this.appeCtrl)

    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid && this.role) {

        // build the role
        const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role));

        // build a appe with the appellation_label given by the formControl 
        role.appellation = new InfAppellation({
          fk_class: this.fkClass,
          ...this.appeState.appellation
        });

        if (this.formGroup.get('appellationLabel')) {

          role.appellation.appellation_label = this.formGroup.get('appellationLabel').value

        }

        // send the appe the parent form
        this.onChange(role)
      }
      else {
        this.onChange(null)
      }
    }))

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit() {
    this.basePath = this.getBasePath();

    this.subs.push(this.ngRedux.select<IRoleState>(this.parentPath).subscribe(d => {
      if (d) {
        this.role = d.role;
        this.fkClass = d.appeState.appellation.fk_class ?
          d.appeState.appellation.fk_class : d.targetDfhClass.dfh_pk_class;
      }
    }))

    this.subs.push(this.ngRedux.select<IAppellationState>(this.basePath).subscribe(d => {
      if (d) {
        this.appeState = d;
        this.peItAppeState = this.appeState.state;

        // from InfAppellation to AppellationLabel
        this.appellation = this.appeState.appellation;
        const label = (this.appeState && this.appeState.appellation && this.appeState.appellation.appellation_label) ?
          new AppellationLabel(this.appeState.appellation.appellation_label) : null;

        // set value of FormControl
        this.appeCtrl.setValue(label, { onlySelf: true, emitEvent: false })
      }
    }));

  }


  // startEdit() {
  //   this.peItAppeState = 'edit'
  //
  //   this.appellationLabelInEdit = new AppellationLabel(this.appellationLabel);
  //
  // }


  onCancel() {
    this.cancelEdit.emit()
  }

  // save(appeLabel: AppellationLabel) {
  //   this.startLoading();

  //   this.subs.push(this.appellationApi.findOrCreateAppellation(
  //     this.activeProjectService.project.pk_project,
  //     {
  //       pk_entity: this.appellation.pk_entity,
  //       fk_class: this.appellation.fk_class,
  //       appellation_label: appeLabel
  //     }
  //   ).subscribe(appellations => {
  //     this.completeLoading();

  //     this.appellation = new InfAppellation(appellations[0])
  //     this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);

  //     this.appeChange.emit({
  //       appellation: this.appellation,
  //       isDisplayRoleInProject: false
  //     })

  //   }))

  //   this.cancelEdit.emit()

  // }

  // create(appeLabel: AppellationLabel) {
  //   console.log(appeLabel);
  // }



  /**
  * Methods specific to create state
  */

  // emitReadyToCreate(appellationLabel: AppellationLabel) {

  //   this.appellation.appellation_label = appellationLabel;

  //   this.readyToCreate.emit(this.appellation)

  // }

  // emitNotReadyToCreate() {

  //   this.notReadyToCreate.emit()

  // }

  /**
  * Methods specific to add state
  */




  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {


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

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }

}
