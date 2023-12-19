import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { Subject } from 'rxjs';
import { TableEditComponent } from '../../../../modules/analysis/table/table-edit/table-edit.component';
import { TimeChartContEditComponent } from '../../../../modules/analysis/time-chart-cont/time-chart-cont-edit/time-chart-cont-edit.component';
import { TabLayoutComponentInterface } from '../../../../modules/projects/directives/on-activate-tab.directive';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { GvAnalysisService } from '../../../../services/analysis.service';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { MapAndTimeContEditComponent } from '../../../analysis/layout/map-and-time-cont-edit/map-and-time-cont-edit.component';

@Component({
  selector: 'gv-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss'],
  providers: [GvAnalysisService],
  standalone: true,
  imports: [NgIf, TimeChartContEditComponent, TableEditComponent, MapAndTimeContEditComponent]
})
export class AnalysisDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  t: TabLayout;

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // path to the substore
  @Input() basePath: string[];
  @Input() pkEntity: number;
  @Input() fkAnalysisType: number;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  sysConfig = SysConfig;

  constructor(
    public ref: ChangeDetectorRef,
    public p: ActiveProjectService,
    public tabLayout: TabLayoutService,
    private a: GvAnalysisService<any, any>
  ) { }

  ngOnInit() {
    this.a.pkEntity = this.pkEntity;
    this.a.fkAnalysisType = this.fkAnalysisType;
    this.t = this.tabLayout.t
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
