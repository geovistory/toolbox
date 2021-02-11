import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { GvAnalysisService } from 'projects/app-toolbox/src/app/modules/analysis/services/analysis.service';
import { TabLayoutComponentInterface } from 'projects/app-toolbox/src/app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { TabLayoutService } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout.service';
import { Subject, Observable, of, combineLatest } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { first, takeUntil, switchMap, map, filter } from 'rxjs/operators';
import { values } from 'ramda';
import { DfhConfig } from 'projects/app-toolbox/src/app/modules/information/shared/dfh-config';
import { MatDialog } from '@angular/material';
import { OntomeProfilesListDialogComponent } from '../ontome-profiles-list-dialog/ontome-profiles-list-dialog.component';
import { OntomeProfileDeactivationReportDialogComponent, OntomeProfileDeactivationReportDialogData } from '../ontome-profile-deactivation-report-dialog/ontome-profile-deactivation-report-dialog.component';
import { OntomeProfileUpdateDialogData, OntomeProfileUpdateDialogComponent } from '../ontome-profile-update-dialog/ontome-profile-update-dialog.component';
import { DfhProfile } from "@kleiolab/lib-sdk-lb4";
export interface ProfileItem {
  label: string;
  ownerId: number;
  ownerLabel: string;
  profileId: number;
  scopeNote: string;
}


@Component({
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
export class OntomeProfilesSettingsComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  t: TabLayout;

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // path to the substore
  @Input() basePath: string[];
  @Input() pkEntity: number;

  pkProject: number;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  dataSource$: Observable<ProfileItem[]>;
  columnsToDisplay = ['expand', 'label', 'owner', 'ontomeLink', 'deactivate', 'update'];
  expandedElement: ProfileItem | null;

  constructor(
    public ref: ChangeDetectorRef,
    public p: ActiveProjectService,
    private ts: TabLayoutService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.t = this.ts.create(this.basePath[2], this.ref, this.destroy$);
    this.t.setTabTitle('Ontome Profiles')

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.pkProject = pkProject;
      this.p.pro$.dfh_profile_proj_rel.loadOfProject(pkProject)
    })
    this.dataSource$ = this.p.pkProject$.pipe(
      switchMap(pkProject => this.p.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
        .key(pkProject + '_true').pipe(
          switchMap((rels) => {
            const enabledProfiles = [
              ...values(rels).map(rel => rel.fk_profile),
              DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
            ]
            return combineLatest(enabledProfiles.map(profileId => {
              return combineLatest([
                this.pipeProfileLabel(profileId),
                this.pipeProfileScopeNote(profileId),
                this.pipeProfile(profileId)
              ]).pipe(
                map(([label, scopeNote, profile]) => {
                  const item: ProfileItem = {
                    profileId,
                    label,
                    scopeNote,
                    ownerId: profile.owned_by_project,
                    ownerLabel: ''
                  }
                  return item
                })
              )
            }))
          })
        )
      ))

  }

  pipeProfile(profileId: number): Observable<DfhProfile> {
    return this.p.dfh$.profile$.by_pk_profile$.key(profileId).pipe(
      filter(x => !!x)
    )
  }

  pipeProfileLabel(profileId: number): Observable<string> {
    return this.p.dfh$.label$.by_fk_profile__type$.key(profileId + '_label').pipe(
      map((labels) => {
        const dfhLabel = values(labels).find(label => label.language === 'en')
        return dfhLabel ? dfhLabel.label : '[no english label]'
      })
    )
  }

  pipeProfileScopeNote(profileId: number): Observable<string> {
    return this.p.dfh$.label$.by_fk_profile__type$.key(profileId + '_definition').pipe(
      map((labels) => {
        const dfhLabel = values(labels).find(label => label.language === 'en')
        return dfhLabel ? dfhLabel.label : '[no english label]'
      })
    )
  }
  openAddModal() {
    this.dialog.open(OntomeProfilesListDialogComponent)
  }

  openDeactivationReportModal(item: ProfileItem) {
    const data: OntomeProfileDeactivationReportDialogData = {
      pkProject: this.pkProject,
      profileId: item.profileId,
      profileLabel: item.label
    }
    this.dialog.open(OntomeProfileDeactivationReportDialogComponent, {
      data
    })
  }
  openUpdateDialog(item: ProfileItem) {
    const data: OntomeProfileUpdateDialogData = {
      profileId: item.profileId,
      profileLabel: item.label
    }
    this.dialog.open(OntomeProfileUpdateDialogComponent, {
      data
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
