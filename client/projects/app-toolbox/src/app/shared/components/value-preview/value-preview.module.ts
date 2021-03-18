import { NgModule } from '@angular/core';
import { ValuePreviewComponent } from './value-preview.component';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { TruncateModule } from '../../pipes/truncate/truncate.module';

@NgModule({
  imports: [CommonModule, DndModule, TimeSpanPipeModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [ValuePreviewComponent],
  exports: [ValuePreviewComponent]
})
export class ValuePreviewModule { }
