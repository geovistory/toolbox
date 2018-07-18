import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItemApi, InfPersistentItem, IAppState } from 'app/core';

import { PeItDetail } from '../../../information.models';
import { NgForm } from '@angular/forms';
import { NgRedux } from '../../../../../../../node_modules/@angular-redux/store';



@Component({
  selector: 'gv-leaf-pe-it-view-modal',
  templateUrl: './leaf-pe-it-view-modal.component.html',
  styleUrls: ['./leaf-pe-it-view-modal.component.scss']
})
export class LeafPeItViewModalComponent implements OnInit {

  @Input() parentPath: string[];
  @Input() isInProject: boolean;
  @Input() peItState: PeItDetail;

  addButtonDisabled: boolean;
  peItToAdd: InfPersistentItem;

  constructor(
    public modal: NgbActiveModal,
    private peItApi: InfPersistentItemApi,
    private ngRedux: NgRedux<IAppState>;
  ) {
  }

  ngOnInit() {

  }


  formChange(form: NgForm) {
    this.addButtonDisabled = form.invalid;
    this.peItToAdd = form.value.peIt;
  }

  addAndOpen() {

    return this.peItApi.changePeItProjectRelation(
      this.ngRedux.getState().activeProject.pk_project,
      true,
      this.peItToAdd
    ).subscribe(peIts => {
      this.modal.close();
    })


  }

  open() {
    this.modal.close()
  }


}
