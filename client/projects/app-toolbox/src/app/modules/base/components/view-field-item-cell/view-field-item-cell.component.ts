import { Component } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { Observable } from 'rxjs';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-cell',
  templateUrl: './view-field-item-cell.component.html',
  styleUrls: ['./view-field-item-cell.component.scss']
})
export class ViewFieldItemCellComponent {
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

