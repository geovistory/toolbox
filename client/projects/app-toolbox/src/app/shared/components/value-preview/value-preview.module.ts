import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';
import { TruncateModule } from '../../pipes/truncate/truncate.module';
import { ValuePreviewComponent } from './value-preview.component';

@NgModule({
  imports: [CommonModule, DndModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [ValuePreviewComponent],
  exports: [ValuePreviewComponent]
})
export class ValuePreviewModule { }
