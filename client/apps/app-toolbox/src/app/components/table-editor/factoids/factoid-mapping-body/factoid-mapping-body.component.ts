import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoidMapping, FactoidPropertyMapping } from '@kleiolab/lib-sdk-lb4';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FactoidPropertyMappingComponent } from '../factoid-property-mapping/factoid-property-mapping.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'gv-factoid-mapping-body',
    templateUrl: './factoid-mapping-body.component.html',
    styleUrls: ['./factoid-mapping-body.component.scss'],
    standalone: true,
    imports: [NgFor, FactoidPropertyMappingComponent, MatButtonModule, MatIconModule]
})
export class FactoidMappingBodyComponent {

  @Input() fm: FactoidMapping;
  @Input() fpms: Array<FactoidPropertyMapping> = [];

  @Output() fpmsChanged = new EventEmitter<Array<FactoidPropertyMapping>>();

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
