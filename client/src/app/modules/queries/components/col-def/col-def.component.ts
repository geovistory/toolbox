import { Component, OnInit, Input, Output, EventEmitter, Optional, OnDestroy, Self, ViewChild, AfterViewInit } from '@angular/core';
import { ColDef, QueryPathSegment } from '../col-def-editor/col-def-editor.component';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FormBuilder, FormControl, ControlValueAccessor, NgControl, FormGroup, Validators } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, filter, map, delay, takeWhile } from 'rxjs/operators';
import { equals } from 'ramda';
import { ValidationService } from 'app/core';
import { QueryPathMetaInfo, QueryPathControlComponent } from '../query-path-control/query-path-control.component';
import { PropertyOption } from '../property-select/property-select.component';
import { ClassAndTypeSelectModel } from '../class-and-type-select/class-and-type-select.component';
import { QueryService } from '../../services/query.service';


// tslint:disable: member-ordering
class ColDefMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<ColDef>{
  static nextId = 0;

  model: ColDef;


  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'col-def';
  // tslint:disable-next-line: no-use-before-declare
  id = `col-def-${ColDefComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  @Output() metaInfoChange = new EventEmitter<QueryPathMetaInfo>();

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

    // TODO: this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): ColDef | null {
    return this.model;
  }
  set value(value: ColDef | null) {
    this.model = value;
    this.onChange(this.model)
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  get defaultLabel() { return 'New Column' }
  get defaultQueryPath() {
    return [
      new QueryPathSegment({
        type: 'properties',
        data: {}
      })
    ]
  }

  formGroup: FormGroup;
  queryPathFormCtrl: FormControl;
  labelCtrl: FormControl;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.queryPathFormCtrl = new FormControl(null);
    this.labelCtrl = new FormControl(null, [Validators.required]);

    this.formGroup = fb.group({
      queryPathFormControl: this.queryPathFormCtrl,
      labelCtrl: this.labelCtrl
    })

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

  writeValue(value: ColDef | null): void {
    const label = (value || { label: this.defaultLabel }).label;
    const queryPath = (value || { queryPath: this.defaultQueryPath }).queryPath;
    this.value = {
      label,
      queryPath,
      // and all other, not changable properties
      ...(value || {})
    };

    this.labelCtrl.setValue(label);
    this.queryPathFormCtrl.setValue(queryPath);

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

}
// tslint:enable: member-ordering


@Component({
  selector: 'gv-col-def',
  templateUrl: './col-def.component.html',
  styleUrls: ['./col-def.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: ColDefComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ColDefComponent extends ColDefMatControl implements AfterViewInit {
  @ViewChild(QueryPathControlComponent, { static: false }) queryPathControl: QueryPathControlComponent;

  metaInfoChange$ = new BehaviorSubject<QueryPathMetaInfo>({});


  @Input() propertyOptions$: Observable<PropertyOption[]>;
  @Input() classesAndTypes$: Observable<ClassAndTypeSelectModel>;

  @Input() colDef: ColDef; // TODO: remove this line

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  treeControl
  treeFlattener
  dataSource

  constructor(@Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder,
    private q: QueryService) {
    super(ngControl, fb)

    this.formGroup.valueChanges.pipe(delay(0), takeUntil(this.destroy$))
      .subscribe(vals => {

        const newVal: ColDef = {
          ...this.model,
          label: this.labelCtrl.value,
          queryPath: (this.queryPathFormCtrl.value || this.defaultQueryPath),
        }

        if (!equals(newVal, this.model)) {
          this.value = newVal;
        }
      })
  }


  ngOnInit() {

    // Only for entity_preview column

    const classes$ = this.classesAndTypes$.pipe(
      filter(() => (this.model && this.model.defaultType === 'entity_preview')),
      this.q.classesFromClassesAndTypes()
    )

    const isTemporal$ = classes$.pipe(this.q.classesAreTemporal())
    const isGeo$ = classes$.pipe(this.q.classesAreGeo())

    combineLatest(isGeo$, isTemporal$).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([isGeo, isTemporal]) => {
      const meta: QueryPathMetaInfo = { isTemporal, isGeo }
      this.metaInfoChange.emit(meta)
    })
  }

  ngAfterViewInit() {
    if (this.queryPathControl) this.queryPathControl.metaInfoChange$.pipe(takeUntil(this.destroy$))
      .subscribe(d => this.metaInfoChange$.next(d))
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
