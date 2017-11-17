import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';

// TODO: replace this fake data with search result from database
const classes = [
  {
    'label': 'Person',
    'crmKey': 'E21',
    'description': 'This class comprises real persons who live or are assumed to have lived.',
    'dataForHistoryId': 21
  },
  {
    'label': '[Place]',
    'crmKey': 'E53',
    'description': 'Places are usually determined by reference to the position of “immobile” objects such as buildings, cities, mountains, rivers, or dedicated geodetic marks.',
    'dataForHistoryId': 53
  },
  {
    'label': '[Group]',
    'crmKey': 'E74',
    'description':'This class comprises any gatherings or organizations of Actors that act collectively or in a similar way due to any form of unifying relationship.',
    'dataForHistoryId': 74
  }
]

@Component({
  selector: 'gv-entity-add-choose-class',
  templateUrl: './entity-add-choose-class.component.html',
  styleUrls: ['./entity-add-choose-class.component.scss']
})
export class EntityAddChooseClassComponent implements OnInit {

  // TODO: replace this fake data with search result from database
  classes = classes;

  constructor(
    private modalService:EntityAddModalService
  ) { }

  ngOnInit() {
    this.modalService.modalTitle = 'What do you want to add?'
  }

  selectClass(classKey:string){
    this.modalService.selectedClass = classKey;
    this.setEntityModalState('search-existing');
  }

  setEntityModalState(newState:string){
    this.modalService.state = newState;
  }
}
