import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FactoidMapping, FactoidPropertyMapping } from '@kleiolab/lib-sdk-lb4';
import { FactoidMappingBodyComponent } from '../factoid-mapping-body/factoid-mapping-body.component';
import { FactoidMappingHeaderComponent } from '../factoid-mapping-header/factoid-mapping-header.component';

@Component({
  selector: 'gv-factoid-mapping',
  templateUrl: './factoid-mapping.component.html',
  styleUrls: ['./factoid-mapping.component.scss'],
  standalone: true,
  imports: [FactoidMappingHeaderComponent, FactoidMappingBodyComponent, NgClass]
})
export class FactoidMappingComponent {

  @Input() listNumber: number
  @Input() fm: FactoidMapping = {}

  @Output() deleteFM = new EventEmitter();
  @Output() fmChanged = new EventEmitter<FactoidPropertyMapping>();

  bodyCollapsed: boolean

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

  collapseBody(collapsed: boolean) {
    this.bodyCollapsed = collapsed;
  }

}
