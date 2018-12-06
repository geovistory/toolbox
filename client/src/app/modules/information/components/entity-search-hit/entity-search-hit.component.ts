import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataUnitPreview, IAppState } from 'app/core';
import { MentionedEntity } from 'app/modules/annotation';
import { AppellationLabel } from '../../shared/appellation-label';
import { DataUnitSearchHit } from '../../containers/information/api/information.models';

@Component({
  selector: 'gv-entity-search-hit',
  templateUrl: './entity-search-hit.component.html',
  styleUrls: ['./entity-search-hit.component.scss']
})
export class EntitySearchHitComponent implements OnInit {

  @Input() dataUnitSearchHit: DataUnitSearchHit;

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
  @Output() onSelect: EventEmitter<number> = new EventEmitter();
  @Output() onSelectAsMentioned: EventEmitter<MentionedEntity> = new EventEmitter();


  standardAppellationLabel: AppellationLabel;
  moreAppellationLabels: Array<AppellationLabel> = [];

  headlineItems: Array<string> = [];
  isInProject: boolean;

  get projectsCount(): number {
    return 99
  }

  dataUnitPreview: DataUnitPreview;



  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {

    if (this.dataUnitSearchHit.fk_project) {
      this.isInProject = true;
      this.repositorySearch = false;
    } else {
      this.repositorySearch = true;
      this.isInProject = false;
    }

    this.dataUnitPreview = {
      pk_entity: this.dataUnitSearchHit.pk_entity,
      fk_project: this.dataUnitSearchHit.fk_project,
      fk_class: this.dataUnitSearchHit.fk_class,
      entity_label: this.dataUnitSearchHit.entity_label,
      entity_type: this.dataUnitSearchHit.entity_type,
      class_label: this.dataUnitSearchHit.class_label,
      type_label: this.dataUnitSearchHit.type_label,
      time_span: this.dataUnitSearchHit.time_span
    }
  }

  add() {
    this.onAdd.emit(this.dataUnitSearchHit.pk_entity)
  }

  open() {
    this.onOpen.emit(this.dataUnitSearchHit.pk_entity)
  }

  select() {
    this.onSelect.emit(this.dataUnitSearchHit.pk_entity)
  }


  linkClicked() {
    if (this.isInProject) {
      this.open();
    } else {
      this.add();
    }
  }

}
