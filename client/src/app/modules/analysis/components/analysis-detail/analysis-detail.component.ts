import { Component, OnInit, HostBinding, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { Subject, Observable } from 'rxjs';
import { ActiveProjectService, SysAnalysisType, SysConfig } from 'app/core';
import { takeUntil, filter } from 'rxjs/operators';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { AnalysisService } from '../../services/analysis.service';

@Component({
  selector: 'gv-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss'],
  providers: [TabLayoutService]
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
    private ts: TabLayoutService
  ) { }

  ngOnInit() {
    this.t = this.ts.create(this.basePath[2], this.ref, this.destroy$);
    if (this.fkAnalysisType) {
      this.analysisType$ = this.p.sys$.analysis_type$.by_pk_entity$.key(this.fkAnalysisType);
      if (!this.pkEntity) {
        this.analysisType$.pipe(filter(x => !!x), takeUntil(this.destroy$)).subscribe(d => {
          this.t.setTabTitle('New ' + d.standard_label)
        })
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
