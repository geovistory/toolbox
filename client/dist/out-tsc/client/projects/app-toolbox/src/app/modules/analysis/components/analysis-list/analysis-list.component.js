import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { values } from 'd3';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
let AnalysisListComponent = class AnalysisListComponent {
    constructor(p, s, analysisApi) {
        this.p = p;
        this.s = s;
        this.analysisApi = analysisApi;
        this.destroy$ = new Subject();
        this.filter$ = new BehaviorSubject('');
        this.displayedColumns = ['fk_analysis_type', 'name'];
        this.dataSource = new MatTableDataSource([]);
        this.showDetails$ = new BehaviorSubject(false);
        this.sysConf = SysConfig;
    }
    ngOnInit() {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.s.storeGv(this.analysisApi.analysisControllerOfProject(pkProject), pkProject);
            this.items$ = this.p.pro$.analysis$.by_pk_entity$.all$.pipe(map(all => values(all).filter(analysis => analysis.fk_project === pkProject)));
            combineLatest(this.items$, this.filter$, this.showDetails$).pipe(takeUntil(this.destroy$)).subscribe(([items, filterValue, showDetails]) => {
                const term = filterValue.trim().toLowerCase();
                const filtered = items.filter(item => {
                    if (item.name.toLowerCase().search(term) > -1)
                        return true;
                    if (showDetails) {
                        if (item.pk_entity.toString().search(term) > -1)
                            return true;
                        if (!!item.description) {
                            if (item.description.toString().search(term) > -1)
                                return true;
                        }
                    }
                    return false;
                });
                this.dataSource.data = filtered;
            });
        });
        this.sort.active = 'name';
        this.sort.direction = 'asc';
        this.sort.disableClear = true;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
            if (typeof data[sortHeaderId] === 'string') {
                return data[sortHeaderId].toLocaleLowerCase();
            }
            return data[sortHeaderId];
        };
    }
    ngAfterViewInit() {
    }
    applyFilter(filterValue) {
        this.filter$.next(filterValue);
    }
    newTimelineContinuous() {
        this.p.addTab({
            active: true,
            component: 'analysis-detail',
            icon: 'analysis',
            pathSegment: 'analysisDetails',
            data: {
                fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__TIME_CONT
            }
        });
    }
    newTable() {
        this.p.addTab({
            active: true,
            component: 'analysis-detail',
            icon: 'analysis',
            pathSegment: 'analysisDetails',
            data: {
                fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__TABLE
            }
        });
    }
    newMapAndTimeCont() {
        this.p.addTab({
            active: true,
            component: 'analysis-detail',
            icon: 'analysis',
            pathSegment: 'analysisDetails',
            data: {
                fkAnalysisType: SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT
            }
        });
    }
    open(item) {
        this.p.addTab({
            active: true,
            component: 'analysis-detail',
            icon: 'analysis',
            pathSegment: 'analysisDetails',
            data: {
                pkEntity: item.pk_entity,
                fkAnalysisType: item.fk_analysis_type
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], AnalysisListComponent.prototype, "sort", void 0);
AnalysisListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-analysis-list',
        templateUrl: './analysis-list.component.html',
        styleUrls: ['./analysis-list.component.scss']
    })
], AnalysisListComponent);
export { AnalysisListComponent };
//# sourceMappingURL=analysis-list.component.js.map