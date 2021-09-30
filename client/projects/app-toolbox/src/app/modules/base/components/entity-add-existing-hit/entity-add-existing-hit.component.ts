import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntitySearchHit, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';


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
  @Input() moreDetails: boolean;
  /**
  * flag to indicate if this search hit is in the context of a project-wide
  * search or in a repository-wide search.
  *   false = project-wide
  *   true = repository-wide
  *   default = false
  */
  @Input() repositorySearch: boolean;
  @Input() selected: boolean;
  @Output() onMore: EventEmitter<HitPreview> = new EventEmitter();

  headlineItems: Array<string> = [];
  isInProject: boolean;

  projectsCount: number;

  entityPreview: WarEntityPreview;



  constructor() { }

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
      project: this.hit.project,
      fk_class: this.hit.fk_class,
      entity_label: this.hit.entity_label,
      entity_type: this.hit.entity_type,
      class_label: this.hit.class_label,
      type_label: this.hit.type_label,
      time_span: this.hit.time_span
    }
  }

  more() {
    this.onMore.emit(this.hit)
  }

}
