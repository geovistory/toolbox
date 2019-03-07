import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

export type ColDefPathSegmentType = 'properties' | 'classes';

export class ColDefPathSegment {

  type?: ColDefPathSegmentType
  classes?: number[];
  types?: number[];
  
  outgoingProperties?: number[]
  ingoingProperties?: number[]

  constructor(data: ColDefPathSegment) {
    Object.assign(this, data)
  }
}

export class ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  ofRootTable?: boolean;
  // If true, users cant edit this column
  isDefault?: string;

  colName?: string;

  label?: string

  queryPath?: ColDefPathSegment[]

  constructor(data: ColDef) {
    Object.assign(this, data)
  }

  addSegment?(segment: ColDefPathSegment) {
    this.queryPath.push(segment)
  }

  removeSegmentByIndex?(i: number) {
    this.queryPath.splice(i, (this.queryPath.length - 1))
  }
}


@Component({
  selector: 'gv-col-def-editor',
  templateUrl: './col-def-editor.component.html',
  styleUrls: ['./col-def-editor.component.scss']
})
export class ColDefEditorComponent implements OnInit {
  @Input() propertyOptions$: Observable<number[]>;
  @Input() colDefs: ColDef[];

  constructor() { }

  ngOnInit() {

  }

  drop(event: CdkDragDrop<ColDef[]>) {
    moveItemInArray(this.colDefs, event.previousIndex, event.currentIndex);
  }


  addColumn() {
    this.colDefs.push(new ColDef({
      label: 'New Column',
      queryPath: [
        new ColDefPathSegment({
          type: 'properties'
        })
      ]
    }))

  }

  removeColumn(i) {
    this.colDefs.splice(i, 1)
  }

}
