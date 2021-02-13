import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { values } from 'd3';
import { indexBy } from 'ramda';
import { DfhConfig } from "@kleiolab/lib-config";
import { OntomeProfileActivationReportDialogComponent } from '../ontome-profile-activation-report-dialog/ontome-profile-activation-report-dialog.component';
let OntomeProfilesListComponent = class OntomeProfilesListComponent {
    constructor(http, p, dialog) {
        this.http = http;
        this.p = p;
        this.dialog = dialog;
        this.destroy$ = new Subject();
        this.loading = false;
        this.columnsToDisplay = ['expand', 'label', 'owner', 'ontomeLink', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit() {
        this.paginator.pageSize = 5;
        this.dataSource.paginator = this.paginator;
        this.enabledProfiles$ = this.p.pkProject$.pipe(tap((pkProject) => {
            this.pkProject = pkProject;
        }), switchMap(pkProject => this.p.pro$.dfh_profile_proj_rel$
            .by_fk_project__enabled$.key(pkProject + '_true').pipe(map(rels => indexBy((key) => key.toString(), [
            DfhConfig.PK_PROFILE_GEOVISTORY_BASIC,
            ...values(rels).map(rel => rel.fk_profile),
        ])))));
        this.loading = true;
        this.http.get(`https://ontome.dataforhistory.org/api/profiles.json?lang=en&selected-by-project=6`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
            this.loading = false;
            this.dataSource.data = response.map(apiItem => {
                const item = {
                    label: apiItem.profileLabel,
                    ownerId: apiItem.ownedByProjectID,
                    ownerLabel: apiItem.ownedByProjectLabel,
                    profileId: apiItem.profileID,
                    scopeNote: apiItem.profileDefinition
                };
                return item;
            });
        });
    }
    activate(item) {
        const data = {
            pkProject: this.pkProject,
            profileId: item.profileId,
            profileLabel: item.label
        };
        this.dialog.open(OntomeProfileActivationReportDialogComponent, {
            data
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], OntomeProfilesListComponent.prototype, "paginator", void 0);
OntomeProfilesListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profiles-list',
        templateUrl: './ontome-profiles-list.component.html',
        styleUrls: ['./ontome-profiles-list.component.scss'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ],
    })
], OntomeProfilesListComponent);
export { OntomeProfilesListComponent };
//# sourceMappingURL=ontome-profiles-list.component.js.map