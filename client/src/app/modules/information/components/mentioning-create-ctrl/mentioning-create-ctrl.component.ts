import { Component, EventEmitter, forwardRef, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState, InfEntityAssociation, DataUnitPreview, InfChunk, ComConfig } from 'app/core';
import { Subject } from 'rxjs';
import { DfhConfig } from '../../shared/dfh-config';

type CtrlModel = InfEntityAssociation;

@Component({
  selector: 'gv-mentioning-create-ctrl',
  templateUrl: './mentioning-create-ctrl.component.html',
  styleUrls: ['./mentioning-create-ctrl.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MentioningCreateCtrlComponent),
      multi: true
    }
  ],
})
export class MentioningCreateCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  // Emits when form is touched
  @Output() touched = new EventEmitter<void>();
  // Domain: Mentioned Entity. Provide a value to set this field onInit

  @Input() mentionedEntity: DataUnitPreview;
  mentionedEntityFixed: boolean;

  // Range: F3 / F4 Manifestation. Provide a value to set this field onInit
  @Input() sourceEntity: DataUnitPreview;
  sourceEntityFixed: boolean;

  // Range: E2 Expression. Provide a value to set this field onInit
  @Input() sectionEntity: DataUnitPreview;
  sectionEntityFixed: boolean;

  sourceOrSectionEntityEditing;

  // Range: Chunk. Provide a value to set this field onInit
  @Input() chunkEntity: InfChunk;

  sourceAndSectionPks = [
    DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
    DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON,
    DfhConfig.CLASS_PK_EXPRESSION
  ]

  sourcePks = [
    DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
    DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON
  ]

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit() {
    if (this.mentionedEntity) this.mentionedEntityFixed = true;
    if (this.sourceEntity) this.sourceEntityFixed = true;
    if (this.sectionEntity) this.sectionEntityFixed = true;

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  // triggered when bar changes
  barChange(d: CtrlModel) {
    this.validateAndEmit()
  }

  // validates and emits onChange
  validateAndEmit() {

    // If foo valid
    if ('valid') {
      this.onChange(null)
    } else {
      this.onChange(null)
    }
  }

  onDropMentionedEntity(entity) {
    this.mentionedEntity = entity;
  }

  onDropSourceEntity(entity: DataUnitPreview) {
    if (this.isSourceOrSection(entity.fkClass)) {
      this.sourceEntity = entity;
    } else if (entity.fkClass === 218) {
      this.sectionEntity = entity;
    }
  }

  allowDropSource() {
    return (entity) => this.isSourceOrSection(entity.fkClass);
  }

  /**
   * Verifies if given pkClass is of a class regarded as source:
   * Manifestaiton product type
   * Manifestation singleton
   * @param pkClass
   */
  private isSource(pkClass: number) {
    return (this.sourcePks.indexOf(pkClass) > -1) ? true : false;
  }

  /**
   * Verifies if given pkCLass is of a class that is regarded as a source or section:
   * Manifestaiton product type
   * Manifestation singleton
   * Expression
   * @param pkClass
   */
  private isSourceOrSection(pkClass: number) {
    return (this.sourceAndSectionPks.indexOf(pkClass) > -1) ? true : false;
  }

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   *
   */
  writeValue(value: CtrlModel): void {

    // if (value && value.foo) this.fooCtrl.setValue(value.foo);

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
  onChange = (value: CtrlModel | null) => {
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
