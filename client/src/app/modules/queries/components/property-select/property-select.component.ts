import { Component, OnInit, Input } from '@angular/core';
import { QueryTree } from '../../containers/query-detail/query-detail.component';

@Component({
  selector: 'gv-property-select',
  templateUrl: './property-select.component.html',
  styleUrls: ['./property-select.component.scss']
})
export class PropertySelectComponent implements OnInit {

  @Input() qtree: QueryTree;

  selected;

  constructor() { }

  ngOnInit() {
    this.qtree.item = {
      ...this.qtree.item,
      properties: 'properties',
    }
  }


}
