import { NgModule } from '@angular/core';

import { NgReduxModule } from '@angular-redux/store';
import { LeafPeItCtrlComponent } from './leaf-pe-it-ctrl.component';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';
import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';

@NgModule({
    imports: [
        NgReduxModule,
        // EntityAddModalModule
    ],
    declarations: [
        EntityAddModalComponent,
        LeafPeItCtrlComponent
    ],
    providers: [
        EntityAddModalService
    ],
    exports: [
        LeafPeItCtrlComponent
    ],
    entryComponents: [
        EntityAddModalComponent
    ]
})
export class LeafPeItCtrlModule { }
