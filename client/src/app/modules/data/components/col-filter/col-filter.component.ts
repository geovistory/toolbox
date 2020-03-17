import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gv-col-filter',
  templateUrl: './col-filter.component.html',
  styleUrls: ['./col-filter.component.scss']
})
export class ColFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onChange(val: string) {
    this.filterChange.emit(val)
  }

}
