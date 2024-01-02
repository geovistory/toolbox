import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from "@kleiolab/lib-sdk-lb4";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'gv-col-def-title',
    templateUrl: './col-def-title.component.html',
    styleUrls: ['./col-def-title.component.scss'],
    standalone: true,
    imports: [MatIconModule]
})
export class ColDefTitleComponent implements OnInit {

  @Input() colDef: ColDef;

  constructor() { }

  ngOnInit() {
  }

}
