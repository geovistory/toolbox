import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject, Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { equals, keys, omit } from 'ramda';
import { MccColorPickerService } from 'material-community-components';
import { ValidationService, ActiveProjectService, U, latestEntityVersions, ComQuery } from 'app/core';
import { map, filter, distinct, takeUntil, tap, distinctUntilChanged } from 'rxjs/operators';
import { ColDef } from 'app/modules/queries/components/col-def-editor/col-def-editor.component';



export interface QueryPkOption {
  value: number
  label: string
}

export interface ColOption {
  value: number // index of colum in query.columns
  label: string // label of column
}

export interface MapQueryLayerSettings {
  queryPk?: number
  queryVersion?: number
  geoCol?: number
  color?: string // RGB string like #FFFFFF
}

@Component({
  selector: 'gv-map-query-layer-settings',
  templateUrl: './map-query-layer-settings.component.html',
  styleUrls: ['./map-query-layer-settings.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: MapQueryLayerSettingsComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class MapQueryLayerSettingsComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<MapQueryLayerSettings> {
  static nextId = 0;
  compareFn = equals;

  model: MapQueryLayerSettings;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  queryOptions$: Observable<QueryPkOption[]>;
  queryVersions$: Observable<number[]>;
  isOldVersion$: Observable<boolean>;
  comQuery$: Observable<ComQuery>;
  geoColOptions$: Observable<ColOption[]>;

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  writeValue$ = new Subject<void>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'map-query-layer-settings';
  id = `map-query-layer-settings-${MapQueryLayerSettingsComponent.nextId++}`;
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
  get value(): MapQueryLayerSettings | null {
    return this.model;
  }
  set value(value: MapQueryLayerSettings | null) {
    this.model = value;
    this.onChange(this.model)
  }

  get queryPk(): number {
    return this.queryPkCtrl.value
  }

  get queryVersion(): number {
    return this.queryVersionCtrl.value
  }

  get color() {
    return this.colorCtrl.value
  }

  get geoCol() {
    return this.geoColCtrl.value
  }

  get formVal(): MapQueryLayerSettings {
    return {
      queryPk: this.queryPk,
      queryVersion: this.queryVersion,
      color: this.color,
      geoCol: this.geoCol
    }
  }

  formGroup: FormGroup;
  queryPkCtrl: FormControl;
  queryVersionCtrl: FormControl;
  geoColCtrl: FormControl;
  colorCtrl: FormControl;
  defaultColor = '#EE1690'

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder,
    public p: ActiveProjectService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.queryPkCtrl = new FormControl(null, Validators.required)
    this.queryVersionCtrl = new FormControl(null, Validators.required)
    this.geoColCtrl = new FormControl(null, Validators.required)
    this.colorCtrl = new FormControl(null, ValidationService.hexColorValidator())
    this.formGroup = fb.group({
      queryPkCtrl: this.queryPkCtrl,
      queryVersionCtrl: this.queryVersionCtrl,
      geoColCtrl: this.geoColCtrl,
      colorCtrl: this.colorCtrl
    })

    this.formGroup.valueChanges.subscribe(controls => {
      const newVal = this.formVal;
      if (!equals(newVal, this.model)) {
        this.value = newVal;
      }
    })

    p.loadQueries();

    this.queryOptions$ = p.comQueryVersionsByPk$.pipe(
      latestEntityVersions(),
      map(queries => queries.map(q => ({
        value: q.pk_entity,
        label: q.name
      })))
    )

    // this is triggered on manual value changes as well as on write value
    this.queryVersions$ = combineLatest(
      merge(this.queryPkCtrl.valueChanges, this.writeValue$),
      p.comQueryVersionsByPk$
    ).pipe(
      filter(([queryPk, comQueries]) => (this.queryPk !== null && !!comQueries)),
      map(([queryPk, comQueries]) => {
        const versions = keys(omit(['_latestVersion'], comQueries[this.queryPk]))
          .map(key => parseInt(key.toString(), 10))
          .sort((a, b) => (a > b ? -1 : 1));
        return versions
      })
    )

    // this is triggered on manual value changes
    combineLatest(
      this.queryPkCtrl.valueChanges,
      p.comQueryVersionsByPk$
    ).pipe(
      filter(([pk, comQs]) => !!pk && !!comQs),
      takeUntil(this.destroy$)
    ).subscribe(([pk, comQs]) => {
      // on manual change of pkQuery take the latest version automatically
      this.queryVersionCtrl.setValue(comQs[pk]._latestVersion)
    })

    this.isOldVersion$ = combineLatest(this.queryVersions$, this.queryVersionCtrl.valueChanges).pipe(
      map(([vs, v]) => (vs[0] > v))
    )

    this.comQuery$ = combineLatest(
      merge(this.queryPkCtrl.valueChanges, this.writeValue$),
      this.queryVersionCtrl.valueChanges, 
      p.comQueryVersionsByPk$)
    .pipe(
      filter(([pk, v, comQueries]) => (this.queryPk !== null && this.queryVersion !== null && !!comQueries)),
      map(([pk, v, comQueries]) => {
        const versions = comQueries[this.queryPk];
        if (versions) {
          const version = versions[this.queryVersion]
          if (version.query) {
            return version
          } else {
            this.p.loadQueryVersion(this.queryPk, this.queryVersion);
            return null;
          }
        } else return null
      })
    )


    this.geoColOptions$ = this.comQuery$
      .pipe(
        filter((c) => !!c),
        map((c) => c.query.columns),
        map(colDefs => colDefs.map((colDef, index) => ({
          value: index,
          label: colDef.label
        })))
      )
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

  writeValue(value: MapQueryLayerSettings | null): void {
    value = value ? value : {};
    this.queryPkCtrl.setValue(value.queryPk || null, { emitEvent: false })
    this.queryVersionCtrl.setValue(value.queryVersion || null)
    this.geoColCtrl.setValue(value.geoCol || null)
    this.colorCtrl.setValue(value.color || this.defaultColor)
    this.writeValue$.next();
    this.value = this.formVal;
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
