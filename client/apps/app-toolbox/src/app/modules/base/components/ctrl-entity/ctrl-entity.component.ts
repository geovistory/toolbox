import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ActiveProjectPipesService, ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldProperty, InfData, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DisableIfHasStatement } from '../search-existing-entity/search-existing-entity.component';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from './ctrl-entity-dialog/ctrl-entity-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { EntityPreviewModule } from '../../../../shared/components/entity-preview/entity-preview.module';
import { NgIf, AsyncPipe } from '@angular/common';

export interface CtrlEntityModel extends InfData {
  pkEntity?: number, // if pkEntity, an entity has been selected on the right side
}

@Component({
    selector: 'gv-ctrl-entity',
    templateUrl: './ctrl-entity.component.html',
    styleUrls: ['./ctrl-entity.component.css'],
    providers: [{
            provide: MatFormFieldControl, useExisting: CtrlEntityComponent
        }],
    standalone: true,
    imports: [
        NgIf,
        EntityPreviewModule,
        MatInputModule,
        AsyncPipe,
    ],
})
export class CtrlEntityComponent implements OnDestroy,
  ControlValueAccessor,
  MatFormFieldControl<CtrlEntityModel> {
  static nextId = 0;

  model: CtrlEntityModel;

  @Input() pkClass: number;

  // needed for creating the form, in order to exclude the circular field
  @Input() property: GvFieldProperty;
  @Input() disableExistingWithStatement: DisableIfHasStatement;

  @Input() showAddList: boolean;



  @Output() blur = new EventEmitter<number | undefined>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-entity';

  id = `ctrl-entity-$ {
    CtrlEntityComponent.nextId++
  }

  `;
  describedBy = '';

  private _placeholder: string;

  private _required = false;

  private _disabled = false;

  value$ = new BehaviorSubject<CtrlEntityModel>(null);

  entityPreview$: Observable<WarEntityPreview>;

  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input() get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input() get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  @Input() get value(): CtrlEntityModel | null {
    return this.model;
  }

  set value(value: CtrlEntityModel | null) {

    if (!value || (!value.pkEntity && !value.resource)) {
      this.model = undefined
    } else {
      this.model = value;
    }

    this.onChange(this.model);
    this.value$.next(value);
  }

  onChange = (_: any) => { }

    ;

  onTouched = () => { }

    ;

  constructor(@Optional() @Self() public ngControl: NgControl,
    private dialog: MatDialog,
    public ap: ActiveProjectPipesService,
    private state: StateFacade,
    private c: ConfigurationPipesService) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

  }

  ngOnInit() {
    if (!this.pkClass) throw new Error('pkClass is required');

    this.c.pipeClassLabel(this.pkClass)

    this.entityPreview$ = this.value$.pipe(switchMap(val => {

      if (val && (val.pkEntity || val.resource.pk_entity)) {
        return this.ap.streamEntityPreview(val.pkEntity ?? val.resource.pk_entity)
      }
      else if (val && (val.resource)) {
        return combineLatest(
          this.state.data.dfh.klass.select.byPkClass(this.pkClass),
          this.c.pipeClassLabel(this.pkClass)
        ).pipe(
          map(([klass, label]) => {
            let type;
            if (klass.basic_type === 8 || klass.basic_type === 30) {
              type = 'peIt'
            }
            else {
              type = 'teEn'
            }
            const e: WarEntityPreview = {
              entity_label: 'New item (click for details)',
              fk_class: this.pkClass,
              class_label: label,
              entity_type: type,
              pk_entity: undefined,
              project_id: undefined,
            }
            return e
          })
        )
      }

      return of(null);
    }))

  }

  openModal() {
    if (!this.disabled) {

      this.dialog.open<CtrlEntityDialogComponent,
        CtrlEntityDialogData,
        CtrlEntityModel>(CtrlEntityDialogComponent, {

          // minWidth: '800px',
          height: 'calc(100% - 30px)',
          width: this.showAddList ? '980px' : '500px',
          maxWidth: '100%',
          panelClass: 'gv-no-padding',
          data: {
            pkClass: this.pkClass,
            hiddenProperty: this.property,
            initVal$: this.value$,
            showAddList: this.showAddList,
            disableIfHasStatement: this.disableExistingWithStatement,
            defaultSearch: '',
          }
        }

        ).afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          if (!!result) this.value = result
          this.onBlur()
        }

        );
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


  onContainerClick() {
    this.openModal()
    this.onFocus()
  }

  writeValue(value: CtrlEntityModel | null): void {
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
    this.blur.emit(this.value ? this.value.pkEntity ? this.value.pkEntity : undefined : undefined);
    this.focused = false;
  }

  onFocus() {
    this.focus.emit();
    this.focused = true;
  }

}
