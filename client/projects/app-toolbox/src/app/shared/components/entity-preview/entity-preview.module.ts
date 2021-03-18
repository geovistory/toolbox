import { NgModule } from '@angular/core';
import { EntityPreviewComponent } from './entity-preview.component';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { TruncateModule } from '../../pipes/truncate/truncate.module';
import { DateTimeModule } from '@kleiolab/lib-utils';

@NgModule({
  imports: [CommonModule, DndModule, DateTimeModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [EntityPreviewComponent],
  exports: [EntityPreviewComponent]
})
export class EntityPreviewModule { }
