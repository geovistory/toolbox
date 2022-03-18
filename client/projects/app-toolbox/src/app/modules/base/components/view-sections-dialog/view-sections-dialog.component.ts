import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';

export interface ViewSectionsDialogData {
  scope: GvFieldPageScope,
  source: GvFieldSourceEntity
  pkClass$: Observable<number>
  showOntoInfo$: Observable<boolean>;
  appContext: number;
  readonly: boolean
  showOpenInNewTabButton: boolean
}

@Component({
  selector: 'gv-view-sections-dialog',
  templateUrl: './view-sections-dialog.component.html',
  styleUrls: ['./view-sections-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditModeService]
})
export class ViewSectionsDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ViewSectionsDialogComponent>,
    private p: ActiveProjectService,
    @Inject(MAT_DIALOG_DATA) public data: ViewSectionsDialogData,
    public editMode: EditModeService
  ) {
    editMode.setValue(data.readonly ? false : true)
  }

  ngOnInit() {
  }

  openInNewTab() {
    this.p.addEntityTabWithoutClass(this.data.source.fkInfo)
    this.dialogRef.close()
  }
}
