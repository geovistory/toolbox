import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { ProfileItem } from '../ontome-profiles-settings/ontome-profiles-settings.component';
import { ApiProfile } from '../../../../../../../server/src/lb3/common/interfaces';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ActiveProjectService } from 'app/core';
import { runInThisContext } from 'vm';
import { values } from 'd3';
import { indexBy } from 'ramda';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { OntomeProfilesListDialogComponent, OntomeProfilesListDialogData } from '../ontome-profiles-list-dialog/ontome-profiles-list-dialog.component';
import { OntomeProfileActivationReportDialogData, OntomeProfileActivationReportDialogComponent } from '../ontome-profile-activation-report-dialog/ontome-profile-activation-report-dialog.component';


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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private p: ActiveProjectService,
    private dialog: MatDialog
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


    this.loading = true;
    this.http.get(`https://ontome.dataforhistory.org/api/profiles.json?lang=en&selected-by-project=6`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiProfile[]) => {

        this.loading = false;
        this.dataSource.data = response.map(apiItem => {
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
