import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OntomeProfilesListComponent } from '../ontome-profiles-list/ontome-profiles-list.component';


export interface OntomeProfilesListDialogData {
}

@Component({
    selector: 'gv-ontome-profiles-list-dialog',
    templateUrl: './ontome-profiles-list-dialog.component.html',
    styleUrls: ['./ontome-profiles-list-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, OntomeProfilesListComponent, MatButtonModule]
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
