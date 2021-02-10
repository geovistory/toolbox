import { NgModule } from '@angular/core';
import { EntityPreviewComponent } from './entity-preview.component';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';
import { TimeSpanPipeModule } from 'projects/toolbox/src/app/shared/pipes/time-span/time-span.module';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { TruncateModule } from '../../pipes/truncate/truncate.module';

@NgModule({
  imports: [CommonModule, DndModule, TimeSpanPipeModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [EntityPreviewComponent],
  exports: [EntityPreviewComponent]
})
export class EntityPreviewModule { }
