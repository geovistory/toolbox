import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { DndModule } from 'ng2-dnd';
import { TruncateModule } from '../../pipes/truncate/truncate.module';
import { OntoInfoModule } from '../onto-info/onto-info.module';
import { EntityPreviewComponent } from './entity-preview.component';

@NgModule({
  imports: [CommonModule, DndModule, DateTimeModule, MatMenuModule, MatIconModule, TruncateModule, OntoInfoModule],
  declarations: [EntityPreviewComponent],
  exports: [EntityPreviewComponent]
})
export class EntityPreviewModule { }
