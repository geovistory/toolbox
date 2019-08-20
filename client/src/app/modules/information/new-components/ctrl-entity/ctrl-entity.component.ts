import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDialog, MatFormFieldControl } from '@angular/material';
import { SysConfig, EntityPreview, ActiveProjectService } from 'app/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { CreateEntityModalComponent } from './create-entity-modal/create-entity-modal.component';
import { takeUntil, first, filter, mergeMap, distinctUntilChanged } from '../../../../../../node_modules/rxjs/operators';

type CtrlModel = number // pkEntity


@Component({
  selector: 'gv-ctrl-entity',
  templateUrl: './ctrl-entity.component.html',
  styleUrls: ['./ctrl-entity.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlEntityComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class CtrlEntityComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlModel> {
  static nextId = 0;

  model: CtrlModel;

  @Input() pkClass: number;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-entity';
  id = `ctrl-entity-${CtrlEntityComponent.nextId++}`;
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
    this.onChange(this.model)
    this.pkEntity$.next(value)
  }

  pkEntity$ = new BehaviorSubject<number>(null)
  entityPreview$: Observable<EntityPreview>;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private dialog: MatDialog,
    private p: ActiveProjectService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.entityPreview$ = this.pkEntity$.pipe(
      filter(pk => !!pk),
      distinctUntilChanged(),
      mergeMap(pk => this.p.streamEntityPreview(pk))
    )
  }

  ngOnInit() {
    if (!this.pkClass) throw "pkClass is required";
  }

  openModal() {
    if (!this.disabled) {
      this.dialog.open(CreateEntityModalComponent, {
        minWidth: '800px',
        data: {
          classAndTypePk: {
            pkClass: this.pkClass,
            pkType: undefined
          },
          pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
        }
      }).afterClosed()
        .pipe(takeUntil(this.destroy$)).subscribe(chosenEntity => {
          if (chosenEntity) this.value = chosenEntity
        });
    }
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

}
