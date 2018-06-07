import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PeItEntityPreviewComponent } from './pe-it-entity-preview.component';
import { PeItEntityPreviewModalComponent } from "./pe-it-entity-preview-modal/pe-it-entity-preview-modal.component";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import { RouterModule } from "@angular/router";

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
