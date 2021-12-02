import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field } from '@kleiolab/lib-queries';
import { ProjectDataService } from '@kleiolab/lib-sdk-lb4';
import { ReplaceStatementInFieldRequest } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/replaceStatementInFieldRequest';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from 'projects/app-toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { BehaviorSubject, combineLatest, Observable, of, Subject, timer } from 'rxjs';
import { catchError, first, map, takeUntil } from 'rxjs/operators';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-value-version',
  templateUrl: './view-field-item-value-version.component.html',
  styleUrls: ['./view-field-item-value-version.component.scss']
})
export class ViewFieldItemValueVersionComponent {
  destroy$ = new Subject<boolean>();
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  constructor(
    public itemComponent: ViewFieldItemComponent,
    public bodyComponent: ViewFieldBodyComponent,
    private ap: ActiveProjectPipesService,
    private projectData: ProjectDataService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }
  switchToStatement() {
    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      const data: ProgressDialogData = {
        title: 'Switching Version',
        mode$: new BehaviorSubject<ProgressMode>('indeterminate'),
        hideValue: true,
        value$: new BehaviorSubject(0)
      }
      const dialog = this.dialog.open(ProgressDialogComponent, {
        width: '250px', data, disableClose: true
      });
      const timer$ = timer(500)

      // Prepare statement
      const { pk_entity, ...statement } = this.itemComponent.item.statement
      // Prepare the request
      const req: ReplaceStatementInFieldRequest = {
        pkProject: pkProject,
        isOutgoing: this.itemComponent.field.isOutgoing,
        property: this.itemComponent.field.property,
        source: this.bodyComponent.source,
        statement
      }
      // Persist the update in the database
      const apiCall = this.projectData.createProjectDataControllerReplaceStatementsOfField(req)
        .pipe(
          map(e => ({ error: false })),
          catchError(() => of({ error: true })),
        )


      // wait until timer has passed and the api call is resolved$
      combineLatest([apiCall, timer$]).pipe(
        takeUntil(this.destroy$)
      ).subscribe(([apiCall]) => {
        dialog.close()
        if (apiCall.error) {
          this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
            data: {
              title: 'Error',
              paragraphs: ['Error while saving. Please try again.'],
              yesBtnText: 'Close',
              noBtnText: '',
              hideNoButton: true
            }
          })
        }
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

