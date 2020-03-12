import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, SysAnalysisType, SysConfig } from 'app/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { Observable, Subject } from 'rxjs';
import { AnalysisService } from '../../services/analysis.service';

@Component({
  selector: 'gv-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss'],
  providers: [TabLayoutService, AnalysisService]

})
export class AnalysisDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  t: TabLayout;

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // path to the substore
  @Input() basePath: string[];
  @Input() pkEntity: number;
  @Input() fkAnalysisType: number;

  analysisType$: Observable<SysAnalysisType>

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  sysConfig = SysConfig;

  constructor(
    public ref: ChangeDetectorRef,
    public p: ActiveProjectService,
    private ts: TabLayoutService,
    private a: AnalysisService<any, any>
  ) { }

  ngOnInit() {
    this.a.pkEntity = this.pkEntity;
    this.a.fkAnalysisType = this.fkAnalysisType;
    this.t = this.ts.create(this.basePath[2], this.ref, this.destroy$);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
