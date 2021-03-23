import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { InfAppellation, InfDimension, InfLangString, InfPlace, InfStatement, InfTimePrimitive, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { InfTimePrimitiveWithCalendar } from '@kleiolab/lib-utils';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ValueObjectTypeName } from '../../../../shared/components/digital-table/components/table/table.component';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';


export interface CtrlValueDialogData {
  vot: { type: ValueObjectTypeName, dimensionClass?: number },
  initVal$: Observable<InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitiveWithCalendar> | undefined;
  pkProject: number;
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
    private s: SchemaSelectorsService,
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
      if (this.data.initVal$) this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.appellation.setValue(initVal));
      this.appellation.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: InfAppellation) => {
        this.newValue = { ...v, fk_class: 40 };
        delete this.newValue.pk_entity;
        delete this.newValue.string;
      });
    }

    // timeprimitive
    if (this.data.vot.type === ValueObjectTypeName.timePrimitive) {
      if (this.data.initVal$) {
        this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.timeprimitive.setValue(initVal));
      }
      this.timeprimitive.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nv: InfTimePrimitiveWithCalendar) => {
        this.newValue = nv;
        delete this.newValue.pk_entity;
      });
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
    let calendar, infProjRel: ProInfoProjRel;
    if (this.data.vot.type === ValueObjectTypeName.timePrimitive) {
      calendar = (this.newValue as InfTimePrimitiveWithCalendar).calendar;
      delete (this.newValue as InfTimePrimitiveWithCalendar).calendar;
      infProjRel = { fk_project: this.data.pkProject, calendar, is_in_project: true } as ProInfoProjRel
      (this.newValue as InfTimePrimitive).fk_class = 335;
    }

    this.dialogRef.close({
      object_place: this.data.vot.type === ValueObjectTypeName.place ? this.newValue as InfPlace : undefined,
      object_lang_string: this.data.vot.type === ValueObjectTypeName.langString ? this.newValue as InfLangString : undefined,
      object_dimension: this.data.vot.type === ValueObjectTypeName.dimension ? this.newValue as InfDimension : undefined,
      object_appellation: this.data.vot.type === ValueObjectTypeName.appellation ? this.newValue as InfAppellation : undefined,
      entity_version_project_rels: this.data.vot.type === ValueObjectTypeName.timePrimitive ?
        [infProjRel] : undefined,
      object_time_primitive: this.data.vot.type === ValueObjectTypeName.timePrimitive ?
        this.newValue as InfTimePrimitive : undefined,
    });
  }

}
