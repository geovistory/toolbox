import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";
import { ActiveProjectService } from "../../../../services/active-project.service";
import { EntityPreviewComponent } from '../../../../shared/components/entity-preview/entity-preview.component';

export interface EntitiesDialogData {
  entityPreviews: WarEntityPreview[];
}
@Component({
  selector: 'gv-visualization-table-entities-dialog',
  templateUrl: './visualization-table-entities-dialog.component.html',
  styleUrls: ['./visualization-table-entities-dialog.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, EntityPreviewComponent]
})
export class VisualizationTableEntitiesDialogComponent {

  constructor(public dialogRef: MatDialogRef<VisualizationTableEntitiesDialogComponent>,
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
