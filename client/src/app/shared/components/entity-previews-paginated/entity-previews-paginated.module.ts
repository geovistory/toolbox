import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EntityPreviewsPaginatedComponent } from './entity-previews-paginated.component';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { EntityPreviewsPaginatedDialogComponent } from './entity-previews-paginated-dialog/entity-previews-paginated-dialog.component';
import { EntityPreviewsPaginatedDialogService } from './service/entity-previews-paginated-dialog.service';



@NgModule({
  providers: [EntityPreviewsPaginatedDialogService],
  declarations: [EntityPreviewsPaginatedComponent, EntityPreviewsPaginatedDialogComponent],
  exports: [EntityPreviewsPaginatedComponent, EntityPreviewsPaginatedDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    EntityPreviewModule,
    MatDividerModule,
    MatDialogModule
  ],
  entryComponents: [EntityPreviewsPaginatedDialogComponent]
})
export class EntityPreviewsPaginatedModule { }
