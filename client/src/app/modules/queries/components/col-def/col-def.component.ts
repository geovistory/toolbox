import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColDef } from '../col-def-editor/col-def-editor.component';
import { Observable } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { FormBuilder, FormControl } from '@angular/forms';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'gv-col-def',
  templateUrl: './col-def.component.html',
  styleUrls: ['./col-def.component.scss']
})
export class ColDefComponent implements OnInit {
  @Input() propertyOptions$: Observable<number[]>;
  @Input() colDef: ColDef;

  queryPathFormControl = new FormControl();

  treeControl
  treeFlattener
  dataSource

  constructor() {
  }

  ngOnInit() {
    this.queryPathFormControl.setValue(this.colDef.queryPath);
  }

}
