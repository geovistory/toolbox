import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntityPreview, ActiveProjectService } from 'app/core';

export interface EntitiesDialogData {
  entityPreviews: EntityPreview[];
}
@Component({
  selector: 'gv-resulting-entities-dialog',
  templateUrl: './resulting-entities-dialog.component.html',
  styleUrls: ['./resulting-entities-dialog.component.scss']
})
export class ResultingEntitiesDialogComponent {

  constructor(public dialogRef: MatDialogRef<ResultingEntitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntitiesDialogData,
    public p: ActiveProjectService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  openInTab(entityPreview:EntityPreview){
    this.p.addEntityTab(entityPreview)
    this.dialogRef.close()
  }
}
