import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { EntityPreviewsPaginatedDialogComponent } from './entity-previews-paginated-dialog/entity-previews-paginated-dialog.component';
import { EntityPreviewsPaginatedComponent } from './entity-previews-paginated.component';
import { EntityPreviewsPaginatedDialogService } from './service/entity-previews-paginated-dialog.service';
let EntityPreviewsPaginatedModule = class EntityPreviewsPaginatedModule {
};
EntityPreviewsPaginatedModule = tslib_1.__decorate([
    NgModule({
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
], EntityPreviewsPaginatedModule);
export { EntityPreviewsPaginatedModule };
//# sourceMappingURL=entity-previews-paginated.module.js.map