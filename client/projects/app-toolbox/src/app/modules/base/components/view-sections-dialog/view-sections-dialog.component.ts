import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ViewSectionsDialogData {
  source: GvFieldSourceEntity
  pkClass$: Observable<number>
  showOntoInfo$: Observable<boolean>;
  appContext: number;
  readonly$: BehaviorSubject<boolean>
}

@Component({
  selector: 'gv-view-sections-dialog',
  templateUrl: './view-sections-dialog.component.html',
  styleUrls: ['./view-sections-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSectionsDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ViewSectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewSectionsDialogData
  ) { }

  ngOnInit() {
  }

}
