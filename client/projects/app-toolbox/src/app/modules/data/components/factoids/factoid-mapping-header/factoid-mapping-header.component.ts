import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoidMapping } from '@kleiolab/lib-sdk-lb4/public-api';

@Component({
  selector: 'gv-factoid-mapping-header',
  templateUrl: './factoid-mapping-header.component.html',
  styleUrls: ['./factoid-mapping-header.component.scss']
})
export class FactoidMappingHeaderComponent implements OnInit {

  @Input() listNumber: number;
  @Input() fm: FactoidMapping;

  @Output() delete = new EventEmitter();
  @Output() fmChanged = new EventEmitter<FactoidMapping>();

  constructor() { }

  ngOnInit(): void {
    if (!this.fm) this.fm = {}

    // init comment to empty
    if (!this.fm?.comment) this.fm.comment = ""
    // init title to empty
    if (!this.fm?.title) this.fm.title = ""
  }

  fmChange(key: string, value: any) {
    this.fm[key] = value;
    this.fmChanged.emit(this.fm)
  }

  deleteFactoid() {
    this.delete.emit();
  }
}
