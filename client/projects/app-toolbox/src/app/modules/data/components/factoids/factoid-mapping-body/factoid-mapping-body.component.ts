import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoidMapping, FactoidPropertyMapping } from '@kleiolab/lib-sdk-lb4/public-api';

@Component({
  selector: 'gv-factoid-mapping-body',
  templateUrl: './factoid-mapping-body.component.html',
  styleUrls: ['./factoid-mapping-body.component.scss']
})
export class FactoidMappingBodyComponent implements OnInit {

  @Input() fm: FactoidMapping;
  @Input() fpms: Array<FactoidPropertyMapping> = [];

  @Output() fpmsChanged = new EventEmitter<Array<FactoidPropertyMapping>>();

  constructor() { }

  ngOnInit(): void { }

  fpmCreate() {
    this.fpms.push({})
    this.fpmsChanged.emit(this.fpms);
  }

  fpmDelete(index: number) {
    this.fpms.splice(index, 1);
    this.fpmsChanged.emit(this.fpms);
  }

  fpmChange(index: number, fpm: FactoidPropertyMapping) {
    this.fpms[index] = fpm;
    this.fpmsChanged.emit(this.fpms);
  }

}
