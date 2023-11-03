import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../core/material/material.module';
import { BaseModule } from '../../../modules/base/base.module';
import { InfoDialogComponent } from './info-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        BaseModule,
        MaterialModule
    ],
    declarations: [InfoDialogComponent]
})
export class InfoDialogModule { }
