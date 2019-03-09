import { NgModule } from '@angular/core';
import { EntityPreviewComponent } from './entity-preview.component';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';

@NgModule({
  imports: [CommonModule, DndModule, TimeSpanPipeModule],
  declarations: [EntityPreviewComponent],
  exports: [EntityPreviewComponent]
})
export class EntityPreviewModule { }
