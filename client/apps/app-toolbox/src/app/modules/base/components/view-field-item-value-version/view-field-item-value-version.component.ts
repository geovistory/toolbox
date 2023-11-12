import { AsyncPipe, NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Field, StateFacade } from '@kleiolab/lib-redux';
import { ProjectDataService, ReplaceStatementInFieldRequest } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject, combineLatest, of, timer } from 'rxjs';
import { catchError, first, map, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { OntoInfoModule } from '../../../../shared/components/onto-info/onto-info.module';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from '../../../../shared/components/progress-dialog/progress-dialog.component';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-value-version',
  templateUrl: './view-field-item-value-version.component.html',
  styleUrls: ['./view-field-item-value-version.component.scss'],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), OntoInfoModule, NgIf, MatMenuModule, MatIconModule, MatButtonModule, AsyncPipe]
})
export class ViewFieldItemValueVersionComponent {
  destroy$ = new Subject<boolean>();
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  constructor(
    public itemComponent: ViewFieldItemComponent,
    public bodyComponent: ViewFieldBodyComponent,
    private projectData: ProjectDataService,
    private dialog: MatDialog,
    public editMode: EditModeService,
    private state: StateFacade
  ) { }
  ngOnInit(): void {
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }
  switchToStatement() {
    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

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

