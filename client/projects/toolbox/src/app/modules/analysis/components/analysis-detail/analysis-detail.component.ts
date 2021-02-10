import { Component, OnInit, HostBinding, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { TabLayoutComponentInterface } from 'projects/toolbox/src/app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'projects/toolbox/src/app/shared/components/tab-layout/tab-layout';
import { Subject, Observable } from 'rxjs';
import { SysConfig } from 'projects/toolbox/src/app/core';
import { ActiveProjectService } from "projects/toolbox/src/app/core/active-project";
import { TabLayoutService } from 'projects/toolbox/src/app/shared/components/tab-layout/tab-layout.service';
import { GvAnalysisService } from '../../services/analysis.service';

@Component({
  selector: 'gv-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss'],
  providers: [TabLayoutService, GvAnalysisService]

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
    private ts: TabLayoutService,
    private a: GvAnalysisService<any, any>
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
