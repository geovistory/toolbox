import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { Subject } from 'rxjs';
import { TabLayoutComponentInterface } from '../../../../directives/on-activate-tab.directive';
import { TabLayout } from '../../../../lib/classes/tab-layout';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { GvAnalysisService } from '../../../../services/analysis.service';
import { TabLayoutService } from '../../../../services/tab-layout.service';
import { AnalysisLayoutMapWithTimeComponent } from '../../../analysis/layouts/analysis-layout-map-with-time/analysis-layout-map-with-time.component';
import { AnalysisLayoutTableComponent } from '../../../analysis/layouts/analysis-layout-table/analysis-layout-table.component';
import { AnalysisLayoutTimeComponent } from '../../../analysis/layouts/analysis-layout-time/analysis-layout-time.component';

@Component({
  selector: 'gv-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss'],
  providers: [GvAnalysisService],
  standalone: true,
  imports: [NgIf, AnalysisLayoutTimeComponent, AnalysisLayoutTableComponent, AnalysisLayoutMapWithTimeComponent]
})
export class AnalysisDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  t: TabLayout;

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // path to the substore
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
