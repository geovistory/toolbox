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
  @Output() collapseBody = new EventEmitter<Boolean>();

  collapsed = true;

  constructor() { }

  ngOnInit(): void {
    if (!this.fm) this.fm = {}

    // init comment to empty
    if (!this.fm?.comment) this.fm.comment = ""
    // init title to empty
    if (!this.fm?.title) this.fm.title = ""

    // send default collapse mode
    if ((this.fm as any).isNew) this.collapsed = false; // trick to make new Factoid mapping open by default. Not so clean, but it is a quick fix.
    else this.collapseBody.emit(this.collapsed)
  }

  fmChange(key: string, value: any) {
    this.fm[key] = value;
    this.fmChanged.emit(this.fm)
  }

  deleteFactoid() {
    this.delete.emit();
  }

  toggleCollapseBody() {
    this.collapsed = !this.collapsed;
    this.collapseBody.emit(this.collapsed)
  }


}
