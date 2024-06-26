import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { ChecklistControlService, NestedNode } from '../../services/checklist-control.service';

@Directive()
export abstract class AbstractChecklistControl<NodeData, ControlModel>
  implements OnInit, MatFormFieldControl<ControlModel> {
  static nextId = 0;
  /** Inputs the tree without information about selection and expansion */
  @Input() nestedTree$: Observable<NestedNode<NodeData>[]>;

  /** MaFormFieldControl start */

  id = `AbstractChecklistControl-${AbstractChecklistControl.nextId++}`;
  stateChanges = new Subject<void>();
  private _focused: boolean;

  model: ControlModel;
  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  describedBy = '';
  get focused(): boolean {
    return this._focused;
  }
  set focused(value: boolean) {
    this._focused = value;
    this.stateChanges.next();
  }

  get empty() {
    return this.s.isEmpty();
  }
  get shouldLabelFloat() {
    if (this.focused) return true
    if (!this.empty) return true
    return false
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get value(): ControlModel {
    return this.model;
  }
  set value(value: ControlModel) {
    this.model = value;
    this.onChange(this.model);
  }
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    // TODO: implement this
  }
  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }
  /** MaFormFieldControl end */


  constructor(
    public s: ChecklistControlService<NodeData>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnInit() {
    if (!this.nestedTree$) {
      throw new Error('You must provide nestedTree$ input');
    }
    this.s.setData([])
    this.nestedTree$.subscribe(tree => {
      this.s.setData(tree)
    });
  }

  /** Control Value Accessor start */
  writeValue(m: ControlModel) {
    this.s.selectNodesByData(this.controlModelToDataArray(m));
  }
  registerOnChange(fn: (m: ControlModel) => void) {
    this.onChange = fn;
    this.s.selectionChange$.subscribe(ds => {
      this.onChange(this.dataArrayToControlModel(ds));
    });
  }
  onChange(m: ControlModel) {
    throw new Error('Called befor registerOnChange');
  }
  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }
  onTouch() {
    throw new Error('Called befor registerOnTouched');
  }
  /** Control Value Accessor end */

  abstract controlModelToDataArray(m: ControlModel): NodeData[];

  abstract dataArrayToControlModel(ds: NodeData[]): ControlModel;
}
