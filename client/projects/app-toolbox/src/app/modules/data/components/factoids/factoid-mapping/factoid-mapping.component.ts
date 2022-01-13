import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoidMapping, FactoidPropertyMapping } from '@kleiolab/lib-sdk-lb4';

@Component({
  selector: 'gv-factoid-mapping',
  templateUrl: './factoid-mapping.component.html',
  styleUrls: ['./factoid-mapping.component.scss']
})
export class FactoidMappingComponent implements OnInit {

  @Input() listNumber: number
  @Input() fm: FactoidMapping = {}

  @Output() deleteFM = new EventEmitter();
  @Output() fmChanged = new EventEmitter<FactoidPropertyMapping>();

  bodyCollapsed: Boolean

  constructor() { }

  ngOnInit(): void { }

  fmChange(fm: FactoidMapping) {
    this.fm = fm;
    this.fmChanged.emit(this.fm)
  }

  fpmsChange(fpms: Array<FactoidPropertyMapping>) {
    this.fm.properties = fpms;
    this.fmChanged.emit(this.fm)
  }

  delete() {
    this.deleteFM.emit();
  }

  collapseBody(collapsed: Boolean) {
    this.bodyCollapsed = collapsed;
  }

}
