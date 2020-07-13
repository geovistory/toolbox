import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from '../../../../../../../server/src/lb3/common/interfaces';

@Component({
  selector: 'gv-col-def-title',
  templateUrl: './col-def-title.component.html',
  styleUrls: ['./col-def-title.component.scss']
})
export class ColDefTitleComponent implements OnInit {

  @Input() colDef: ColDef;

  constructor() { }

  ngOnInit() {
  }

}
