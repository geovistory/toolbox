import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { DndModule } from 'ng2-dnd';
import { TruncateModule } from '../../pipes/truncate/truncate.module';
import { EntityPreviewComponent } from './entity-preview.component';

@NgModule({
  imports: [CommonModule, DndModule, DateTimeModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [EntityPreviewComponent],
  exports: [EntityPreviewComponent]
})
export class EntityPreviewModule { }
