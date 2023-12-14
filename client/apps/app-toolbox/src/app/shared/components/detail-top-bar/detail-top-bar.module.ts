import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../core/material/material.module';
import { DetailTopBarComponent } from './detail-top-bar.component';
import { RightPanelBtnComponent } from './right-panel-btn/right-panel-btn.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        DetailTopBarComponent, RightPanelBtnComponent
    ],
    exports: [DetailTopBarComponent, RightPanelBtnComponent]
})
export class DetailTopBarModule { }
