import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { InfTimePrimitiveWithCalendar } from '@kleiolab/lib-utils';
import { InfValueObject } from 'projects/app-toolbox/src/app/shared/components/value-preview/value-preview.component';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';


export interface CtrlValueDialogData {
  vot: SysConfigValueObjectType | undefined,
  pkClass: number,
  initVal$: Observable<InfValueObject> | undefined;
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

  newValue: InfValueObject | undefined;

  @ViewChild('place', { static: false }) place: FgPlaceComponent;
  @ViewChild('langString', { static: false }) langString: FgLangStringComponent;
  @ViewChild('dimension', { static: false }) dimension: FgDimensionComponent;
  dimension_label?: string;
  appellation = new FormControl('');
  timeprimitive = new FormControl('');
  language = new FormControl('');

  constructor(
    public c: ConfigurationPipesService,
    private s: SchemaSelectorsService,
    public dialogRef: MatDialogRef<CtrlValueDialogComponent, CtrlValueDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlValueDialogData
  ) { }

  ngOnInit(): void {
    this.newValue = {};

    // dimension
    if (this.data.vot.dimension) {
      this.c.pipeClassLabel(this.data.vot.dimension.measurementUnitClass)
        .subscribe(label => this.dimension_label = label)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  ngAfterViewInit() {
    // place
    if (this.data.vot.place) {
      this.place.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfPlace) => this.newValue.place = v)
    }

    // langstring
    if (this.data.vot.langString) {
      this.langString.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfLangString) => this.newValue.langString = v)
    }

    // dimension
    if (this.data.vot.dimension) {
      this.dimension.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfDimension) => this.newValue.dimension = v)
    }

    // appellation
    if (this.data.vot.appellation) {
      if (this.data.initVal$) this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.appellation.setValue(initVal));
      this.appellation.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: InfAppellation) => {
        this.newValue.appellation = { ...v, fk_class: this.data.pkClass };
        delete this.newValue.appellation.pk_entity;
        delete (this.newValue as InfAppellation).string;
      });
    }

    // timeprimitive
    if (this.data.vot.timePrimitive) {
      if (this.data.initVal$) {
        this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.timeprimitive.setValue(initVal));
      }
      this.timeprimitive.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nv: InfTimePrimitiveWithCalendar) => {
        this.newValue.timePrimitive = nv;
        if (this.newValue) delete this.newValue.timePrimitive.pk_entity;
      });
    }

    // language
    if (this.data.vot.language) {
      if (this.data.initVal$) {
        this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.language.setValue(initVal));
      }
      this.language.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nv: InfLanguage) => {
        if (nv) {
          this.newValue.language = nv;
        }
      });
    }
  }

  validate(): void {
    if (!this.newValue) {
      this.dialogRef.close();
      return;
    }

    // particular if TIME PRIMITIVE
    let calendar, infProjRel: ProInfoProjRel;
    if (this.data.vot.timePrimitive) {
      calendar = this.newValue.timePrimitive.calendar;
      delete this.newValue.timePrimitive.calendar;
      infProjRel = { fk_project: this.data.pkProject, calendar, is_in_project: true } as ProInfoProjRel
      this.newValue.timePrimitive.fk_class = this.data.pkClass;
    }

    // particular if LANG STRING
    if (this.data.vot.langString) (this.newValue as InfLangString).fk_class = this.data.pkClass;

    this.dialogRef.close({
      object_place: this.data.vot.place ? this.newValue.place : undefined,
      object_lang_string: this.data.vot.langString ? this.newValue.langString : undefined,
      object_dimension: this.data.vot.dimension ? this.newValue.dimension : undefined,
      object_appellation: this.data.vot.appellation ? this.newValue.appellation : undefined,
      object_language: this.data.vot.language ? this.newValue.language : undefined,
      entity_version_project_rels: this.data.vot.timePrimitive ? [infProjRel] : undefined,
      object_time_primitive: this.data.vot.timePrimitive ? this.newValue.timePrimitive : undefined,
    });
  }

}
