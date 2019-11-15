import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, QueryList, Self, ViewChildren } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, ValidatorFn } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { equals, keys } from 'ramda';
import { BehaviorSubject, merge, Observable, of, Subject, combineLatest } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, delay, tap } from 'rxjs/operators';
import { QueryService } from '../../services/query.service';
import { ClassAndTypePathSegmentComponent, classAndTypePathSegmentRequiredValidator } from '../class-and-type-path-segment/class-and-type-path-segment.component';
import { ColDef, QueryPathSegment, QueryPathSegmentType } from '../../../../../../../src/common/interfaces';
import { PropertyPathSegmentComponent, propertyPathSegmentRequiredValidator } from '../property-path-segment/property-path-segment.component';
import { PropertyOption, PropertySelectModel } from '../property-select/property-select.component';
import { ClassAndTypeSelectModel } from '../class-and-type-select/class-and-type-select.component';
import { InformationPipesService } from 'app/modules/information/new-services/information-pipes.service';


interface DynamicFormControl {
  key: string,
  ctrl: FormControl,
  properties?: {
    propertyOptions$: Observable<PropertyOption[]>
  }
  classes?: {
    pkClasses$: Observable<number[]>
  }
}

export interface QueryPathMetaInfo {
  isGeo?: boolean
  isTemporal?: boolean
}

