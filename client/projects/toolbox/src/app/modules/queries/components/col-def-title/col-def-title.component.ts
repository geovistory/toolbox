import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'projects/toolbox/src/app/core/sdk-lb4/model/models';

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
