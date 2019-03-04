import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColDefTree } from '../col-def-editor/col-def-editor.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-col-def',
  templateUrl: './col-def.component.html',
  styleUrls: ['./col-def.component.scss']
})
export class ColDefComponent implements OnInit {
  @Input() selectedClasses$: Observable<number[]>;
  @Input() colDef: ColDefTree;

  constructor() { }

  ngOnInit() {
  }

}
