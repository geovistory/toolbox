import { NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OntoMeControllerService, ProfileDeactivationReport } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OntomeProfileDeactivationReportItemsTableComponent } from '../ontome-profile-deactivation-report-items-table/ontome-profile-deactivation-report-items-table.component';

@Component({
  selector: 'gv-ontome-profile-deactivation-report',
  templateUrl: './ontome-profile-deactivation-report.component.html',
  styleUrls: ['./ontome-profile-deactivation-report.component.scss'],
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatTooltipModule, OntomeProfileDeactivationReportItemsTableComponent]
})
export class OntomeProfileDeactivationReportComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() profileId: number
  @Input() pkProject: number
  loading = false;
  report: ProfileDeactivationReport;
  deactivatedClassesExpanded = false;
  maintainedClassesExpanded = false;
  deactivatedPropertiesExpanded = false;
  maintainedPropertiesExpanded = false;
  classWarning: boolean;
  propertyWarning: boolean;

  constructor(
    private ontomeService: OntoMeControllerService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.ontomeService
      .ontoMeControllerGetDeactivationReport(this.pkProject, this.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ProfileDeactivationReport) => {
        this.loading = false;
        this.report = res;

        this.classWarning = res.deactivatedClasses.some(item => item.numberOfInstances > 0)
        this.propertyWarning = res.deactivatedProperties.some(item => item.numberOfInstances > 0)
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
