import { Component, OnInit, ContentChild, Output, EventEmitter, AfterContentInit, OnDestroy, Input, Optional, Self } from '@angular/core';
import { TreeChecklistComponent, TreeNode } from '../tree-checklist.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'gv-tree-checklist-select',
  templateUrl: './tree-checklist-select.component.html',
  styleUrls: ['./tree-checklist-select.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: TreeChecklistSelectComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class TreeChecklistSelectComponent implements ControlValueAccessor, MatFormFieldControl<TreeNode<any>[]>, AfterContentInit, OnDestroy {
  static nextId = 0;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @ContentChild(TreeChecklistComponent) treeChecklist: TreeChecklistComponent;
  @Output() selectionChange = new EventEmitter<TreeNode<any>[]>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  @Input() compareWith: (a: TreeNode<any>, b: TreeNode<any>) => boolean;

  selectionChange$ = new BehaviorSubject<TreeNode<any>[]>([]);

  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'tree-checklist-select';
  id = `tree-checklist-select-${TreeChecklistSelectComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.selectionChange$.value.length === 0;
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
  get value(): TreeNode<any>[] | null {
    return this.selectionChange$.value;
  }
  set value(nodes: TreeNode<any>[] | null) {
    this.treeChecklist.setSelection(nodes);
  }

  get selectedText(): string {
    return this.value.map(node => node.data.label).join(', ')
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit() {

    // On selection Change:
    // 1. select or deselect mat options
    this.treeChecklist.selectionChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((selected) => {
        this.onSelectionChange(selected)
      })

  }

  onSelectionChange(selected) {
    this.selectionChange.emit(selected);
    this.selectionChange$.next(selected);
    this.onChange(selected);
  }

  onOpen() {
    this.focused = true;
    this.focus.emit()
  }
  onClose() {
    this.focused = false;
    this.blur.emit()
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

    // open dropdown
  }

  writeValue(nodes: TreeNode<any>[] | null): void {
    this.value = nodes;
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
