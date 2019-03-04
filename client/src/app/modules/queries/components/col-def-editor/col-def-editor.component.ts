import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

export interface ColDefTreeData {
  label?: string
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
  @Input() selectedClasses$: Observable<number[]>;

  colDefs: ColDefTree[];
  constructor() {
    this.colDefs = [
      new ColDefTree({
        label: 'Entity Label'
      }),
      new ColDefTree({
        label: 'Class Label'
      }),
      new ColDefTree({
        label: 'Type Label'
      })
    ]
  }

  ngOnInit() {

  }

  drop(event: CdkDragDrop<ColDefTree[]>) {
    moveItemInArray(this.colDefs, event.previousIndex, event.currentIndex);
  }


  addColumn() {
    this.colDefs.push(new ColDefTree({
      label: 'New Column'
    }))
  }

  removeColumn(i) {
    this.colDefs.splice(i, 1)
  }

}
