import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from "@kleiolab/lib-sdk-lb4";

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
