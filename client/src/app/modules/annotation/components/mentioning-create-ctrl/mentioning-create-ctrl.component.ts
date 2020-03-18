import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatChunk, EntityPreview, IAppState, InfRole } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { Subject } from 'rxjs';

type CtrlModel = InfRole;

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
export class MentioningCreateCtrlComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  // Emits when form is touched
  @Output() touched = new EventEmitter<void>();

  // Domain: F2 Expression / geovC5 Expression Portion.
  // Provide a value to set this field onInit
  @Input() domainInfoEntity: EntityPreview;
  domainInfoEntityFixed: boolean;

  // Domain: Chunk. Provide a value to set this field onInit
  @Input() domainChunk: DatChunk;
  @Input() domainChunkFixed: boolean;

  // Range Entity. Provide a value to set this field onInit
  // Any PeIt or TeEn
  @Input() rangeInfoEntity: EntityPreview;
  rangeInfoEntityFixed: boolean;

  domainInfoEntityEditing;

  domainInfoEntityClassPks = [
    DfhConfig.CLASS_PK_EXPRESSION,
    DfhConfig.CLASS_PK_EXPRESSION_PORTION
  ]

  get property(): { label: string, pk_property: number } {
    if (this.domainChunk) {
      return {
        label: 'Refers to',
        pk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
      }
    }
    else if (this.domainInfoEntity) {
      return {
        label: 'Mentions',
        pk_property: DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS
      }
    } else {
      return null
    }
  }

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit() {
    if (this.rangeInfoEntity) this.rangeInfoEntityFixed = true;
    if (this.domainInfoEntity) this.domainInfoEntityFixed = true;
    if (this.domainChunk) this.domainChunkFixed = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.domainChunk) {
      this.validateAndEmit()
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // validates and emits onChange
  validateAndEmit() {

    // If valid
    if (
      this.rangeInfoEntity
      && (
        this.domainInfoEntity ||
        this.domainChunk
      )
    ) {
      const role = new InfRole({
        fk_entity: this.rangeInfoEntity.pk_entity,
        fk_property: this.property.pk_property
      })
      if (this.domainInfoEntity) {
        role.fk_temporal_entity = this.domainInfoEntity.pk_entity;
      } else if (this.domainChunk) {
        role.domain_chunk = this.domainChunk;
      }
      this.onChange(role)
    } else {
      this.onChange(null)
    }
  }




  onDropRangeInfoEntity(entity) {
    this.rangeInfoEntity = entity;
    this.validateAndEmit()
  }

  onDropDomainInfoEntity(entity: EntityPreview) {
    this.domainInfoEntity = entity;

    this.validateAndEmit()
  }

  resetDomainInfoEntity() {
    this.domainInfoEntity = undefined;
    this.validateAndEmit()
  }

  resetRangeInfoEntity() {
    this.rangeInfoEntity = undefined;
    this.validateAndEmit()
  }


  allowDropDomainInfoEntity() {
    return (entity: EntityPreview) => [
      DfhConfig.CLASS_PK_EXPRESSION, DfhConfig.CLASS_PK_EXPRESSION_PORTION
    ].includes(entity.fk_class);
  }

  allowDropRangeInfoEntity() {
    return (entity: EntityPreview) => ['peIt', 'teEn'].includes(entity.entity_type)
  }

  // /**
  //  * Verifies if given pkClass is of a class regarded as source:
  //  * Manifestaiton product type
  //  * Manifestation singleton
  //  * @param pkClass
  //  */
  // private isSource(pkClass: number) {
  //   return (this.sourcePks.indexOf(pkClass) > -1) ? true : false;
  // }

  // /**
  //  * Verifies if given pkCLass is of a class that is regarded as a source or section:
  //  * Manifestaiton product type
  //  * Manifestation singleton
  //  * Expression
  //  * @param pkClass
  //  */
  // private isSourceOrSection(pkClass: number) {
  //   return (this.domainInfoEntityClassPks.indexOf(pkClass) > -1) ? true : false;
  // }

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
