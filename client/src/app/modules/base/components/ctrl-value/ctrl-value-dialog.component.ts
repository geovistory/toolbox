import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfAppellation, InfDimension, InfLangString, InfPlace, InfStatement, InfTimePrimitive } from 'app/core';
import { ValueObjectTypeName } from 'app/shared/components/digital-table/components/table/table.component';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';
import { InfTimePrimitiveWithCalendar } from '../ctrl-time-primitive/ctrl-time-primitive.component';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';


export interface CtrlValueDialogData {
  vot: { type: ValueObjectTypeName, dimensionClass?: number },
  initVal$: Observable<InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitive> | undefined;
}

export type CtrlValueDialogResult = Partial<InfStatement>

export interface ClassAndTypePk { pkClass: number, pkType: number };

@Component({
  selector: 'gv-ctrl-value-dialog',
  templateUrl: './ctrl-value-dialog.component.html',
  styleUrls: ['./ctrl-value-dialog.component.scss']
})
export class CtrlValueDialogComponent implements OnDestroy, OnInit, AfterViewInit {

  destroy$ = new Subject<boolean>();

  newValue: InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitiveWithCalendar | undefined;

  @ViewChild('place', { static: false }) place: FgPlaceComponent;
  @ViewChild('langString', { static: false }) langString: FgLangStringComponent;
  @ViewChild('dimension', { static: false }) dimension: FgDimensionComponent;
  dimension_label?: string;
  appellation = new FormControl('');
  timeprimitive = new FormControl('');

  constructor(
    public c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<CtrlValueDialogComponent, CtrlValueDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlValueDialogData
  ) { }

  ngOnInit(): void {
    // dimension
    if (this.data.vot.type == ValueObjectTypeName.dimension) {
      this.c.pipeClassLabel(this.data.vot.dimensionClass)
        .subscribe(label => this.dimension_label = label)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  ngAfterViewInit() {
    // place
    if (this.data.vot.type === ValueObjectTypeName.place) {
      this.place.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfPlace) => this.newValue = v)
    }

    // langstring
    if (this.data.vot.type === ValueObjectTypeName.langString) {
      this.langString.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfLangString) => this.newValue = v)
    }

    // dimension
    if (this.data.vot.type === ValueObjectTypeName.dimension) {
      this.dimension.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfDimension) => this.newValue = v)
    }

    // appellation
    if (this.data.vot.type === ValueObjectTypeName.appellation) {
      if (this.data.initVal$) this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.appellation = new FormControl(initVal));
      this.appellation.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: InfAppellation) => { this.newValue = { ...v, fk_class: 40 }; delete this.newValue.pk_entity; });
    }

    // timeprimitive
    if (this.data.vot.type === ValueObjectTypeName.timePrimitive) {
      if (this.data.initVal$) this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.timeprimitive = new FormControl(initVal));
      this.timeprimitive.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nv: InfTimePrimitiveWithCalendar) => { this.newValue = nv });
    }
  }

  getTitle(): string {
    if (this.data.vot.type === ValueObjectTypeName.place) return 'Place'
    if (this.data.vot.type === ValueObjectTypeName.langString) return 'String'
    if (this.data.vot.type === ValueObjectTypeName.dimension) return this.dimension_label
    if (this.data.vot.type === ValueObjectTypeName.appellation) return 'Appellation'
    if (this.data.vot.type === ValueObjectTypeName.timePrimitive) return 'Date'
  }

  validate(): void {
    this.dialogRef.close({
      object_place: this.data.vot.type === ValueObjectTypeName.place ? this.newValue as InfPlace : undefined,
      object_lang_string: this.data.vot.type === ValueObjectTypeName.langString ? this.newValue as InfLangString : undefined,
      object_dimension: this.data.vot.type === ValueObjectTypeName.dimension ? this.newValue as InfDimension : undefined,
      object_appellation: this.data.vot.type === ValueObjectTypeName.appellation ? this.newValue as InfAppellation : undefined,
      object_time_primitive: this.data.vot.type === ValueObjectTypeName.timePrimitive ? this.newValue as InfTimePrimitiveWithCalendar : undefined,
    });
  }

}
