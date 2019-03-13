import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self, Directive } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { ActiveProjectService } from 'app/core';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { distinct, filter, map, mergeMap, tap } from 'rxjs/operators';

export interface ClassAndTypeSelectModel {
  classes?: number[]
  types?: number[]
}

export function classOrTypeRequiredCondition(model: ClassAndTypeSelectModel) {
  return (!model || !model ||
    [...(model.classes || []), ...(model.types || [])].length === 0);
}

/** At least one class or type must be selected */
export function classOrTypeRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const model: ClassAndTypeSelectModel = control.value;
    return classOrTypeRequiredCondition(model) ? { 'classOrTypeRequired': { value: control.value } } : null;
  };
}

@Directive({
  selector: '[gvClassOrTypeRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ClassOrTypeRequiredValidatorDirective, multi: true }]
})
export class ClassOrTypeRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return classOrTypeRequiredValidator()(control);
  }
}

export interface TreeNodeData {
  id: string // id of the node
  label: string
  pkClass?: number
  pkType?: number
}

// tslint:disable: member-ordering
class ClassAndTypeSelectMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<ClassAndTypeSelectModel> {
  static nextId = 0;

  model: ClassAndTypeSelectModel;
  // the flattened selection
  selected: TreeNode<TreeNodeData>[]

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'class-and-type-select';
  // tslint:disable-next-line: no-use-before-declare
  id = `class-and-type-select-${ClassAndTypeSelectComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    if (!this.model) return true;
    return [
      ...(this.model.classes || []),
      ...(this.model.types || [])
    ].length === 0;
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
  get value(): ClassAndTypeSelectModel | null {
    // TODO
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: ClassAndTypeSelectModel | null) {
    this.model = value;
    const classes = !this.model ? [] : !this.model ? [] : this.model.classes || [];
    const types = !this.model ? [] : !this.model ? [] : this.model.types || [];
    this.selected = [
      ...classes.map(pk => new TreeNode<TreeNodeData>({
        id: 'class_' + pk,
        label: ''
      })),
      ...types.map(pk => new TreeNode<TreeNodeData>({
        id: 'type_' + pk,
        label: ''
      }))
    ];

    this.onChange(this.model)
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
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
    // TODO: implement this

  }

  writeValue(value: ClassAndTypeSelectModel | null): void {
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
  selector: 'gv-class-and-type-select',
  templateUrl: './class-and-type-select.component.html',
  styleUrls: ['./class-and-type-select.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: ClassAndTypeSelectComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ClassAndTypeSelectComponent extends ClassAndTypeSelectMatControl implements OnInit {
  @HostBinding('class.d-flex') dflex = true;

  @Input() qtree; // TODO delete this
  @Input() level = 0; // level of component nesting, 0...n

  // The options to select
  optionsTree$ = of([]);

  @Input() pkClasses$: Observable<number[]>;
  @Input() showRemoveBtn = true;
  @Input() disabled: boolean;

  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();
  @Output() modelChanged = new EventEmitter<ClassAndTypeSelectModel>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  valid = false;


  constructor(
    private p: ActiveProjectService,
    @Optional() @Self() public ngControl: NgControl

  ) {
    super(ngControl)
  }

  ngOnInit() {

    this.optionsTree$ = this.pkClasses$.pipe(
      filter(pks => pks !== null),
      distinct((pk) => pk),
      mergeMap((pks) => {
        return pks.length ?
          combineLatest(
            // get all type previews
            this.p.streamTypePreviewsByClass(pks),
            // get class configs
            combineLatest(pks.map(pk => this.p.getClassConfig(pk)))
              .pipe(
                filter(d => d.every(x => (x && !!x.dfh_pk_class)))
              )
          )
            // add type previews to class configs
            .pipe(
              map(([a, b]) => b.map(classConfig => ({
                ...classConfig,
                types: a[classConfig.dfh_pk_class] || []
              }))
              )
            ) :
          new BehaviorSubject([])
      }),
      map(classesWithTypes => classesWithTypes.map(c => new TreeNode<TreeNodeData>(
        {
          id: 'class_' + c.dfh_pk_class,
          label: c.label,
          pkClass: c.dfh_pk_class
        },
        [
          ...c.types.map(type => new TreeNode<TreeNodeData>({
            id: 'type_' + type.pk_entity,
            label: type.entity_label,
            pkType: type.pk_entity
          }))
        ]
      ))
      ),
      tap(x => {
      })

    )

  }

  selectionChange(val: TreeNode<TreeNodeData>[]) {

    this.value = {
      classes: val.filter(v => v.data.pkClass).map(v => v.data.pkClass),
      types: val.filter(v => v.data.pkType).map(v => v.data.pkType),
    }

  }

  setValid() {
    this.valid = [
      ...(this.model.classes || []),
      ...(this.model.types || [])
    ].length > 0;
    this.validChanged.emit(this.valid)
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

