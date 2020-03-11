import { Component, HostBinding, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { AnalysisService } from '../../services/analysis.service';
import { takeUntil, switchMap, first, tap, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActiveProjectService, IAppState } from 'app/core';
import { MatDialog } from '@angular/material/dialog';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'gv-analysis-layout',
  templateUrl: './analysis-layout.component.html',
  styleUrls: ['./analysis-layout.component.scss']
})
export class AnalysisLayoutComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @HostBinding('class.gv-flex-fh') flexFh = true;

  t: TabLayout;

  private pkAnalysis$ = new Subject<number>();
  private _pkAnalysis: number;
  set pkAnalysis(pk: number) {
    this._pkAnalysis = pk;
    this.pkAnalysis$.next(pk)
  }
  get pkAnalysis() {
    return this._pkAnalysis;
  }

  deleted: boolean;

  constructor(
    ts: TabLayoutService,
    p: ActiveProjectService,
    public a: AnalysisService<any, any>
  ) {
    this.t = ts.t;
    this.t.defaultSizeRight = 50;
    this.t.setShowRightArea(true);

    this.pkAnalysis$.pipe(
      tap((pk) => {
        if (!pk) this.t.setTabTitle('New Analysis *')
      }),
      filter(pk => !!pk),
      switchMap(pkAnalysis => p.pro$.analysis$.by_pk_entity$.key(pkAnalysis.toString())),
      takeUntil(this.destroy$)
    ).subscribe(proAnalysis => {
      if (proAnalysis === undefined) {
        this.deleted = true;
      } else {

        this.t.setTabTitle(proAnalysis.name)
      }
    })

    this.pkAnalysis = this.a.pkEntity

  }

  ngOnInit() {
  }

  run() {
    if (!this.t.showRightArea) {
      this.t.setShowRightArea(true);
    }
    this.a.runAnalysis()
  }

  create() {
    this.a.createAnalysis().pipe(
      first(),
      takeUntil(this.destroy$)
    ).subscribe(pkAnalysis => {
      this.pkAnalysis = pkAnalysis;
    })
  }

  save() {
    this.a.saveAnalysis()
  }

  copy() {
    this.a.copyAnalysis()
  }

  rename() {
    this.a.renameAnalysis()
  }

  delete() {
    this.a.deleteAnalysis()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
