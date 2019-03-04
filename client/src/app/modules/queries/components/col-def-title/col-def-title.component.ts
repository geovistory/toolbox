import { Component, OnInit, Input } from '@angular/core';
import { ColDefTree } from '../col-def-editor/col-def-editor.component';

@Component({
  selector: 'gv-col-def-title',
  templateUrl: './col-def-title.component.html',
  styleUrls: ['./col-def-title.component.scss']
})
export class ColDefTitleComponent implements OnInit {

  @Input() colDef: ColDefTree;

  constructor() { }

  ngOnInit() {
  }

}
