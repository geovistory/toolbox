import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { ActiveProjectService } from '../../../services/active-project.service';
import { EditModeService } from '../../../modules/base/services/edit-mode.service';
import { ViewSectionsComponent } from '../view-sections/view-sections.component';

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
  providers: [EditModeService],
  standalone: true,
  imports: [MatDialogModule, ViewSectionsComponent, MatButtonModule, NgIf, MatIconModule]
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
