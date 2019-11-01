import { Component, OnInit, HostBinding, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { Subject } from 'rxjs';
import { ActiveProjectService } from 'app/core';

@Component({
  selector: 'gv-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  t: TabLayout;

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // path to the substore
  @Input() basePath: string[];
  @Input() pkEntity: number;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  constructor(
    public ref: ChangeDetectorRef,
    public p: ActiveProjectService,
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
