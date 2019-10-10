import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateOrAddEntityEvent, ClassAndTypePk, NotInProjectClickBehavior } from '../../containers/create-or-add-entity/create-or-add-entity.component';

export interface AddOrCreateEntityModalData {
  classAndTypePk: ClassAndTypePk;
  pkUiContext: number;
  alreadyInProjectBtnText: string
  notInProjectBtnText: string
  notInProjectClickBehavior: NotInProjectClickBehavior
}


@Component({
  selector: 'gv-add-or-create-entity-modal',
  templateUrl: './add-or-create-entity-modal.component.html',
  styleUrls: ['./add-or-create-entity-modal.component.css']
})
export class AddOrCreateEntityModal implements OnDestroy {
  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<AddOrCreateEntityModal, CreateOrAddEntityEvent>,
    @Inject(MAT_DIALOG_DATA) public data: AddOrCreateEntityModalData
  ) { }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCreateOrAdd(res) {
    this.dialogRef.close(res);
  }

  closeAddForm() {
    this.dialogRef.close();
  }
}
