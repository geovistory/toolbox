import { Component, OnDestroy, OnInit, ViewChild, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { values } from 'ramda';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeChartContInput } from '../../../../../../../src/analysis/time-chart-cont/input/time-chart-cont-input.interface';
import { ChartLineData, TimeChartContOutput } from '../../../../../../../src/analysis/time-chart-cont/output/time-chart-cont-output.interface';
import { AnalysisService } from '../../services/analysis.service';
import { TimeChartContFormComponent } from '../time-chart-cont-form/time-chart-cont-form.component';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';

@Component({
  selector: 'gv-analysis-builder-time-cont',
  templateUrl: './analysis-builder-time-cont.component.html',
  styleUrls: ['./analysis-builder-time-cont.component.scss'],
  providers: [AnalysisService]
})
export class AnalysisBuilderTimeContComponent implements OnInit, OnDestroy {
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
    })
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
