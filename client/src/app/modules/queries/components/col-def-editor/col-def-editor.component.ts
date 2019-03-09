import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

export type QueryPathSegmentType = 'properties' | 'classes';

export class QueryPathSegment {

  type?: QueryPathSegmentType

  data?: {

    // for entities table
    classes?: number[];
    types?: number[];

    // for role table
    outgoingProperties?: number[]
    ingoingProperties?: number[]

  }

  constructor(data: QueryPathSegment) {
    Object.assign(this, data)
  }
}

export class ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  ofRootTable?: boolean;
  // If true, users cant edit this column
  defaultType?: 'entity_preview' | 'entity_label'| 'class_label' |'type_label';

  colName?: string;

  label?: string

  queryPath?: QueryPathSegment[]

  constructor(data: ColDef) {
    Object.assign(this, data)
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
        new QueryPathSegment({
          type: 'properties'
        })
      ]
    }))

  }

  removeColumn(i) {
    this.colDefs.splice(i, 1)
  }

}
