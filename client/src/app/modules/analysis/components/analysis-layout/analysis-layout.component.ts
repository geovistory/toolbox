import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService } from "app/core/active-project";
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GvAnalysisService } from '../../services/analysis.service';

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
    public a: GvAnalysisService<any, any>
  ) {
    this.t = ts.t;
    this.t.defaultSizeRight = 50;
    this.t.setLayoutMode('both');

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
