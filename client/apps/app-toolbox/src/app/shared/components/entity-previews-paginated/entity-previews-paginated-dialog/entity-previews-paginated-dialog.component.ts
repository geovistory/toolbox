import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EntityPreviewsPaginatedComponent } from '../entity-previews-paginated.component';
import { NgIf, NgFor } from '@angular/common';

export interface EntityPreviewsPaginatedDialogData {

  title: string;
  paragraphs?: string[];

  pkEntities: number[]
  pkProject: number

  limit?: number
  offset?: number

  dragEnabled?: boolean
  openTabOnClick?: boolean

}


@Component({
    selector: 'gv-entity-previews-paginated-dialog',
    templateUrl: './entity-previews-paginated-dialog.component.html',
    styleUrls: ['./entity-previews-paginated-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, NgIf, NgFor, EntityPreviewsPaginatedComponent, MatButtonModule]
})
export class EntityPreviewsPaginatedDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EntityPreviewsPaginatedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityPreviewsPaginatedDialogData) { }


  ngOnInit() {

  }

}
