import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { GregorianDateTime, InfTimePrimitiveWithCalendar, JulianDateTime } from '@kleiolab/lib-utils';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export interface InfValueObject {
  appellation?: InfAppellation;
  place?: InfPlace;
  dimension?: InfDimension;
  langString?: InfLangString;
  timePrimitive?: InfTimePrimitiveWithCalendar;
  language?: InfLanguage;
}

@Component({
  selector: 'gv-value-preview',
  templateUrl: './value-preview.component.html',
  styleUrls: ['./value-preview.component.scss']
})
export class ValuePreviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() vot: SysConfigValueObjectType;
  @Input() value: InfValueObject;
  @Input() pkProject: number;

  dimension_unit?: string;
  pkLanguage: string;

  constructor(
    private ap: ActiveProjectPipesService,
    private s: SchemaSelectorsService,
  ) { }

  ngOnInit() {
    if (this.vot.dimension) {
      this.ap.streamEntityPreview((this.value.dimension).fk_measurement_unit).pipe(
        map(ep => ep.entity_label),
        takeUntil(this.destroy$)
      ).subscribe(unitLabel => this.dimension_unit = unitLabel);
    };

    if (this.vot.langString) {
      this.s.inf$.language$.by_pk_entity$.key((this.value.langString).fk_language)
        .subscribe(language => this.pkLanguage = language ? language.pk_language : '');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getLangString(langString: InfLangString): string {
    return langString.string + ' [' + (this.pkLanguage ? this.pkLanguage.toUpperCase() : '??') + ']';
  }

  stringifyJulianDate(timePrim: InfTimePrimitiveWithCalendar): string {
    let date;
    if (timePrim.calendar == 'julian') date = new JulianDateTime().fromJulianDay(timePrim.julian_day);
    else date = new GregorianDateTime().fromJulianDay(timePrim.julian_day)
    let result = date.day + '';
    result += date.day === 1 ? 'st ' : date.day === 2 ? 'nd ' : date.day === 3 ? 'rd ' : 'th ';
    result += ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    [date.month - 1] + ' ';
    const hours = date.hours ? '00' + date.hours : '00';
    const minutes = date.minutes ? '00' + date.minutes : '00';
    const seconds = date.seconds ? '00' + date.seconds : '00';
    result += date.year;
    result += (date.hours || date.minutes || date.seconds ? ' at ' + hours.slice(-2) + 'h' + minutes.slice(-2) + ':' + seconds.slice(-2) + '\'' : '');
    return result;
  }
}

