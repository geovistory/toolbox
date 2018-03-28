import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem, InfPersistentItemApi, ActiveProjectService } from 'app/core';


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
