import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { PeItEntityPreviewModalComponent } from './pe-it-entity-preview-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SlimLoadingBarModule,
    ],
    declarations: [
        PeItEntityPreviewModalComponent
    ],
    providers: [
        
    ],
    exports: [
        PeItEntityPreviewModalComponent
    ],
    entryComponents:[
        PeItEntityPreviewModalComponent
    ]
})
export class PeItEntityPreviewModalModule { }
