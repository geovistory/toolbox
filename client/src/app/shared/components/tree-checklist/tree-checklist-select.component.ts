import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';

class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}

@Component({
  selector: 'gv-tree-checklist-select',
  templateUrl: './tree-checklist-select.component.html',
  styleUrls: ['./tree-checklist-select.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: TreeChecklistSelectComponent}],
})
export class TreeChecklistSelectComponent implements MatFormFieldControl<MyTel>, OnInit {

  constructor() { }

  ngOnInit() {
  }

}
