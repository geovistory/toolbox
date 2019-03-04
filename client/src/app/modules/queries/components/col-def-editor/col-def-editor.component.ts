import { Component, OnInit } from '@angular/core';

export interface ColDefTreeData {
  
}
export class ColDefTree {

  constructor(public data: ColDefTreeData = {}, public children: ColDefTree[] = []) {

  }
}


@Component({
  selector: 'gv-col-def-editor',
  templateUrl: './col-def-editor.component.html',
  styleUrls: ['./col-def-editor.component.scss']
})
export class ColDefEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
