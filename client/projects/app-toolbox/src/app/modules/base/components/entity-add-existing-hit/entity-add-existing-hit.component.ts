import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";

import { EntitySearchHit } from "@kleiolab/lib-sdk-lb4";

export interface HitPreview extends EntitySearchHit {
  btnDisabled?: boolean
  btnTooltip?: string
}


@Component({
  selector: 'gv-entity-add-existing-hit',
  templateUrl: './entity-add-existing-hit.component.html',
  styleUrls: ['./entity-add-existing-hit.component.scss']
})
export class EntityAddExistingHitComponent implements OnInit {

  @Input() hit: HitPreview;


  @Input() alreadyInProjectBtnText: string;
  @Input() notInProjectBtnText: string;



  /**
  * flag to indicate if this search hit is in the context of a project-wide
  * search or in a repository-wide search.
  *   false = project-wide
  *   true = repository-wide
  *   default = false
  */
  @Input() repositorySearch: boolean;

  @Output() onAdd: EventEmitter<number> = new EventEmitter();
  @Output() onOpen: EventEmitter<number> = new EventEmitter();
  @Output() onSelect: EventEmitter<number> = new EventEmitter();

  headlineItems: Array<string> = [];
  isInProject: boolean;

  projectsCount: number;

  entityPreview: WarEntityPreview;



  constructor() { }

  ngOnInit() {
    if (!this.alreadyInProjectBtnText) throw Error('please provide a alreadyInProjectBtnText')
    if (!this.notInProjectBtnText) throw Error('please provide a notInProjectBtnText')

    this.projectsCount = this.hit.projects ? this.hit.projects.length : undefined;

    if (this.hit.fk_project) {
      this.isInProject = true;
    } else {
      this.repositorySearch = true;
      this.isInProject = false;
    }

    this.entityPreview = {
      pk_entity: this.hit.pk_entity,
      fk_project: this.hit.fk_project,
      project: this.hit.project,
      fk_class: this.hit.fk_class,
      entity_label: this.hit.entity_label,
      entity_type: this.hit.entity_type,
      class_label: this.hit.class_label,
      type_label: this.hit.type_label,
      time_span: this.hit.time_span
    }
  }

  add() {
    this.onAdd.emit(this.hit.pk_entity)
  }

  open() {
    this.onOpen.emit(this.hit.pk_entity)
  }

  select() {
    this.onSelect.emit(this.hit.pk_entity)
  }


  linkClicked() {
    if (!this.repositorySearch) {
      if (this.isInProject) {
        this.open();
      } else {
        this.add();
      }
    }
  }

}