import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityPreview } from 'app/core';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';

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

  openInTab(preview: EntityPreview) {
    this.p.addEntityTab(preview.pk_entity, preview.fk_class, preview.entity_type)
    this.dialogRef.close()
  }
}
