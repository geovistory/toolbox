import { Injectable, Output } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ProAnalysisApi, SysConfig, ActiveProjectService } from 'app/core';
import { MatDialog } from '@angular/material';
import { ProgressDialogData, ProgressMode, ProgressDialogComponent } from 'app/shared/components/progress-dialog/progress-dialog.component';
import { ErrorDialogData, ErrorDialogComponent } from 'app/shared/components/error-dialog/error-dialog.component';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService<I, O> {

  results$ = new BehaviorSubject<O>(null)

  loading: boolean;

  constructor(
    private analysisApi: ProAnalysisApi,
    private dialog: MatDialog,
    private p: ActiveProjectService
  ) { }

  runAnalysis() {
    throw new Error('called befor registerOnRun')
  }

  registerRunAnalysis(fn) {
    this.runAnalysis = fn
  }

  callApi(q: I) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {

      const data: ProgressDialogData = {
        title: 'Creating Analysis ...',
        mode$: new BehaviorSubject<ProgressMode>('indeterminate'),
        hideValue: true,
        value$: new BehaviorSubject(0)
      }
      const dialog = this.dialog.open(ProgressDialogComponent, {
        width: '250px', data, disableClose: true
      });
      this.loading = true;

      this.analysisApi.run(pkProject, SysConfig.PK_ANALYSIS_TYPE__TIME_CONT, q).subscribe((r: O) => {
        this.results$.next(r);
        this.loading = false;
        dialog.close();
      }, error => {
        dialog.close();
        const d: ErrorDialogData = {
          title: 'Oops, something went wrong ...',
          subtitle: 'There was an error when creating the analysis. Sorry!',
          errorReport: {
            title: error.title,
            json: error.message
          }
        }
        this.dialog.open(ErrorDialogComponent, {
          data: d
        });

        // alert(`Ooops. Something went wrong: ${error}`)
      })
    })
  }

  saveAnalysis() {

  }


}
