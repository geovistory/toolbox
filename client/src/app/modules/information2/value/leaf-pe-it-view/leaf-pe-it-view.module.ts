import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { PeItEntityPreviewModalComponent } from './pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';
import { PeItEntityPreviewComponent } from './pe-it-entity-preview.component';

@NgModule({
    imports: [
        CommonModule,
        SlimLoadingBarModule,
    ],
    declarations: [
        PeItEntityPreviewComponent,
        PeItEntityPreviewModalComponent
    ],
    providers: [
        
    ],
    exports: [
        PeItEntityPreviewComponent
    ],
    entryComponents:[
        PeItEntityPreviewModalComponent
    ]
})
export class PeItEntityPreviewModule { }
