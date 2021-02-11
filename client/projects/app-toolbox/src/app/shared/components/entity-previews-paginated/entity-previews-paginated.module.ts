import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { EntityPreviewsPaginatedDialogComponent } from './entity-previews-paginated-dialog/entity-previews-paginated-dialog.component';
import { EntityPreviewsPaginatedComponent } from './entity-previews-paginated.component';
import { EntityPreviewsPaginatedDialogService } from './service/entity-previews-paginated-dialog.service';



@NgModule({
  providers: [EntityPreviewsPaginatedDialogService],
  declarations: [EntityPreviewsPaginatedComponent, EntityPreviewsPaginatedDialogComponent],
  exports: [EntityPreviewsPaginatedComponent, EntityPreviewsPaginatedDialogComponent],
  imports: [
    CommonModule,
    EntityPreviewModule,
    MaterialModule
  ],
  entryComponents: [EntityPreviewsPaginatedDialogComponent]
})
export class EntityPreviewsPaginatedModule { }
