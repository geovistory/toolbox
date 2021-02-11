import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AnalysisTabData, SysConfig } from 'projects/app-toolbox/src/app/core';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { AnalysisService } from 'projects/app-toolbox/src/app/core/sdk-lb4';
import { ProAnalysis } from "@kleiolab/lib-sdk-lb4";
import { SchemaObjectService } from 'projects/app-toolbox/src/app/core/redux-store/schema-object.service';
import { values } from 'd3';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  items$: Observable<ProAnalysis[]>;
  filter$ = new BehaviorSubject<string>('');
  displayedColumns: string[] = ['fk_analysis_type', 'name'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  showDetails$ = new BehaviorSubject(false);

  loading$

  sysConf = SysConfig;

  constructor(
    public p: ActiveProjectService,
    private s: SchemaObjectService,
    private analysisApi: AnalysisService) { }

  ngOnInit() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.s.storeGv(this.analysisApi.analysisControllerOfProject(pkProject), pkProject)

      this.items$ = this.p.pro$.analysis$.by_pk_entity$.all$.pipe(
        map(all => values(all).filter(analysis => analysis.fk_project === pkProject))
      )
      combineLatest(
        this.items$,
        this.filter$,
        this.showDetails$
      ).pipe(takeUntil(this.destroy$)).subscribe(([items, filterValue, showDetails]) => {
        const term = filterValue.trim().toLowerCase();
        const filtered = items.filter(item => {
          if (item.name.toLowerCase().search(term) > -1) return true
          if (showDetails) {
            if (item.pk_entity.toString().search(term) > -1) return true
            if (!!item.description) {
              if (item.description.toString().search(term) > -1) return true
            }
          }
          return false
        })
        this.dataSource.data = filtered;
      })
    })
    this.sort.active = 'name'
    this.sort.direction = 'asc'
    this.sort.disableClear = true;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }

      return data[sortHeaderId];
    };
  }
  ngAfterViewInit() {
  }
  applyFilter(filterValue: string) {
    this.filter$.next(filterValue)
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
