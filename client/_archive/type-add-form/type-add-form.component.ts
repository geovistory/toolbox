import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TypeAddFormData {
  basePath: string[];
}


@Component({
  selector: 'gv-type-add-form',
  templateUrl: './type-add-form.component.html',
  styleUrls: ['./type-add-form.component.css']
})
export class TypeAddFormComponent implements OnInit, OnDestroy {
  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // path to the substore
  basePath;



  constructor(
    public dialogRef: MatDialogRef<TypeAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeAddFormData
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
