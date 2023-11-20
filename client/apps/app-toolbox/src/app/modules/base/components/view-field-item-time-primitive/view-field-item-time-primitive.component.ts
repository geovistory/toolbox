import { AsyncPipe, NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Field } from '@kleiolab/lib-redux';
import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { Observable } from 'rxjs';
import { OntoInfoModule } from '../../../../shared/components/onto-info/onto-info.module';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

@Component({
  selector: 'gv-view-field-item-time-primitive',
  templateUrl: './view-field-item-time-primitive.component.html',
  styleUrls: ['./view-field-item-time-primitive.component.scss'],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), OntoInfoModule, NgIf, MatMenuModule, MatIconModule, MatButtonModule, AsyncPipe, DateTimeModule]
})
export class ViewFieldItemTimePrimitiveComponent {
  timePrimitive: InfTimePrimitive;
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>

  constructor(
    public item: ViewFieldItemService,
    public editMode: EditModeService
  ) { }
  ngOnInit(): void {
    this.timePrimitive = this.item.component.item.target.timePrimitive.infTimePrimitive
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.showOntoInfo$ = this.item.component.showOntoInfo$
  }


}
