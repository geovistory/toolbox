import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EntityPreview, IAppState, DatChunk, InfEntityAssociation, ProjectCrm, U } from 'app/core';
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

  @Input() mentionedEntity: EntityPreview;
  mentionedEntityFixed: boolean;

  // Range: F3 / F4 Manifestation. Provide a value to set this field onInit
  @Input() sourceEntity: EntityPreview;
  sourceEntityFixed: boolean;

  // Range: E2 Expression. Provide a value to set this field onInit
  @Input() sectionEntity: EntityPreview;
  sectionEntityFixed: boolean;

  sourceOrSectionEntityEditing;

  // Range: Chunk. Provide a value to set this field onInit
  @Input() chunkEntity: DatChunk;

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

  // validates and emits onChange
  validateAndEmit() {

    // If foo valid
    if (
      this.mentionedEntity
      && (
        this.sourceEntity ||
        this.sectionEntity ||
        this.chunkEntity
      )
    ) {
      const rangeEntity = this.chunkEntity || this.sectionEntity || this.sourceEntity;
      const rangeClass = this.chunkEntity ? DfhConfig.CLASS_PK_CHUNK : (this.sectionEntity || this.sourceEntity).fk_class;
      const ea = new InfEntityAssociation({
        fk_info_domain: this.mentionedEntity.pk_entity,
        fk_info_range: rangeEntity.pk_entity,
        fk_property: this.getFkProperty(this.mentionedEntity.fk_class, rangeClass)
      })
      if (this.chunkEntity) {
        ea.range_chunk = this.chunkEntity;
      }
      this.onChange(ea)
    } else {
      this.onChange(null)
    }
  }


  getFkProperty(domainClass, rangeClass): number {
    const classes = this.ngRedux.getState().activeProject.crm.classes;

    for (const pkClass in classes) {
      if (classes.hasOwnProperty(pkClass)) {
        const klass = classes[pkClass];

        for (const key in klass.propertyFields) {
          if (klass.propertyFields.hasOwnProperty(key)) {
            const property = klass.propertyFields[key].property;
            if (
              property.dfh_has_domain == domainClass &&
              property.dfh_has_range == rangeClass &&
              property.dfh_fk_property_of_origin === DfhConfig.PROPERTY_OF_ORIGIN_PK_IS_MENTIONED_IN
            ) return property.dfh_pk_property;
          }
        }
      }
    }


  }

  onDropMentionedEntity(entity) {
    this.mentionedEntity = entity;
    this.validateAndEmit()
  }

  onDropSourceEntity(entity: EntityPreview) {
    if (this.isSourceOrSection(entity.fk_class)) {
      this.sourceEntity = entity;
    } else if (entity.fk_class === 218) {
      this.sectionEntity = entity;
    }
    this.validateAndEmit()
  }

  resetMentionedEntity() {
    this.mentionedEntity = undefined;
    this.validateAndEmit()
  }

  resetSourceEntity() {
    this.sourceEntity = undefined;
    this.validateAndEmit()
  }

  resetSectionEntity() {
    this.sectionEntity = undefined;
    this.validateAndEmit()
  }

  allowDropSource() {
    return (entity: EntityPreview) => this.isSourceOrSection(entity.fk_class);
  }

  allowDropMentionedEntity() {
    return (entity: EntityPreview) => {
      const classes = this.ngRedux.getState().activeProject.crm.classes;

      for (const pkClass in classes) {
        if (classes.hasOwnProperty(pkClass)) {
          const klass = classes[pkClass];

          for (const key in klass.propertyFields) {
            if (klass.propertyFields.hasOwnProperty(key)) {
              const property = klass.propertyFields[key].property;
              if (
                property.dfh_has_domain == entity.fk_class &&
                property.dfh_fk_property_of_origin === DfhConfig.PROPERTY_OF_ORIGIN_PK_IS_MENTIONED_IN
              ) return true;
            }
          }
        }
      }

      return false;

    }
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
