import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { LeafPeItViewComponent } from './leaf-pe-it-view-modal/leaf-pe-it-view-modal.component';
import { PeItEntityPreviewComponent } from './leaf-pe-it-view.component';

@NgModule({
    imports: [
        CommonModule,
        SlimLoadingBarModule,
    ],
    declarations: [
        PeItEntityPreviewComponent,
        LeafPeItViewComponent
    ],
    providers: [
        
    ],
    exports: [
        PeItEntityPreviewComponent
    ],
    entryComponents:[
        LeafPeItViewComponent
    ]
})
export class PeItEntityPreviewModule { }