@Component({
  selector: 'gv-query-path-control',
  templateUrl: './query-path-control.component.html',
  styleUrls: ['./query-path-control.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: QueryPathControlComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class QueryPathControlComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<QueryPathSegment[]> {
  static nextId = 0;
  @ViewChildren(PropertyPathSegmentComponent) propertyPathSegments: QueryList<PropertyPathSegmentComponent>;
  @ViewChildren(ClassAndTypePathSegmentComponent) classAndTypePathSegments: QueryList<ClassAndTypePathSegmentComponent>;

  propertyOptions$: Observable<PropertyOption[]>;

  // For root element of path
  @Input() classesAndTypes$: Observable<ClassAndTypeSelectModel>;
  _classesAndTypes$ = new BehaviorSubject<ClassAndTypeSelectModel>({});
  pkClasses$: Observable<number[]>;
  preselectedClasses = new FormControl({ disabled: true });

  propertyOptionsBehaviorSubject$ = new BehaviorSubject<PropertyOption[]>(null);

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  metaInfoChange$ = new BehaviorSubject<QueryPathMetaInfo>({});


  model: QueryPathSegment[];

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  afterViewInit$ = new BehaviorSubject<boolean>(false);
  stateChanges = new Subject<void>();
  focused = false;
  // errorState = false;
  controlType = 'query-path-control';
  id = `query-path-control-${QueryPathControlComponent.nextId++}`;
  describedBy = '';


  isTemporal$: Observable<boolean>;
  isGeo$: Observable<boolean>;


  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model && this.model.length ? false : true;
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
  get value(): QueryPathSegment[] | null {
    return this.model;
  }
  set value(value: QueryPathSegment[] | null) {

    if (!equals(this.model, value)) {
      this.model = value;
      this.onChange(this.value)
    }

  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  formGroup: FormGroup;
  dynamicFormControls: DynamicFormControl[] = [];


  get showAddBtn() {

    if (this.dynamicFormControls.length === 0) return true;

    if (this.dynamicFormControls[this.dynamicFormControls.length - 1].ctrl.valid) return true;

    else return false;
  }




  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder,
    private q: QueryService,
    private i: InformationPipesService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.formGroup = fb.group({})

    const lastSegment$: Observable<QueryPathSegment> = this.formGroup.valueChanges.pipe(
      map(() => {
        if (this.dynamicFormControls.length === 0) return false;
        const ctrl = this.dynamicFormControls[this.dynamicFormControls.length - 1].ctrl
        return ctrl.value || undefined;
      })
    )
    this.isTemporal$ = this.q.pathSegmentIsTemporal$(lastSegment$)
    this.isGeo$ = this.q.pathSegmentIsGeo$(lastSegment$)

    combineLatest(this.isTemporal$, this.isGeo$, this.afterViewInit$).pipe(delay(0), takeUntil(this.destroy$)).subscribe(([isTemporal, isGeo]) => {
      this.metaInfoChange$.next({ isGeo, isTemporal })
    })
  }

  getKey(_, item) {
    return item.key
  }

  ngOnInit() {
    if (!this.classesAndTypes$) throw new Error('please provide classesAndTypes$ input')

    this.classesAndTypes$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this._classesAndTypes$.next(d)
    })

    this.pkClasses$ = this._classesAndTypes$.pipe(
      switchMap(classesAndTypes => this.i.pipeClassesFromClassesAndTypes(classesAndTypes))
    )

    this.propertyOptions$ = this.pkClasses$.pipe(switchMap(classes => this.i.pipePropertyOptionsFormClasses(classes)))

    this._classesAndTypes$.pipe(takeUntil(this.destroy$))
      .subscribe(selection => {
        this.preselectedClasses.setValue(selection)
      })

  }

  ngAfterViewInit() {
    this.afterViewInit$.next(true);
    this.formGroup.valueChanges.pipe(delay(0)).subscribe(controls => {
      if (controls && typeof controls === 'object' && Object.keys(controls).length) {
        const newVal: QueryPathSegment[] = this.dynamicFormControls.map(dynCtrl => ({
          type: dynCtrl.classes ? 'classes' : 'properties',
          ...(dynCtrl.ctrl.value || {})
        }))

        if (!equals(newVal, this.model)) {
          this.value = newVal;
        }
      } else {
        this.value = null;
      }
    })
  }


  // When user adds a next path segment
  addSegment() {
    const d = this.dynamicFormControls
    const l = d.length
    const type = l === 0 ? 'properties' : d[l - 1].classes ? 'properties' : 'classes';
    this.addCtrl({ type, data: {} }, this.dynamicFormControls.length)
  }


  removeSegmentByIndex?(i: number) {
    this.removeCtrl(i);
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

  writeValue(value: QueryPathSegment[] | null): void {

    // remove controls
    this.dynamicFormControls = [];
    const [...ctrlsToRemove] = keys(this.formGroup.controls) as string[];

    ctrlsToRemove.forEach(ctrlName => this.formGroup.removeControl(ctrlName));

    // add controls
    (value || []).forEach((segment, index) => {
      this.addCtrl(segment, index);
    })

    this.value = value;

  }



  private getSelectOptions$(type: string, index: any): {
    properties?: {
      propertyOptions$: Observable<PropertyOption[]>
    }
    classes?: {
      pkClasses$: Observable<number[]>
    }
  } {

    if (type === 'properties') {
      return {
        properties: {
          propertyOptions$: this.getPropertyOptionsObservable(index)
        }
      }
    } else if (type === 'classes') {
      return {
        classes: {
          pkClasses$: this.getPkClassesObservable(index)
        }
      }
    }
  }
  getPkClassesObservable(i: number): Observable<number[]> {
    const previousCtrl = this.dynamicFormControls[i - 1].ctrl
    const val: QueryPathSegment = previousCtrl.value;
    return merge(of(val.data), previousCtrl.valueChanges.pipe(map((value: QueryPathSegment) => value.data)))
      .pipe(
        tap((x) => {

        }),
        switchMap((value: PropertySelectModel) => this.i.pipePkClassesFromPropertySelectModel(value)),
        tap((x) => {

        }),
      )
  }
  getPropertyOptionsObservable(i: number): Observable<PropertyOption[]> {
    let classesAndTypes$: Observable<ClassAndTypeSelectModel>
    if (i === 0) {
      classesAndTypes$ = this._classesAndTypes$
    } else {
      const previousCtrl = this.dynamicFormControls[i - 1].ctrl
      const val: QueryPathSegment = previousCtrl.value;
      classesAndTypes$ = merge(of(val.data), previousCtrl.valueChanges.pipe(map((value: QueryPathSegment) => value.data)))
    }

    return classesAndTypes$.pipe(
      switchMap((value: ClassAndTypeSelectModel) => this.i.pipePropertyOptionsFromClassesAndTypes(value))
    )
  }


  retrieveType(segment: QueryPathSegment): QueryPathSegmentType {
    if (segment && segment.type) {
      if (segment.type === 'classes' || segment.type === 'properties') {
        return segment.type
      }
    }

    if (segment && segment.data) {
      if (segment.data.ingoingProperties || segment.data.outgoingProperties) return 'properties'
      if (segment.data.classes || segment.data.types) return 'classes'
    }

    throw new Error('Type of QueryPathSegment could not be retrieved')
  }

  retrieveValidator(type: QueryPathSegmentType): ValidatorFn {
    if (type === 'classes') {
      return classAndTypePathSegmentRequiredValidator()
    } else if (type === 'properties') {
      return propertyPathSegmentRequiredValidator()
    }
    throw new Error('Validator of QueryPathSegment could not be retrieved')

  }
  addCtrl(segment: QueryPathSegment, index) {
    const type = this.retrieveType(segment);
    const validator = this.retrieveValidator(type)

    const c: DynamicFormControl = {
      key: '_' + index,
      ctrl: new FormControl(segment, [validator]),
      ... this.getSelectOptions$(type, index)
    }
    this.dynamicFormControls.push(c)
    this.formGroup.addControl(c.key, c.ctrl)
  }
  removeCtrl(index: number) {
    const key = this.dynamicFormControls[index].key;
    this.dynamicFormControls.splice(index, 1)
    this.formGroup.removeControl(key)
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
