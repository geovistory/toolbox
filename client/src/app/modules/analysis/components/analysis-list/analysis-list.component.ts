import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProAnalysis, ActiveProjectService } from 'app/core';

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
    this.p.addTab({
      active: true,
      component: 'analysis-detail',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: { pkEntity }
    })
  }

  open(pkEntity?: number) {

    this.p.addTab({
      active: true,
      component: 'query-detail',
      icon: 'query',
      pathSegment: 'queryDetails',
      data: { pkEntity }
    })
  }
}
