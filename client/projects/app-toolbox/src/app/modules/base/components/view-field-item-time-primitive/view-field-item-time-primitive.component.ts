import { Component } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-time-primitive',
  templateUrl: './view-field-item-time-primitive.component.html',
  styleUrls: ['./view-field-item-time-primitive.component.scss']
})
export class ViewFieldItemTimePrimitiveComponent {
  timePrimitive: InfTimePrimitive;
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>

  constructor(
    public itemComponent: ViewFieldItemComponent,
    public editMode: EditModeService
  ) { }
  ngOnInit(): void {
    this.timePrimitive = this.itemComponent.item.target.timePrimitive.infTimePrimitive
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }


}
