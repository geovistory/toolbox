import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { ApiProfile } from '@kleiolab/lib-sdk-lb4';
import { flatten, indexBy, uniqBy } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { OntomeProfileActivationReportDialogComponent, OntomeProfileActivationReportDialogData } from '../ontome-profile-activation-report-dialog/ontome-profile-activation-report-dialog.component';
import { ProfileItem } from '../ontome-profiles-settings/ontome-profiles-settings.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';


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
    standalone: true,
    imports: [
        NgIf,
        MatProgressSpinnerModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        AsyncPipe,
    ],
})
export class OntomeProfilesListComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  loading = false;

  columnsToDisplay = ['expand', 'label', 'owner', 'ontomeLink', 'actions'];
  expandedElement: ProfileItem | null;
  dataSource = new MatTableDataSource<ProfileItem>([]);

  enabledProfiles$: Observable<{ [key: number]: number }>

  ontomeUrl = SysConfig.ONTOME_URL;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private state: StateFacade,
    private c: ConfigurationPipesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;

    this.enabledProfiles$ = this.c.pipeProfilesEnabledByProject().pipe(
      map(profiles => indexBy((key) => key.toString(), profiles))
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
            scopeNote: apiItem.profileDefinition,
            required: false
          }
          return item
        })
      })
  }

  async getOntoMeProjects(): Promise<number[]> {
    return combineLatest([this.state.pkProject$, this.state.data.sys.config.sysConfig$])
      .pipe(
        map(([pkProject, sysConfig]) => {
          const ontomeProjectIds = []
          sysConfig.ontome.optionalOntomeProfiles?.forEach(i => {
            if (!i.restrictedToGvProjects) ontomeProjectIds.push(...i.profilesAvailableByOmProjects);
            else if (i.restrictedToGvProjects.includes(pkProject)) ontomeProjectIds.push(...i.profilesAvailableByOmProjects);
          })
          return ontomeProjectIds;
        }),
        first()
      ).toPromise()
  }

  async activate(item: ProfileItem) {
    const pkProject = await this.state.pkProject$.pipe(first()).toPromise()
    const data: OntomeProfileActivationReportDialogData = {
      pkProject,
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
