import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InfPlace, InfAppellation, InfDimension, InfLangString, InfTimePrimitive, ActiveProjectService, JulianDateTime } from 'app/core';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ValueObjectTypeName } from '../digital-table/components/table/table.component';

@Component({
  selector: 'gv-value-preview',
  templateUrl: './value-preview.component.html',
  styleUrls: ['./value-preview.component.scss']
})
export class ValuePreviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() vot: { type: ValueObjectTypeName, dimensionClass?: number };
  @Input() value: InfAppellation | InfPlace | InfDimension | InfLangString | InfTimePrimitive;

  dimension_unit?: string;
  pkLanguage: string;

  constructor(
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
    if (this.vot.type == ValueObjectTypeName.dimension) {
      this.p.streamEntityPreview((this.value as InfDimension).fk_measurement_unit).pipe(
        map(ep => ep.entity_label),
        takeUntil(this.destroy$)
      ).subscribe(unitLabel => this.dimension_unit = unitLabel);
    };

    if (this.vot.type == ValueObjectTypeName.langString) {
      this.p.inf$.language$.by_pk_entity$.key((this.value as InfLangString).fk_language).subscribe(language => this.pkLanguage = language ? language.pk_language : '');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getLangString(langString: InfLangString): string {
    return langString.string + ' [' + (this.pkLanguage ? this.pkLanguage.toUpperCase() : '??') + ']';
  }

  stringifyJulianDate(value: InfTimePrimitive): string {
    const date = new JulianDateTime().fromJulianDay(value.julian_day);
    let result = date.day + '';
    result += date.day === 1 ? 'st ' : date.day === 2 ? 'nd ' : date.day === 3 ? 'rd ' : 'th ';
    result += ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.month - 1] + ' ';
    const hours = date.hours ? '00' + date.hours : '00';
    const minutes = date.minutes ? '00' + date.minutes : '00';
    const seconds = date.seconds ? '00' + date.seconds : '00';
    result += date.year + (date.hours || date.minutes || date.seconds ? ' at ' + hours.slice(-2) + 'h' + minutes.slice(-2) + ':' + seconds.slice(-2) + '\'' : '');
    return result;
  }
}

