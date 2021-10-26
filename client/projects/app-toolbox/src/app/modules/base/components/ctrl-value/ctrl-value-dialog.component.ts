import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatementWithRelations, SysConfigValueObjectType, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { InfValueObject } from 'projects/app-toolbox/src/app/shared/components/value-preview/value-preview.component';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { FgDimensionComponent } from '../fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';


export interface CtrlValueDialogData {
  vot?: SysConfigValueObjectType,
  pkClass: number,
  initVal$?: Observable<InfValueObject>;
  pkProject: number;
}

export type CtrlValueDialogResult = Partial<InfStatementWithRelations>

export interface ClassAndTypePk { pkClass: number, pkType: number };

@Component({
  selector: 'gv-ctrl-value-dialog',
  templateUrl: './ctrl-value-dialog.component.html',
  styleUrls: ['./ctrl-value-dialog.component.scss']
})
export class CtrlValueDialogComponent implements OnDestroy, OnInit, AfterViewInit {

  destroy$ = new Subject<boolean>();

  newValue: InfStatementWithRelations | undefined;

  @ViewChild('place') place: FgPlaceComponent;
  @ViewChild('langString') langString: FgLangStringComponent;
  @ViewChild('dimension') dimension: FgDimensionComponent;
  dimension_label?: string;
  appellation = new FormControl('');
  timeprimitive = new FormControl('');
  language = new FormControl('');

  initValPlace$: Observable<InfPlace>
  initValDimension$: Observable<InfDimension>
  initValLangString$: Observable<InfLangString>

  constructor(
    public c: ConfigurationPipesService,
    private s: SchemaSelectorsService,
    public dialogRef: MatDialogRef<CtrlValueDialogComponent, CtrlValueDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlValueDialogData
  ) {
    if (data.initVal$) {

      this.initValPlace$ = data.initVal$.pipe(map(x => x.place))
      this.initValDimension$ = data.initVal$.pipe(map(x => x.dimension))
      this.initValLangString$ = data.initVal$.pipe(map(x => x.langString))
    }
  }

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
        .subscribe((v: InfPlace) => this.newValue.object_place = v)
    }

    // langstring
    if (this.data.vot.langString) {
      this.langString.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfLangString) => {
          this.newValue.object_lang_string = {
            ...v,
            fk_class: this.data.pkClass
          }
        })
    }

    // dimension
    if (this.data.vot.dimension) {
      this.dimension.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), takeUntil(this.destroy$))
        .subscribe((v: InfDimension) => this.newValue.object_dimension = v)
    }

    // appellation
    if (this.data.vot.appellation) {
      if (this.data.initVal$) this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.appellation.setValue(initVal));
      this.appellation.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: InfAppellation) => {
        this.newValue.object_appellation = {
          quill_doc: v.quill_doc,
          string: v.string,
          fk_class: this.data.pkClass
        };
      });
    }

    // timeprimitive
    if (this.data.vot.timePrimitive) {
      if (this.data.initVal$) {
        this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.timeprimitive.setValue(initVal));
      }
      this.timeprimitive.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nv: TimePrimitiveWithCal) => {
        if (nv === undefined) return;
        this.newValue.object_time_primitive = {
          julian_day: nv.julian_day,
          duration: nv.duration,
          fk_class: this.data.pkClass
        };
        this.newValue.entity_version_project_rels = [{
          fk_project: this.data.pkProject,
          calendar: nv.calendar,
          is_in_project: true
        }]
      });
    }

    // language
    if (this.data.vot.language) {
      if (this.data.initVal$) {
        this.data.initVal$.pipe(takeUntil(this.destroy$)).subscribe(initVal => this.language.setValue(initVal));
      }
      this.language.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nv: InfLanguage) => {
        if (nv) {
          this.newValue.object_language = nv;
        }
      });
    }
  }

  validate(): void {
    if (!this.newValue) {
      this.dialogRef.close();
      return;
    }



    this.dialogRef.close(this.newValue);
  }

}
