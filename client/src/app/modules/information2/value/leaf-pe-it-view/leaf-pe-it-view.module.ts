import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LeafPeItViewComponent } from './leaf-pe-it-view.component';
import { LeafPeItViewModalComponent } from './leaf-pe-it-view-modal/leaf-pe-it-view-modal.component';



@NgModule({
    imports: [
        CommonModule,
        SlimLoadingBarModule,
    ],
    declarations: [
        LeafPeItViewComponent,
        LeafPeItViewModalComponent
    ],
    providers: [
        
    ],
    exports: [
        LeafPeItViewComponent
    ],
    entryComponents:[
        LeafPeItViewModalComponent
    ]
})
export class LeafPeItViewModule { }
