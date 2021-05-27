import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SysConfig } from "@kleiolab/lib-config";
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { AnalysisTimeChartResponse } from "@kleiolab/lib-sdk-lb4";
import { AnalysisTimeChartRequest } from "@kleiolab/lib-sdk-lb4";
import { AnalysisDefinition } from "@kleiolab/lib-sdk-lb4";
import { ConfigurationPipesService } from "@kleiolab/lib-queries";
import { CursorInfo } from 'projects/app-toolbox/src/app/modules/timeline/components/timeline-chart/timeline-chart.component';
import { EntityPreviewsPaginatedDialogService } from 'projects/app-toolbox/src/app/shared/components/entity-previews-paginated/service/entity-previews-paginated-dialog.service';
import { TabLayoutService } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout.service';
import { values } from 'ramda';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { GvAnalysisService } from '../../services/analysis.service';
import { TimeChartContFormComponent } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-edit',
  templateUrl: './time-chart-cont-edit.component.html',
  styleUrls: ['./time-chart-cont-edit.component.scss'],
})
export class TimeChartContEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();
  teEnClasses$ = new BehaviorSubject<number[]>([])
  // initVal$ = new Subject<FilterDefinition>()
  queryFilter = new FormControl()
  @ViewChild('c') formComponent: TimeChartContFormComponent
  // filter$ = new BehaviorSubject<FilterDefinition>(null);

  visualData$ = new BehaviorSubject<AnalysisTimeChartResponse>({
    activeLine: 0,
    chartLines: [
      {
        label: '',
        linePoints: []
      }
    ]
  })

  initVal$: Observable<AnalysisDefinition>


  constructor(
    private c: ConfigurationPipesService,
    public a: GvAnalysisService<AnalysisTimeChartRequest, AnalysisTimeChartResponse>,
    private ts: TabLayoutService,
    p: ActiveProjectService,
    private pagEntDialog: EntityPreviewsPaginatedDialogService

  ) {
    if (this.a.pkEntity) {
      this.initVal$ = p.pro$.analysis$.by_pk_entity$.key(this.a.pkEntity.toString()).pipe(
        map(i => i.analysis_definition),
        map((def) => def)
      )
    }
    this.a.registerRunAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const analysisDefinition = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callRunApi((fkProject => this.a.analysisApi.analysisControllerTimeChartRun({
          fkProject,
          lines: analysisDefinition.lines || []
        })))
        this.ts.t.setLayoutMode('both');
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    }, SysConfig.PK_ANALYSIS_TYPE__TIME_CONT)

    this.a.registerCreateAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        return this.a.callCreateApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        return of()
      }
    })

    this.a.registerSaveAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callSaveApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    })

    this.a.registerCopyAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        return this.a.callCopyApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        return of()
      }
    })

    this.a.registerRenameAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callRenameApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        of()
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

  onShowDetailsClick($event: CursorInfo) {

    this.pagEntDialog.open(
      true,
      $event.linePoint.data,
      `${$event.linePoint.data.length} Entities available at ${$event.cursorDateLabel}`,
      // [
      //   `Selected date: ${$event.cursorDateLabel}`
      // ]
    )
  }
  onShowAllItemsClick($event: number[]) {
    this.pagEntDialog.open(true, $event, `${$event.length} Entities`)
  }
}
