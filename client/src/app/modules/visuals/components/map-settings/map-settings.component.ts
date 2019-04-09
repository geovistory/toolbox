import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { pathOr, equals } from 'ramda';
import { Subject } from 'rxjs';
import { MapQueryLayerSettings } from '../map-query-layer-settings/map-query-layer-settings.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface DynamicQueryLayerCtrl {
  key: string,
  ctrl: FormControl
}

export interface MapSettings {
  backgroundLayer: any;
  queryLayers: MapQueryLayerSettings[]
}

@Component({
  selector: 'gv-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: MapSettingsComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class MapSettingsComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<MapSettings> {
  static nextId = 0;

  model: MapSettings;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'map-settings';
  id = `map-settings-${MapSettingsComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MapSettings | null {

    return this.model;
  }
  set value(value: MapSettings | null) {
    this.model = value;
    this.onChange(this.model)
  }


  formGroup: FormGroup;
  dynamicQueryLayerCtrls: DynamicQueryLayerCtrl[] = [];

  get queryLayers(): MapQueryLayerSettings[] {
    return this.dynamicQueryLayerCtrls.map(dynCtrl => ({
      ...(dynCtrl.ctrl.value || {})
    }))
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.formGroup = fb.group({})

    this.formGroup.valueChanges.subscribe(controls => {
      const newVal: MapSettings = {
        queryLayers: this.queryLayers,
        backgroundLayer: {}
      }

      if (!equals(newVal, this.model)) {
        this.value = newVal;
      }
    })
  }

  trackByfn(_, item: DynamicQueryLayerCtrl) {
    return item.key;
  }

  dropQueryLayer(event: CdkDragDrop<MapQueryLayerSettings[]>) {
    moveItemInArray(this.dynamicQueryLayerCtrls, event.previousIndex, event.currentIndex);
    this.value = {
      ...this.value,
      queryLayers: this.queryLayers
    }
  }

  addQueryLayerCtrl(queryLayer?: MapQueryLayerSettings, index?: number) {
    index = index === undefined ? this.dynamicQueryLayerCtrls.length : index;
    const c = {
      key: '_' + index,
      ctrl: new FormControl(queryLayer)
    }
    this.dynamicQueryLayerCtrls.push(c)
    this.formGroup.addControl(c.key, c.ctrl)
  }

  removeQueryLayerCtrl(index: number) {
    const key = this.dynamicQueryLayerCtrls[index].key;
    this.dynamicQueryLayerCtrls.splice(index, 1)
    this.formGroup.removeControl(key)
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
    // TODO: implement this

  }

  writeValue(value: MapSettings | null): void {

    const backgroundLayer = pathOr({}, ['backgroundLayer'], value)
    const queryLayers = pathOr([], ['queryLayers'], value)

    this.value = { backgroundLayer, queryLayers };
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
    this.blur.emit()
    this.focused = false;
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }

}
