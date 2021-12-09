import { Component, OnInit } from '@angular/core';


export interface AddEntityOrValueDialogData {
  pkClass: number;
}



@Component({
  selector: 'gv-add-entity-or-value-dialog',
  templateUrl: './add-entity-or-value-dialog.component.html',
  styleUrls: ['./add-entity-or-value-dialog.component.scss']
})
export class AddEntityOrValueDialogComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

}
