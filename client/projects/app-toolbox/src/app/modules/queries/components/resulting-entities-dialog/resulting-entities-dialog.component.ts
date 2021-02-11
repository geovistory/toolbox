import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";

export interface EntitiesDialogData {
  entityPreviews: WarEntityPreview[];
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

  openInTab(preview: WarEntityPreview) {
    this.p.addEntityTab(preview.pk_entity, preview.fk_class)
    this.dialogRef.close()
  }
}
