import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SysConfig } from 'app/core';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { values } from 'ramda';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChartLineData, TimeChartContInput, TimeChartContOutput } from '../../../../../../../src/common/interfaces';
import { AnalysisService } from '../../services/analysis.service';
import { TimeChartContFormComponent } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-edit',
  templateUrl: './time-chart-cont-edit.component.html',
  styleUrls: ['./time-chart-cont-edit.component.scss'],
  providers: [AnalysisService]
})
export class TimeChartContEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();
  teEnClasses$ = new BehaviorSubject<number[]>([])
  // initVal$ = new Subject<FilterDefinition>()
  queryFilter = new FormControl()
  @ViewChild('c', { static: false }) formComponent: TimeChartContFormComponent
  // filter$ = new BehaviorSubject<FilterDefinition>(null);

  visualData$ = new BehaviorSubject<ChartLineData>({
    activeLine: 0,
    chartLines: [
      {
        label: '',
        linePoints: []
      }
    ]
  })

  constructor(
    private c: ConfigurationPipesService,
    public a: AnalysisService<TimeChartContInput, TimeChartContOutput>,
    private ts: TabLayoutService
  ) {

    this.ts.t.setTabTitle('New Analysis *')

    this.a.registerRunAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callApi(q)
        this.ts.t.setShowRightArea(true);
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    }, SysConfig.PK_ANALYSIS_TYPE__TIME_CONT)
  }

  ngOnInit() {
    this.c.pipeSelectedTeEnClassesInProject().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.teEnClasses$.next(values(x))
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
