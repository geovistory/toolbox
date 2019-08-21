import { Component, Inject, OnInit } from '@angular/core';
import { SysConfig, IAppState } from 'app/core';
import { WithSubStore, NgRedux, ObservableStore } from '../../../../../../../node_modules/@angular-redux/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../node_modules/@angular/material';
import { ClassAndTypePk } from '../../../../information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { LeafPeItViewAPIActions } from '../../../value/leaf-pe-it-view/api/leaf-pe-it-view.actions';
import { leafPeItViewReducer } from '../../../value/leaf-pe-it-view/api/leaf-pe-it-view.reducer';
import { LeafPeItView } from '../../../value/leaf-pe-it-view/api/leaf-pe-it-view.models';

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
