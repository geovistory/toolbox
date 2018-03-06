import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { ActiveProjectService } from '../shared/services/active-project.service';

@Component({
  selector: 'gv-pe-it-entity-preview-modal',
  templateUrl: './pe-it-entity-preview-modal.component.html',
  styleUrls: ['./pe-it-entity-preview-modal.component.scss']
})
export class PeItEntityPreviewModalComponent implements OnInit {

  @Input() stdAppe: string;
  @Input() pkEntity: number;
  @Input() isInProject:boolean;

  isReadyToAdd: boolean;
  peIt:InfPersistentItem;
  peItToAdd:InfPersistentItem;

  constructor(
    public modal: NgbActiveModal,
    private peItApi:InfPersistentItemApi,
    private activeProjectService:ActiveProjectService
  ) {
  }

  ngOnInit() {

  }

  onPeItReadyToAdd(peIt:InfPersistentItem) {
    this.peItToAdd = peIt;
    this.isReadyToAdd = true;
  }

  addAndOpen(){
    this.peItApi.changePeItProjectRelation(
      this.activeProjectService.project.pk_project,
      true,
      this.peItToAdd
    ).subscribe(peIts=>{
      this.modal.close();
    })

  }

  open(){
    this.modal.close()
  }
}
