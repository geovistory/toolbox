import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SysConfig } from '@kleiolab/lib-config';
import { StateFacade } from '@kleiolab/lib-redux';
import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { values } from 'ramda';
import { Observable, Subject, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TabLayoutComponentInterface } from '../../../directives/on-activate-tab.directive';
import { TabLayout } from '../../../lib/classes/tab-layout';
import { ActiveProjectService } from '../../../services/active-project.service';
import { GvAnalysisService } from '../../../services/analysis.service';
import { TabLayoutService } from '../../../services/tab-layout.service';
import { DetailContentComponent } from '../../layout/tab-layout/detail-content/detail-content.component';
import { DetailTopBarComponent } from '../../layout/tab-layout/detail-top-bar/detail-top-bar.component';
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
  standalone: true,
  imports: [
    DetailTopBarComponent,
    DetailContentComponent,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class OntomeProfilesSettingsComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  t: TabLayout;

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // path to the substore
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
    private state: StateFacade,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.t = this.tabLayout.t
    this.t.setTabTitle('Ontome Profiles')

    this.pkProject = this.state.pkProject;
    this.state.data.loadProjectProfileRelations(this.pkProject);

    this.dataSource$ =
      this.state.data.sys.config.sysConfig$.pipe(
        switchMap((sysConfig) => this.state.data.pro.dfhProfileProjRel.getDfhProfileProjRel.byFkProjectEnabled$(this.pkProject, true).pipe(
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
    return this.state.data.dfh.profile.getDfhProfile.byProfile(profileId).pipe(
      filter(x => !!x)
    )
  }

  pipeProfileLabel(profileId: number): Observable<string> {
    return this.state.data.dfh.label.getDfhLabel.byProfile(profileId, 'label').pipe(
      map((labels) => {
        const dfhLabel = values(labels).find(label => label.language === 'en')
        return dfhLabel ? dfhLabel.label : '[no english label]'
      })
    )
  }

  pipeProfileScopeNote(profileId: number): Observable<string> {
    return this.state.data.dfh.label.getDfhLabel.byProfile(profileId, 'definition').pipe(
      map((labels) => {
        const dfhLabel = values(labels).find(label => label.language === 'en')
        return dfhLabel ? dfhLabel.label : '[no english label]'
      })
    )
  }
  openAddModal() {
    this.dialog.open(OntomeProfilesListDialogComponent, {
      width: '100%',
    })
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
