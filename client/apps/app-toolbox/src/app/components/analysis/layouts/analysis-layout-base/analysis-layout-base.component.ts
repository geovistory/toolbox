import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StateFacade } from '@kleiolab/lib-redux';
import { AngularSplitModule } from 'angular-split';
import { Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GvAnalysisService } from '../../../../services/analysis.service';
import { DetailTopBarComponent } from '../../../layout/tab-layout/detail-top-bar/detail-top-bar.component';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { DetailContentComponent } from '../../../layout/tab-layout/detail-content/detail-content.component';

@Component({
  selector: 'gv-analysis-layout-base',
  templateUrl: './analysis-layout-base.component.html',
  styleUrls: ['./analysis-layout-base.component.scss'],
  standalone: true,
  imports: [NgIf, AngularSplitModule, NgClass, DetailTopBarComponent, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, DetailContentComponent, AsyncPipe]
})
export class AnalysisLayoutBaseComponent implements OnInit, OnDestroy {
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
    private state: StateFacade,
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
      switchMap(pkAnalysis => state.data.pro.analysis.getAnalysis.byPkEntity$(pkAnalysis)),
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
