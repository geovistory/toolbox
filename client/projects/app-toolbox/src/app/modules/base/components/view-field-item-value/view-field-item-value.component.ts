import { Component } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { Observable } from 'rxjs';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-value',
  templateUrl: './view-field-item-value.component.html',
  styleUrls: ['./view-field-item-value.component.scss']
})
export class ViewFieldItemValueComponent {
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  constructor(public itemComponent: ViewFieldItemComponent) { }
  ngOnInit(): void {
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }

}

