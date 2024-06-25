
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, timer } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ProgressDialogComponent, ProgressDialogData } from '../components/misc/progress-dialog/progress-dialog.component';

@Injectable({ providedIn: 'root' })
export class RemoveEntityService {
  constructor(
    private state: StateFacade,
    private dialog: MatDialog,
  ) { }

  /************************************************************************************
  * Change Project Relations
  ************************************************************************************/

  removeEntityFromProject(pkEntity: number, cb?: (schemaObject: GvPositiveSchemaObject) => any) {
    this.state.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)

      // this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject)
      const call$ = this.state.data.removeEntityFromProject(pkProject, pkEntity);
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {
          title: 'Removing entity from your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: GvPositiveSchemaObject) => {
          if (cb) cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
  }
}
