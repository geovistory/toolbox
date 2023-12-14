import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntitySearchHit, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { NgIf } from '@angular/common';
import { EntityPreviewComponent } from '../../../../shared/components/entity-preview/entity-preview.component';
import { PassiveLinkDirective } from '../../../../shared/directives/passive-link/passive-link.directive';
import { DndModule } from '@suez/ngx-dnd';


@Component({
    selector: 'gv-entity-search-hit',
    templateUrl: './entity-search-hit.component.html',
    styleUrls: ['./entity-search-hit.component.scss'],
    standalone: true,
    imports: [DndModule, PassiveLinkDirective, EntityPreviewComponent, NgIf]
})
export class EntitySearchHitComponent implements OnInit {

  @Input() hit: EntitySearchHit;

  /**
   * True if this is about selecting a pe-it as range of a statement
   */
  @Input() selectStatementRange: boolean;

  /**
  * flag to indicate if this search hit is in the context of a project-wide
  * search or in a repository-wide search.
  *   false = project-wide
  *   true = repository-wide
  *   default = false
  */
  @Input() repositorySearch: boolean;

  @Output() onAdd = new EventEmitter<number>();
  @Output() onOpen = new EventEmitter<number>();
  @Output() onOpenEntityPreview = new EventEmitter<WarEntityPreview>();
  @Output() onSelect = new EventEmitter<number>();

  headlineItems: Array<string> = [];
  isInProject: boolean;

  projectsCount: number;

  entityPreview: WarEntityPreview;



  constructor() { }

  ngOnInit() {
    this.projectsCount = this.hit.projects ? this.hit.projects.length : undefined;

    if (this.hit.project_id > 0) {
      this.isInProject = true;
    } else {
      this.repositorySearch = true;
      this.isInProject = false;
    }

    this.entityPreview = {
      pk_entity: this.hit.pk_entity,
      project_id: this.hit.project_id,
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
