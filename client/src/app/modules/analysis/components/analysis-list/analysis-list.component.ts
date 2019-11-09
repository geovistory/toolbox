import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProAnalysis, ActiveProjectService, AnalysisTabData, SysConfig } from 'app/core';

@Component({
  selector: 'gv-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit {

  items$: Observable<ProAnalysis[]>;

  constructor(public p: ActiveProjectService) { }

  ngOnInit() {
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

  open(pkEntity?: number) {


  }
}
