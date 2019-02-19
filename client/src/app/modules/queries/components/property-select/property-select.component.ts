import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QueryTree } from '../../containers/query-detail/query-detail.component';
import { MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs';
export interface PropertyOption { propertyFieldKey: string, isOutgoing: boolean, pk: number, label: string };
@Component({
  selector: 'gv-property-select',
  templateUrl: './property-select.component.html',
  styleUrls: ['./property-select.component.scss']
})
export class PropertySelectComponent implements OnInit {

  @Input() qtree: QueryTree;
  @Input() options$: Observable<PropertyOption[]>;
  @Output() selectionChanged = new EventEmitter<PropertyOption[]>();
  selected;

  constructor() { }

  ngOnInit() {

  }

  selectionChange(e: MatSelectChange) {
    const val = e.value as PropertyOption[];
    this.qtree.data = {
      ...this.qtree.data,
      outgoingProperties: val.filter(p => p.isOutgoing === true).map(p => p.pk),
      ingoingProperties: val.filter(p => p.isOutgoing === false).map(p => p.pk),
    }
    this.selectionChanged.emit(val);
  }


}
