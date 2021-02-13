import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { GvAnalysisService } from 'projects/app-toolbox/src/app/modules/analysis/services/analysis.service';
import { TabLayoutService } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout.service';
import { Subject, combineLatest } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { first, takeUntil, switchMap, map, filter } from 'rxjs/operators';
import { values } from 'ramda';
import { DfhConfig } from "@kleiolab/lib-config";
import { OntomeProfilesListDialogComponent } from '../ontome-profiles-list-dialog/ontome-profiles-list-dialog.component';
import { OntomeProfileDeactivationReportDialogComponent } from '../ontome-profile-deactivation-report-dialog/ontome-profile-deactivation-report-dialog.component';
import { OntomeProfileUpdateDialogComponent } from '../ontome-profile-update-dialog/ontome-profile-update-dialog.component';
let OntomeProfilesSettingsComponent = class OntomeProfilesSettingsComponent {
    constructor(ref, p, ts, dialog) {
        this.ref = ref;
        this.p = p;
        this.ts = ts;
        this.dialog = dialog;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.columnsToDisplay = ['expand', 'label', 'owner', 'ontomeLink', 'deactivate', 'update'];
    }
    ngOnInit() {
        this.t = this.ts.create(this.basePath[2], this.ref, this.destroy$);
        this.t.setTabTitle('Ontome Profiles');
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.pkProject = pkProject;
            this.p.pro$.dfh_profile_proj_rel.loadOfProject(pkProject);
        });
        this.dataSource$ = this.p.pkProject$.pipe(switchMap(pkProject => this.p.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
            .key(pkProject + '_true').pipe(switchMap((rels) => {
            const enabledProfiles = [
                ...values(rels).map(rel => rel.fk_profile),
                DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
            ];
            return combineLatest(enabledProfiles.map(profileId => {
                return combineLatest([
                    this.pipeProfileLabel(profileId),
                    this.pipeProfileScopeNote(profileId),
                    this.pipeProfile(profileId)
                ]).pipe(map(([label, scopeNote, profile]) => {
                    const item = {
                        profileId,
                        label,
                        scopeNote,
                        ownerId: profile.owned_by_project,
                        ownerLabel: ''
                    };
                    return item;
                }));
            }));
        }))));
    }
    pipeProfile(profileId) {
        return this.p.dfh$.profile$.by_pk_profile$.key(profileId).pipe(filter(x => !!x));
    }
    pipeProfileLabel(profileId) {
        return this.p.dfh$.label$.by_fk_profile__type$.key(profileId + '_label').pipe(map((labels) => {
            const dfhLabel = values(labels).find(label => label.language === 'en');
            return dfhLabel ? dfhLabel.label : '[no english label]';
        }));
    }
    pipeProfileScopeNote(profileId) {
        return this.p.dfh$.label$.by_fk_profile__type$.key(profileId + '_definition').pipe(map((labels) => {
            const dfhLabel = values(labels).find(label => label.language === 'en');
            return dfhLabel ? dfhLabel.label : '[no english label]';
        }));
    }
    openAddModal() {
        this.dialog.open(OntomeProfilesListDialogComponent);
    }
    openDeactivationReportModal(item) {
        const data = {
            pkProject: this.pkProject,
            profileId: item.profileId,
            profileLabel: item.label
        };
        this.dialog.open(OntomeProfileDeactivationReportDialogComponent, {
            data
        });
    }
    openUpdateDialog(item) {
        const data = {
            profileId: item.profileId,
            profileLabel: item.label
        };
        this.dialog.open(OntomeProfileUpdateDialogComponent, {
            data
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], OntomeProfilesSettingsComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    Input()
], OntomeProfilesSettingsComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Input()
], OntomeProfilesSettingsComponent.prototype, "pkEntity", void 0);
OntomeProfilesSettingsComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profiles-settings',
        templateUrl: './ontome-profiles-settings.component.html',
        styleUrls: ['./ontome-profiles-settings.component.scss'],
        providers: [TabLayoutService, GvAnalysisService],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ],
    })
], OntomeProfilesSettingsComponent);
export { OntomeProfilesSettingsComponent };
//# sourceMappingURL=ontome-profiles-settings.component.js.map