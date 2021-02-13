import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { ListAPIActions } from './api/list.actions';
import { ListAPIEpics } from './api/list.epics';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { ListComponent } from './components/list/list.component';
import { DndModule } from 'ng2-dnd';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
const components = [
    ListComponent,
    EntitySearchHitComponent
];
let ListModule = class ListModule {
};
ListModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            NgbModule,
            MaterialModule,
            ReactiveFormsModule,
            DndModule,
            EntityPreviewModule,
            PassiveLinkModule
        ],
        declarations: components,
        providers: [
            ListAPIActions,
            ListAPIEpics,
        ],
        exports: components
    })
], ListModule);
export { ListModule };
//# sourceMappingURL=list.module.js.map