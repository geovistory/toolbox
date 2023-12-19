import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OntoMeControllerService, ProfileActivationReport } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivationReportItemsTableComponent } from '../activation-report-items-table/activation-report-items-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
@Component({
    selector: 'gv-ontome-profile-activation-report',
    templateUrl: './ontome-profile-activation-report.component.html',
    styleUrls: ['./ontome-profile-activation-report.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressSpinnerModule, MatButtonModule, MatIconModule, ActivationReportItemsTableComponent]
})
export class OntomeProfileActivationReportComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() profileId: number
  @Input() pkProject: number
  loading = false;
  report: ProfileActivationReport;
  newClassesExpanded = false;
  oldClassesExpanded = false;
  newPropertiesExpanded = false;
  oldPropertiesExpanded = false;


  constructor(
    private ontomeService: OntoMeControllerService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.ontomeService
      .ontoMeControllerGetActivationReport(this.pkProject, this.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ProfileActivationReport) => {
        this.loading = false;
        this.report = res;
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
