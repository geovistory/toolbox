import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SysConfig } from '@kleiolab/lib-config';
import { StateFacade } from '@kleiolab/lib-redux';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { values } from 'd3';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PassiveLinkDirective } from '../../../../directives/passive-link/passive-link.directive';
import { AnalysisIconPipe } from '../../../../pipes/analysis-icon/analysis-icon.pipe';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { AnalysisTabData } from '../../../analysis/services/analysis.service';
import { ListDrawerHeaderComponent } from '../list-drawer-header/list-drawer-header.component';

@Component({
  selector: 'gv-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss'],
  standalone: true,
  imports: [ListDrawerHeaderComponent, MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule, NgStyle, MatInputModule, MatCheckboxModule, MatDividerModule, MatTableModule, MatSortModule, PassiveLinkDirective, MatTooltipModule, NgIf, AsyncPipe, AnalysisIconPipe]
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
    private state: StateFacade,
  ) { }

  ngOnInit() {
    const pkProject = this.state.pkProject;

    this.state.data.getProjectAnalisis(pkProject)

    this.items$ = this.state.data.pro.analysis.analysesByPkEntity$.pipe(
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
          if (item.description) {
            if (item.description.toString().search(term) > -1) return true
          }
        }
        return false
      })
      this.dataSource.data = filtered;
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
    this.state.ui.activeProject.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__TIME_CONT
      }
    })
  }


  newTable() {
    this.state.ui.activeProject.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__TABLE
      }
    })
  }
  newMapAndTimeCont() {
    this.state.ui.activeProject.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis',
      icon: 'analysis',
      pathSegment: 'analysisDetails',
      data: {
        fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT
      }
    })
  }

  open(item: ProAnalysis) {
    this.state.ui.activeProject.addTab<AnalysisTabData>({
      active: true,
      component: 'analysis',
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
