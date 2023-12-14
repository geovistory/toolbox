import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OntoMeControllerService, ProfileDeactivationReport } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeactivationReportItemsTableComponent } from '../deactivation-report-items-table/deactivation-report-items-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-ontome-profile-deactivation-report',
    templateUrl: './ontome-profile-deactivation-report.component.html',
    styleUrls: ['./ontome-profile-deactivation-report.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatTooltipModule, DeactivationReportItemsTableComponent]
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
