import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityPreview, IAppState } from 'app/core';
import { EntitySearchHit } from 'app/shared/components/list/api/list.models';

@Component({
  selector: 'gv-entity-search-hit',
  templateUrl: './entity-search-hit.component.html',
  styleUrls: ['./entity-search-hit.component.scss']
})
export class EntitySearchHitComponent implements OnInit {

  @Input() hit: EntitySearchHit;

  /**
   * True if this is about selecting a pe-it as range of a role
   */
  @Input() selectRoleRange: boolean;

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
  @Output() onOpenEntityPreview: EventEmitter<EntityPreview> = new EventEmitter();
  @Output() onSelect: EventEmitter<number> = new EventEmitter();

  headlineItems: Array<string> = [];
  isInProject: boolean;

  projectsCount: number;

  entityPreview: EntityPreview;



  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
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
    this.onOpenEntityPreview.emit(this.entityPreview)
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