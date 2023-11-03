import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface OntomeProfilesListDialogData {
}

@Component({
  selector: 'gv-ontome-profiles-list-dialog',
  templateUrl: './ontome-profiles-list-dialog.component.html',
  styleUrls: ['./ontome-profiles-list-dialog.component.scss']
})
export class OntomeProfilesListDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OntomeProfilesListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OntomeProfilesListDialogData
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
