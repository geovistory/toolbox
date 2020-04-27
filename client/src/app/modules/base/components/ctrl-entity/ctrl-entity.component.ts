import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ActiveProjectService, EntityPreview, InfPersistentItem, InfTemporalEntity, SysConfig } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';
import { DisableIfHasStatement } from '../pe-it-search-existing/pe-it-search-existing.component';
import { FieldProperty } from '../properties-tree/properties-tree.models';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from './ctrl-entity-dialog/ctrl-entity-dialog.component';

export interface CtrlEntityModel {
  pkEntity?: number,
  persistent_item?: InfPersistentItem,
  temporal_entity?: InfTemporalEntity
}

@Component({
  selector: 'gv-ctrl-entity',
  templateUrl: './ctrl-entity.component.html',
  styleUrls: ['./ctrl-entity.component.css'],
  providers: [{
    provide: MatFormFieldControl, useExisting: CtrlEntityComponent
  }],
})
export class CtrlEntityComponent implements OnDestroy,
  ControlValueAccessor,
  MatFormFieldControl<CtrlEntityModel> {
  static nextId = 0;

  model: CtrlEntityModel;

  @Input() pkClass: number;

  // needed for creating the form, in order to exclude the circular field
  @Input() property: FieldProperty;
  @Input() disableExistingWithStatement: DisableIfHasStatement;

  @Input() showAddList: boolean;



  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-entity';

  id = `ctrl-entity-$ {
    CtrlEntityComponent.nextId++
  }

  `;
  describedBy = '';

  onChange = (_: any) => { }

    ;

  onTouched = () => { }

    ;

  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input() get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _placeholder: string;

  @Input() get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _required = false;

  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input() get value(): CtrlEntityModel | null {
    return this.model;
  }

  set value(value: CtrlEntityModel | null) {

    if (!value || (!value.pkEntity && !value.temporal_entity && !value.persistent_item)) {
      this.model = undefined
    } else {
      this.model = value;
    }

    this.onChange(this.model);
    this.value$.next(value);
  }

  value$ = new BehaviorSubject<CtrlEntityModel>(null);

  entityPreview$: Observable<EntityPreview>;

  constructor(@Optional() @Self() public ngControl: NgControl,
    private dialog: MatDialog,
    private p: ActiveProjectService,
    private c: ConfigurationPipesService) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

  }

  ngOnInit() {
    if (!this.pkClass) throw "pkClass is required";

    this.c.pipeClassLabel(this.pkClass)

    this.entityPreview$ = this.value$.pipe(switchMap(val => {

      if (val && val.pkEntity) return this.p.streamEntityPreview(val.pkEntity)
      else if (val && (val.persistent_item || val.temporal_entity)) {
        return combineLatest(
          this.p.dfh$.class$.by_pk_class$.key(this.pkClass),
          this.c.pipeClassLabel(this.pkClass)
        ).pipe(
          map(([klass, label]) => {
            let type;
            if (klass.basic_type === 8 || klass.basic_type === 30) {
              type = 'peIt'
            }
            else {
              type = 'teEn'
            }
            const e: EntityPreview = {
              entity_label: 'New item (click for details)',
              class_label: label,
              entity_type: type,
              pk_entity: undefined,
              fk_project: undefined
            }
            return e
          })
        )
      }

      return of(null);
    }))

  }

  openModal() {
    if (!this.disabled) {

      this.dialog.open<CtrlEntityDialogComponent,
        CtrlEntityDialogData,
        CtrlEntityModel>(CtrlEntityDialogComponent, {

          // minWidth: '800px',
          height: 'calc(100% - 30px)',
          width: this.showAddList ? '980px' : '500px',
          maxWidth: '100%',
          data: {
            initVal$: this.value$,
            showAddList: this.showAddList,
            hiddenProperty: this.property,
            alreadyInProjectBtnText: 'Select',
            notInProjectClickBehavior: 'selectOnly',
            notInProjectBtnText: 'Select',
            disableIfHasStatement: this.disableExistingWithStatement,
            classAndTypePk: {
              pkClass: this.pkClass,
              pkType: undefined
            }

            ,
            pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
          }
        }

        ).afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          if (!!result) this.value = result
          this.onBlur()
        }

        );
    }
  }


  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }


  onContainerClick() {
    this.openModal()
    this.onFocus()
  }

  writeValue(value: CtrlEntityModel | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur() {
    this.onTouched();
    this.blur.emit();
    this.focused = false;
  }

  onFocus() {
    this.focus.emit();
    this.focused = true;
  }

}
