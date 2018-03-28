import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DfhClass } from 'app/core';
import { ClassService } from '../../shared/class.service';
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

  selectClass(cla: DfhClass) {
    this.modalService.selectedClass = cla;
    this.setEntityModalState('search-existing');
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }
}
