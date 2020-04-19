import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ActiveProjectService, EntityPreview, SysConfig, InfPersistentItem, InfTemporalEntity } from 'app/core';
import { CreateOrAddEntityEvent } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, mergeMap, takeUntil } from 'rxjs/operators';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from './ctrl-entity-dialog/ctrl-entity-dialog.component';
import { FieldProperty } from '../properties-tree/properties-tree.models';

export interface CtrlEntityModel {
  pkEntity?: number,
  persistentItem?: InfPersistentItem,
  temporalEntity?: InfTemporalEntity
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
    this.model = value;
    this.onChange(this.model);
    this.value$.next(value);
  }

  value$ = new BehaviorSubject<CtrlEntityModel>(null);

  constructor(@Optional() @Self() public ngControl: NgControl,
    private dialog: MatDialog,
    private p: ActiveProjectService) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

  }

  ngOnInit() {
    if (!this.pkClass) throw "pkClass is required";
  }

  openModal() {
    if (!this.disabled) {

      this.dialog.open<CtrlEntityDialogComponent,
        CtrlEntityDialogData,
        CtrlEntityModel>(CtrlEntityDialogComponent, {

          // minWidth: '800px',
          height: 'calc(100% - 30px)',
          width: '980px',
          maxWidth: '100%',
          data: {
            initVal$: this.value$,
            hiddenProperty: this.property,
            alreadyInProjectBtnText: 'Select',
            notInProjectClickBehavior: 'selectOnly',
            notInProjectBtnText: 'Select',
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


  onContainerClick(event: MouseEvent) {
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
