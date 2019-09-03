import { Component, OnInit, Input, OnDestroy, Optional, Self, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ControlValueAccessor, NgControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { keys } from 'ramda';
import { QueryPathMetaInfo } from '../query-path-control/query-path-control.component';
import { PropertyOption } from '../property-select/property-select.component';
import { ClassAndTypeSelectModel } from '../class-and-type-select/class-and-type-select.component';
import { delay, map, takeUntil, tap } from '../../../../../../node_modules/rxjs/operators';
import { ColDefComponent } from '../col-def/col-def.component';

export type QueryPathSegmentType = 'properties' | 'classes';

export class QueryPathSegment {

  type: QueryPathSegmentType

  data: {

    // for entities table
    classes?: number[];
    types?: number[];

    // for role table
    outgoingProperties?: number[]
    ingoingProperties?: number[]

  }

  constructor(data: QueryPathSegment) {
    Object.assign(this, data)
  }
}

export class ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  ofRootTable?: boolean;
  // If true, users cant edit this column
  defaultType?: 'entity_preview' | 'entity_label' | 'class_label' | 'type_label';

  colName?: string;

  label?: string

  queryPath?: QueryPathSegment[]

  constructor(data: ColDef) {
    Object.assign(this, data)
  }
}


interface DynamicFormControl {
  key: string,
  ctrl: FormControl,
  meta$?: BehaviorSubject<QueryPathMetaInfo>
}

// tslint:disable: member-ordering
class ColDefEditorMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<ColDef[]>{
  static nextId = 0;

  model: ColDef[];


  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'col-def-editor';
  // tslint:disable-next-line: no-use-before-declare
  id = `col-def-editor-${ColDefEditorComponent.nextId++}`;
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

    // TODO: this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): ColDef[] | null {
    return this.model;
  }
  set value(value: ColDef[] | null) {
    this.model = value;
    this.onChange(this.model)
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }



  formGroup: FormGroup;
  dynamicFormControls: DynamicFormControl[] = [];


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.formGroup = fb.group({})

  }


  addCtrl(colDef: ColDef, index) {

    const c: DynamicFormControl = {
      key: '_' + index,
      ctrl: new FormControl(colDef), // TODO add colDefValidator
      meta$: new BehaviorSubject({})
    }
    this.dynamicFormControls.push(c)
    this.formGroup.addControl(c.key, c.ctrl)
  }

  removeCtrl(index: number) {
    const key = this.dynamicFormControls[index].key;
    this.dynamicFormControls.splice(index, 1)
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

  writeValue(value: ColDef[] | null): void {
    this.dynamicFormControls = [];
    const [...ctrlsToRemove] = keys(this.formGroup.controls) as string[];

    ctrlsToRemove.forEach(ctrlName => this.formGroup.removeControl(ctrlName));

    // add controls
    (value || []).forEach((colDef, index) => { this.addCtrl(colDef, index); })

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

}
// tslint:enable: member-ordering

@Component({
  selector: 'gv-col-def-editor',
  templateUrl: './col-def-editor.component.html',
  styleUrls: ['./col-def-editor.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: ColDefEditorComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ColDefEditorComponent extends ColDefEditorMatControl implements AfterViewInit {

  @ViewChildren(ColDefComponent) colDefComponents: QueryList<ColDefComponent>;

  @Input() propertyOptions$: Observable<PropertyOption[]>;
  @Input() classesAndTypes$: Observable<ClassAndTypeSelectModel>;
  @Input() model: ColDef[];
  @Input() colDefs: ColDef[]; // TODO remove this line

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    super(ngControl, fb)

    this.formGroup.valueChanges.pipe(delay(0)).subscribe(controls => {
      if (controls && typeof controls === 'object' && Object.keys(controls).length) {
        this.assignValueFromDynamicControls()
      } else {
        this.value = null;
      }
    })
  }

  ngAfterViewInit() {
    const queryListChange$ = new Subject();
    this.colDefComponents.changes.pipe(
      tap(() => {
        // clear subscriptions to last state of query list
        queryListChange$.next()
      }),
      map((components: ColDefComponent[]) => components.map((component, i) => ({ i, meta$: component.metaInfoChange$ }))),
      takeUntil(this.destroy$)
    ).subscribe(list => {
      list.forEach(item => {
        item.meta$.pipe(delay(0),takeUntil(queryListChange$)).subscribe(meta => {
          this.dynamicFormControls[item.i].meta$.next(meta)
        })
      })
    })
  }

  drop(event: CdkDragDrop<ColDef[]>) {
    moveItemInArray(this.dynamicFormControls, event.previousIndex, event.currentIndex);
    this.assignValueFromDynamicControls()
  }

  assignValueFromDynamicControls() {
    this.value = this.dynamicFormControls.map(dynCtrl => ({
      ...(dynCtrl.ctrl.value || {})
    }))
  }

  addColumn() {

    this.addCtrl(
      new ColDef({
        label: 'New Column',
        queryPath: [
          new QueryPathSegment({
            type: 'properties',
            data: {}
          })
        ]
      }),
      this.dynamicFormControls.length
    )


  }

  removeColumn(i) {
    this.removeCtrl(i)
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

  /**
   * 
   * @param i index of dynamic form control
   * @param e meta info about that control
   */
  onMetaInfoChange(i: number, e: QueryPathMetaInfo) {
    this.dynamicFormControls[i].meta$.next(e);
    // this.ref.detectChanges()
  }
}
