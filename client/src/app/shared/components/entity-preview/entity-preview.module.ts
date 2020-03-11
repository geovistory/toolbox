import { NgModule } from '@angular/core';
import { EntityPreviewComponent } from './entity-preview.component';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { TruncateModule } from '../../pipes/truncate/truncate.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, DndModule, TimeSpanPipeModule, MatMenuModule, MatIconModule, TruncateModule],
  declarations: [EntityPreviewComponent],
  exports: [EntityPreviewComponent]
})
export class EntityPreviewModule { }
