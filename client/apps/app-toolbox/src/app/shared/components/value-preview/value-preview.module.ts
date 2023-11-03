import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DndModule } from '@suez/ngx-dnd';
import { TruncateModule } from '../../pipes/truncate/truncate.module';
import { ValuePreviewComponent } from './value-preview.component';

@NgModule({
  imports: [CommonModule, DndModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [ValuePreviewComponent],
  exports: [ValuePreviewComponent]
})
export class ValuePreviewModule { }
