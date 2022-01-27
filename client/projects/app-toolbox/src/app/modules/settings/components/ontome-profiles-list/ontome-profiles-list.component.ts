import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DfhConfig, SysConfig } from '@kleiolab/lib-config';
import { SysSelector } from '@kleiolab/lib-queries';
import { ApiProfile } from '@kleiolab/lib-sdk-lb4';
import { values } from 'd3';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { flatten, indexBy, uniqBy } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { OntomeProfileActivationReportDialogComponent, OntomeProfileActivationReportDialogData } from '../ontome-profile-activation-report-dialog/ontome-profile-activation-report-dialog.component';
import { ProfileItem } from '../ontome-profiles-settings/ontome-profiles-settings.component';


@Component({
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
export class OntomeProfilesListComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  loading = false;
  pkProject: number

  columnsToDisplay = ['expand', 'label', 'owner', 'ontomeLink', 'actions'];
  expandedElement: ProfileItem | null;
  dataSource = new MatTableDataSource<ProfileItem>([]);

  enabledProfiles$: Observable<{ [key: number]: number }>

  ontomeUrl = SysConfig.ONTOME_URL;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private p: ActiveProjectService,
    private dialog: MatDialog,
    private sys$: SysSelector
  ) { }

  ngOnInit() {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;

    this.enabledProfiles$ = this.p.pkProject$.pipe(
      tap((pkProject) => {
        this.pkProject = pkProject
      }),
      switchMap(pkProject => this.p.pro$.dfh_profile_proj_rel$
        .by_fk_project__enabled$.key(pkProject + '_true').pipe(
          map(rels => indexBy(
            (key) => key.toString(),
            [
              DfhConfig.PK_PROFILE_GEOVISTORY_BASIC,
              ...values(rels).map(rel => rel.fk_profile),
            ]
          ))
        ))
    )

    this.loadProfiles()

  }
  async loadProfiles() {
    const ontomeProjectIds = await this.getOntoMeProjects()
    this.loading = true;
    combineLatest(
      ontomeProjectIds.map(id => this.http.get<ApiProfile[]>(`${this.ontomeUrl}/api/profiles.json?lang=en&selected-by-project=${id}`))
    )
      // this.http.get(this.ontomeUrl + `/api/profiles.json?lang=en&selected-by-project=6`)
      .pipe(
        map(nested => flatten<ApiProfile>(nested)),
        takeUntil(this.destroy$)
      )
      .subscribe((response: ApiProfile[]) => {

        this.loading = false;
        const uniq = uniqBy((p) => p.profileID, response)
        this.dataSource.data = uniq.map(apiItem => {
          const item: ProfileItem = {
            label: apiItem.profileLabel,
            ownerId: apiItem.ownedByProjectID,
            ownerLabel: apiItem.ownedByProjectLabel,
            profileId: apiItem.profileID,
            scopeNote: apiItem.profileDefinition
          }
          return item
        })
      })
  }

  async getOntoMeProjects(): Promise<number[]> {
    return combineLatest([this.p.pkProject$, this.sys$.config$.main$])
      .pipe(
        map(([pkProject, sysConfig]) => {
          const ontomeProjectIds = []
          sysConfig.ontome.optionalOntomeProfiles?.forEach(i => {
            if (!i.restrictedToGvProjects) return ontomeProjectIds.push(i.profilesAvailableByOmProjects);
            if (i.restrictedToGvProjects.includes(pkProject)) ontomeProjectIds.push(i.profilesAvailableByOmProjects);
          })
          return ontomeProjectIds;
        }),
        first()
      ).toPromise()
  }

  activate(item: ProfileItem) {
    const data: OntomeProfileActivationReportDialogData = {
      pkProject: this.pkProject,
      profileId: item.profileId,
      profileLabel: item.label
    }
    this.dialog.open(OntomeProfileActivationReportDialogComponent, {
      data
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
