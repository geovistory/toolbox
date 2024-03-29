import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SysConfig } from '@kleiolab/lib-config';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { GvAnalysisService } from 'projects/app-toolbox/src/app/modules/analysis/services/analysis.service';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { TabLayoutService } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout.service';
import { values } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { TabLayoutComponentInterface } from '../../../projects/directives/on-activate-tab.directive';
import { OntomeProfileDeactivationReportDialogComponent, OntomeProfileDeactivationReportDialogData } from '../ontome-profile-deactivation-report-dialog/ontome-profile-deactivation-report-dialog.component';
import { OntomeProfileUpdateDialogComponent, OntomeProfileUpdateDialogData } from '../ontome-profile-update-dialog/ontome-profile-update-dialog.component';
import { OntomeProfilesListDialogComponent } from '../ontome-profiles-list-dialog/ontome-profiles-list-dialog.component';
export interface ProfileItem {
  label: string;
  ownerId: number;
  ownerLabel: string;
  profileId: number;
  scopeNote: string;
  required: boolean
}


@Component({
  selector: 'gv-ontome-profiles-settings',
  templateUrl: './ontome-profiles-settings.component.html',
  styleUrls: ['./ontome-profiles-settings.component.scss'],
  providers: [GvAnalysisService],
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

  ontomeUrl = SysConfig.ONTOME_URL;

  constructor(
    public ref: ChangeDetectorRef,
    public p: ActiveProjectService,
    public tabLayout: TabLayoutService,
    private dataService: ReduxMainService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.t = this.tabLayout.t
    this.t.setTabTitle('Ontome Profiles')

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.pkProject = pkProject;
      this.dataService.loadProjectProfileRelations(pkProject);
    })

    this.dataSource$ = combineLatest([
      this.p.pkProject$,
      this.p.sys$.config$.main$
    ]).pipe(
      switchMap(([pkProject, sysConfig]) => this.p.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
        .key(pkProject + '_true').pipe(
          switchMap((rels) => {
            const enabledProfiles = [
              ...values(rels).map(rel => ({ id: rel.fk_profile, required: false })),
              ...sysConfig.ontome.requiredOntomeProfiles.map(id => ({ id, required: true })) ?? []
            ]
            return combineLatest(enabledProfiles.map(i => {
              return combineLatest([
                this.pipeProfileLabel(i.id),
                this.pipeProfileScopeNote(i.id),
                this.pipeProfile(i.id)
              ]).pipe(
                map(([label, scopeNote, profile]) => {
                  const item: ProfileItem = {
                    profileId: i.id,
                    required: i.required,
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
