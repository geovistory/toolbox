import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { Subject, Observable, BehaviorSubject, combineLatest, iif } from 'rxjs';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { switchMap, map, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ClassAndTypeNode } from '../classes-and-types-select/classes-and-types-select.component';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { switchMapOr, sortAbc } from '../../../../core';

type CtrlModel = number // pk_entity of type (persistent item)

@Component({
  selector: 'gv-ctrl-type',
  templateUrl: './ctrl-type.component.html',
  styleUrls: ['./ctrl-type.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlTypeComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class CtrlTypeComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlModel> {
  static nextId = 0;

  model: CtrlModel;
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Input() pkTypeClass: number;
  @Input() pkTypedClass: number;
  @Input() autoopen: boolean;

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-type';
  id = `ctrl-type-${CtrlTypeComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model === undefined;
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
  get value(): CtrlModel | null {
    return this.model;
  }
  set value(value: CtrlModel | null) {
    this.model = value;
    this.onChange(this.model === -1 ? undefined : this.model)
    this.value$.next(value)
  }

  value$ = new BehaviorSubject(null)
  typeLabel$: Observable<string>
  typeOptions$: Observable<ClassAndTypeNode[]>

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private i: InformationPipesService,
    private c: ConfigurationPipesService,
    private b: InformationBasicPipesService,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }


  }

  ngOnInit() {
    if (!this.pkTypeClass) throw 'You must provide a this.pkTypeClass';
    if (!this.pkTypedClass) throw 'You must provide a this.pkTypedClass';

    this.typeLabel$ = this.value$.pipe(
      switchMap(pkEntity => this.i.pipeLabelOfEntity(pkEntity))
    )
    this.typeOptions$ = this.b.pipePersistentItemPksByClass(this.pkTypeClass).pipe(
      switchMapOr([], typePks => combineLatest(
        typePks.map(pkType => this.i.pipeLabelOfEntity(pkType).pipe(
          map(label => ({
            label, data: { pkClass: this.pkTypedClass, pkType }
          } as ClassAndTypeNode))
        ))
      ).pipe(
        sortAbc(node => node.label),
        map(options => [{ label: '--- No Type ---', data: { pkType: -1, pkClass: null } }, ...options]),
      )),
    )

  }
  // TODO: Adapt way of changing the value
  onSelect(e: MatSelectChange) {
    this.value = e.value;
  }
  ngAfterViewInit() {
    if (this.autoopen) setTimeout(() => { this.matSelect.open() })
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
    // TODO: implement this

  }

  writeValue(value: CtrlModel | null): void {
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
    this.blur.emit()
    this.focused = false;
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }

  menuToggled(opened: boolean) {
    if (opened) this.onFocus()
    else this.onBlur()
  }

  clearForm() {
    this.value = undefined;
  }
}
