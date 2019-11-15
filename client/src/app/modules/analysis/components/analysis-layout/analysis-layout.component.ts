import { Component, HostBinding, OnInit } from '@angular/core';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { AnalysisService } from '../../services/analysis.service';

@Component({
  selector: 'gv-analysis-layout',
  templateUrl: './analysis-layout.component.html',
  styleUrls: ['./analysis-layout.component.scss']
})
export class AnalysisLayoutComponent implements OnInit {

  @HostBinding('class.gv-flex-fh') flexFh = true;

  t: TabLayout;

  constructor(
    ts: TabLayoutService,
    public a: AnalysisService<any, any>
  ) {
    this.t = ts.t;
    this.t.defaultSizeRight = 50;
    this.t.setShowRightArea(true);
  }

  ngOnInit() {
  }

  run() {
    if (!this.t.showRightArea) {
      this.t.setShowRightArea(true);
    }
    this.a.runAnalysis()
  }

}
