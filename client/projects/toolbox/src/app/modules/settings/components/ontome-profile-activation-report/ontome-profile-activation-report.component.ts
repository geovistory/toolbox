import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DfhProfileApi } from "projects/toolbox/src/app/core/sdk";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileActivationReport } from '../../../../../../../../../server/src/lb3/common/interfaces/profile-activation-report.interface'
@Component({
  selector: 'gv-ontome-profile-activation-report',
  templateUrl: './ontome-profile-activation-report.component.html',
  styleUrls: ['./ontome-profile-activation-report.component.scss']
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
    private dfhProfApi: DfhProfileApi
  ) { }

  ngOnInit() {
    this.loading = true;
    this.dfhProfApi
      .getActivationReport(this.pkProject, this.profileId)
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
