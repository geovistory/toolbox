import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItemApi } from 'app/core';

import { PeItDetail } from '../../../information.models';



@Component({
  selector: 'gv-pe-it-entity-preview-modal',
  templateUrl: './pe-it-entity-preview-modal.component.html',
  styleUrls: ['./pe-it-entity-preview-modal.component.scss']
})
export class PeItEntityPreviewModalComponent implements OnInit {

  @Input() parentPath: string[];
  @Input() isInProject:boolean;
  @Input() peItState:PeItDetail;

  constructor(
    public modal: NgbActiveModal,
    private peItApi:InfPersistentItemApi,
  ) {
  }

  ngOnInit() {

  }


  addAndOpen(){

    console.error('use the pe-it-add-form value to generate this kind of object')
    // this.peItApi.changePeItProjectRelation(
    //   this.activeProjectService.project.pk_project,
    //   true,
    //   StateToDataService.peItStateToPeItToRelate(this.peItState)
    // ).subscribe(peIts=>{
    //   this.modal.close();
    // })

  }

  open(){
    this.modal.close()
  }
}
