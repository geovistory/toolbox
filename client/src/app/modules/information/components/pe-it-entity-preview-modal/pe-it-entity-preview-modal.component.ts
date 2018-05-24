import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem, InfPersistentItemApi, ActiveProjectService } from 'app/core';
import { StateToDataService } from '../../shared/state-to-data.service';
import { IPeItState } from '../../containers/pe-it/pe-it.model';


@Component({
  selector: 'gv-pe-it-entity-preview-modal',
  templateUrl: './pe-it-entity-preview-modal.component.html',
  styleUrls: ['./pe-it-entity-preview-modal.component.scss']
})
export class PeItEntityPreviewModalComponent implements OnInit {

  @Input() parentPath: string[];
  @Input() isInProject:boolean;
  @Input() peItState:IPeItState;

  constructor(
    public modal: NgbActiveModal,
    private peItApi:InfPersistentItemApi,
    private activeProjectService:ActiveProjectService
  ) {
  }

  ngOnInit() {

  }


  addAndOpen(){
    this.peItApi.changePeItProjectRelation(
      this.activeProjectService.project.pk_project,
      true,
      StateToDataService.peItStateToPeItToRelate(this.peItState)
    ).subscribe(peIts=>{
      this.modal.close();
    })

  }

  open(){
    this.modal.close()
  }
}
