import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProAnalysis, ActiveProjectService, AnalysisTabData, SysConfig } from 'app/core';
import { map, first, takeUntil } from 'rxjs/operators';
import { values } from 'd3';

@Component({
  selector: 'gv-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  items$: Observable<ProAnalysis[]>;
  loading$
  constructor(public p: ActiveProjectService) { }

  ngOnInit() {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.p.pro$.analysis.loadByIdAndVersion(pkProject, null, null)
      this.items$ = this.p.pro$.analysis$.by_pk_entity$.all$.pipe(
        map(all => values(all).filter(analysis => analysis.fk_project === pkProject))
      )
    })
  }

  newTimelineContinuous() {
    this.p.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis-detail',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__TIME_CONT
      }
    })
  }


  newTable() {
    this.p.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis-detail',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__TABLE
      }
    })
  }
  newMapAndTimeCont() {
    this.p.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis-detail',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT
      }
    })
  }

  open(item: ProAnalysis) {
    this.p.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis-detail',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        pkEntity: item.pk_entity,
        fkAnalysisType: item.fk_analysis_type
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
