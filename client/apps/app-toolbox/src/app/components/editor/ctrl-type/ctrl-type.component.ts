import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActiveProjectPipesService, InformationBasicPipesService } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty, sortAbc } from '@kleiolab/lib-utils';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

type CtrlModel = number // pk_entity of type (persistent item)
interface Option {
  pkType: number;
  label: string
}
@Component({
    selector: 'gv-ctrl-type',
    templateUrl: './ctrl-type.component.html',
    styleUrls: ['./ctrl-type.component.css'],
    providers: [{ provide: MatFormFieldControl, useExisting: CtrlTypeComponent }],
    standalone: true,
    imports: [
        MatSelectModule,
        MatDividerModule,
        NgFor,
        MatOptionModule,
        NgIf,
        AsyncPipe,
    ],
})
export class CtrlTypeComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlModel> {
  static nextId = 0;

  model: CtrlModel;
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @ViewChild('search') searchElement: ElementRef;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Input() pkTypeClass: number;
  @Input() pkTypedClass: number;
  @Input() autoopen: boolean;

  @Input() showPrimaryAction: boolean;
  @Input() primaryActionText: string;



  @Output() primaryAction = new EventEmitter()

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
  typeOptions$: Observable<Option[]>
  filter$ = new BehaviorSubject<string>('')

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    public ap: ActiveProjectPipesService,
    private b: InformationBasicPipesService,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }


  }

  ngOnInit() {
    if (!this.pkTypeClass) throw new Error('You must provide a this.pkTypeClass');
    if (!this.pkTypedClass) throw new Error('You must provide a this.pkTypedClass');

    this.typeLabel$ = this.value$.pipe(
      switchMap(pkType => this.ap.streamEntityPreview(pkType).pipe(
        map(preview => preview.entity_label)
      ))
    )
    const allOptions$ = this.b.pipePersistentItemPksByClass(this.pkTypeClass).pipe(
      switchMap(typePks => combineLatestOrEmpty(
        typePks.map(pkType => this.ap.streamEntityPreview(pkType).pipe(
          map<WarEntityPreview, Option>(preview => ({
            label: preview.entity_label,
            pkType: pkType
          }))
        ))
      ).pipe(
        sortAbc(node => node.label),
        map<Option[], Option[]>(options => [{ label: '--- No Type ---', pkType: -1 }, ...options]),
      )),
    )

    this.typeOptions$ = combineLatest([allOptions$, this.filter$]).pipe(
      map(([allOptions, filter]) => {
        if (filter.length === 0) return allOptions
        return allOptions.filter(option => option.label.toLowerCase().includes(filter.toLowerCase()))
      }),
    )

  }
  onFilter(e: KeyboardEvent) {
    this.filter$.next((<HTMLInputElement>e.target).value)
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


  onContainerClick() {
    this.matSelect.open()
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
    if (opened) {
      this.searchElement.nativeElement.focus();
      this.onFocus()
    }
    else {
      this.filter$.next('')
      this.onBlur()
    }
  }

  clearForm() {
    this.value = undefined;
  }
}
