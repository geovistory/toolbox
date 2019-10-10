import { NgRedux, ObservableStore } from '@angular-redux/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAppState } from 'app/core';
import { LeafPeItViewAPIActions } from './api/leaf-pe-it-view.actions';
import { LeafPeItView } from './api/leaf-pe-it-view.models';
import { leafPeItViewReducer } from './api/leaf-pe-it-view.reducer';
import { ClassAndTypePk } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.componen';

export interface CreateEntityModalData {
  classAndTypePk: ClassAndTypePk,
  pkUiContext: number
}

@Component({
  selector: 'gv-create-entity-modal',
  templateUrl: './create-entity-modal.component.html',
  styleUrls: ['./create-entity-modal.component.scss']
})
export class CreateEntityModalComponent implements OnInit {

  substore: ObservableStore<LeafPeItView>

  basePath = ['activeProject', 'create-entity-modal']

  constructor(public dialogRef: MatDialogRef<CreateEntityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateEntityModalData,
    private actions: LeafPeItViewAPIActions,
    private ngRedux: NgRedux<IAppState>
  ) {

    this.substore = this.ngRedux.configureSubStore(this.basePath, leafPeItViewReducer)

  }

  ngOnInit() {
    this.substore.dispatch(this.actions.openModal(this.data))
  }

  ok(pkEntity: number) {
    this.dialogRef.close(pkEntity);
  }

  cancel() {
    this.dialogRef.close();
  }

}
