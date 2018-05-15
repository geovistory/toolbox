import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfAppellation, InfAppellationApi, ActiveProjectService, EntityEditorService, InfEntityProjectRel } from 'app/core';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { AppellationStdBool } from '../role/role.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IAppellationState } from './appellation.model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { Token, TokenInterface } from '../../shared/appellation-token/appellation-token';


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
export class AppellationComponent implements OnInit, ControlValueAccessor {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'appeState']
  basePath: string[];

  appeState: IAppellationState;

  /**
  * Inputs
  */
  appellation: InfAppellation;

  peItAppeState: string;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfAppellation> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfAppellation> = new EventEmitter();

  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();


  /**
  * Properties
  */

  appellationLabel: AppellationLabel = new AppellationLabel();

  appellationLabelInEdit: AppellationLabel;


  constructor(
    private fb: FormBuilder,
    private appellationApi: InfAppellationApi,
    private activeProjectService: ActiveProjectService,
    public entityEditor: EntityEditorService,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IAppellationState>,
  ) {

    // create the formGroup used to create/edit an appellation
    this.formGroup = this.fb.group({})

    // subscribe to form changes here
    this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

        // build a appe with the appellation_label given by the formControl 
        let appe = new InfAppellation(this.appeState.appellation);

        if (this.formGroup.get('appellationLabel')) {

          appe.appellation_label = this.formGroup.get('appellationLabel').value
          // appe.appellation_label.tokens = this.formGroup.get('appellationLabel').value.tokens.map((token:TokenInterface)=>{
          //   return new Token({
          //     string: token.string,
          //     typeId: token.typeId
          //   })
          // })
        }

        // send the appe the parent form
        this.onChange(appe)
      }
      else {
        this.onChange(null)
      }
    })

    this.formGroup.statusChanges.subscribe(status=>{

    })

  }

  ngOnInit() {

    this.basePath = this.getBasePath();
    this.ngRedux.select<IAppellationState>(this.basePath).subscribe(d => {
      this.appeState = d;
      if(d){
        this.appellation = this.appeState.appellation;
        this.peItAppeState = this.appeState.state;
      }
    });

    if (this.appellation.appellation_label) {
      this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);
      this.appeChange.emit({
        appellation: this.appellation,
        isDisplayRoleInProject: false
      })
    }

    this.peItAppeState = this.peItAppeState ? this.peItAppeState : 'view';


    // if (this.peItAppeState === 'add-pe-it') {
    //
    //   // make a copy
    //   let appe = new InfAppellation(this.appellation);
    //
    //   // add an epr
    //   appe.entity_version_project_rels = [
    //     new InfEntityProjectRel({
    //       fk_project: this.activeProjectService.project.pk_project,
    //       is_in_project: true,
    //       fk_entity_version_concat: this.appellation.pk_entity_version_concat
    //     })
    //   ]
    //
    //   // emit it
    //   this.readyToAdd.emit(appe);
    // }

    // if (this.peItAppeState === 'add') {

    // make a copy
    let appe = new InfAppellation(this.appellation);

    // add an epr
    appe.entity_version_project_rels = [
      new InfEntityProjectRel({
        fk_project: this.activeProjectService.project.pk_project,
        fk_entity_version_concat: this.appellation.pk_entity_version_concat
      })
    ]

    // emit it
    this.readyToAdd.emit(appe);
    // }

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

  save(appeLabel: AppellationLabel) {
    this.startLoading();

    this.appellationApi.findOrCreateAppellation(
      this.activeProjectService.project.pk_project,
      {
        pk_entity: this.appellation.pk_entity,
        fk_class: this.appellation.fk_class,
        appellation_label: appeLabel
      }
    ).subscribe(appellations => {
      this.completeLoading();

      this.appellation = new InfAppellation(appellations[0])
      this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);

      this.appeChange.emit({
        appellation: this.appellation,
        isDisplayRoleInProject: false
      })

    })
    this.cancelEdit.emit()

  }

  create(appeLabel: AppellationLabel) {
    console.log(appeLabel);
  }



  /**
  * Methods specific to create state
  */

  emitReadyToCreate(appellationLabel: AppellationLabel) {

    this.appellation.appellation_label = appellationLabel;

    this.readyToCreate.emit(this.appellation)

  }

  emitNotReadyToCreate() {

    this.notReadyToCreate.emit()

  }

  /**
  * Methods specific to add state
  */




  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/
  formGroup: FormGroup;

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(appellation: InfAppellation): void {

    let formCrtlsToRemove: string[] = [];

    this.formGroup.addControl('appellationLabel', new FormControl(
      this.appeState.appellation.appellation_label,
      [
        Validators.required
      ]
    ))

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
  onChange = (appe: InfAppellation | null) => {
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

  markAsTouched(){
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
