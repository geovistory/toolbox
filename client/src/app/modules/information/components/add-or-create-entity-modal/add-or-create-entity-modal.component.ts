import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AddOrCreateEntityModalData {
  basePath: string[];
}


@Component({
  selector: 'gv-add-or-create-entity-modal',
  templateUrl: './add-or-create-entity-modal.component.html',
  styleUrls: ['./add-or-create-entity-modal.component.css']
})
export class AddOrCreateEntityModal implements OnInit, OnDestroy {
  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // path to the substore
  basePath;



  constructor(
    public dialogRef: MatDialogRef<AddOrCreateEntityModal>,
    @Inject(MAT_DIALOG_DATA) public data: AddOrCreateEntityModalData
  ) { }


  ngOnInit() {
    this.basePath = this.data.basePath;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  added(res) {
    this.dialogRef.close(res);
  }

  closeAddForm() {
    this.dialogRef.close();
  }
}
