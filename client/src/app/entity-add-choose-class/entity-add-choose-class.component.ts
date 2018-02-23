import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { ClassService } from '../shared/services/class.service';
import { DfhClass } from '../shared/sdk/models/DfhClass';

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
    private classService: ClassService
  ) {
  }

  ngOnInit() {

    this.classService.getAll().subscribe((classes:DfhClass[]) => {
      this.classes = classes;
    });

    this.modalService.modalTitle = 'What do you want to add?'
    this.modalService.previousState = undefined;
  }

  selectClass(classKey: string) {
    this.modalService.selectedClass = classKey;
    this.setEntityModalState('search-existing');
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }
}
