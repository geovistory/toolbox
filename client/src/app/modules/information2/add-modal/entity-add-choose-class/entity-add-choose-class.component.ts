import { Component, OnInit } from '@angular/core';
import { DfhClass, DfhClassApi } from 'app/core';

import { EntityAddModalService } from '../../shared/entity-add-modal.service';


@Component({
  selector: 'gv-entity-add-choose-class',
  templateUrl: './entity-add-choose-class.component.html',
  styleUrls: ['./entity-add-choose-class.component.scss']
})
export class EntityAddChooseClassComponent implements OnInit {

  // TODO: replace this fake data with search result from database
  classes: DfhClass[];

  constructor(
    private modalService: EntityAddModalService,
    private classApi: DfhClassApi 
  ) {
  }

  ngOnInit() {

    const profileId = 4; // Geovistory Basic Profile
    
    this.classApi.selectedPeItClassesOfProfile(profileId).subscribe((classes:DfhClass[]) => {
      this.classes = classes;
    });

    this.modalService.modalTitle = 'What do you want to add?'
    this.modalService.previousState = undefined;
  }

  selectClass(cla: DfhClass) {
    this.modalService.selectedClass = cla;
    this.setEntityModalState('search-existing');
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }
}
