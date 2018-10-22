import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService, IAppState } from 'app/core';
import { MentionedEntity } from 'app/modules/annotation';
import { AppellationLabel } from '../../shared/appellation-label';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'gv-entity-search-hit',
  templateUrl: './entity-search-hit.component.html',
  styleUrls: ['./entity-search-hit.component.scss']
})
export class EntitySearchHitComponent implements OnInit {

  @Input() persistentItem: any;

  @Input() selectingMentionedEntities: boolean;


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

  get projectsCount(): number {
    return this.persistentItem.projects.length
  }

  get isInProject(): boolean {
    const projectId = this.ngRedux.getState().activeProject.pk_project;
    if (this.persistentItem.projects.indexOf(projectId) !== -1) {
      return true;
    }
    return false;
  }

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {

    if (this.persistentItem.ts_headline) {
      this.headlineItems = this.persistentItem.ts_headline.split(' • ');
    }

    this.repositorySearch = this.repositorySearch === undefined ? false : this.repositorySearch;

    /** Set the standardAppellationLabel */
    if (this.repositorySearch) {
      // let highestCount = 0;
      // let pk_standard_label;
      this.persistentItem.appellation_labels.forEach(label => {
        if (label.rank_for_pe_it == 1) {
          // highestCount = label.r63_is_standard_in_project_count;
          this.standardAppellationLabel = new AppellationLabel(
            label.appellation_label
          )
          // pk_standard_label = label.pk_entity;
        } else {
          this.moreAppellationLabels
            .push(new AppellationLabel(label.appellation_label))
        }

      });


      // /** Set the moreAppellationLabels */
      // this.persistentItem.appellation_labels.forEach(label => {
      //   if (pk_standard_label !== label.pk_entity) {
      //     this.moreAppellationLabels
      //       .push(new AppellationLabel(label.appellation_label))
      //   }
      // });

    } else {
      this.persistentItem.appellation_labels.forEach(label => {
        if (label.r63_is_standard_in_project != true) {
          this.moreAppellationLabels.push(new AppellationLabel(label.appellation_label))
        } else if (label.r63_is_standard_in_project == true) {
          this.standardAppellationLabel = new AppellationLabel(label.appellation_label)
        }
      });

      // If there is no standard appellation label defined, take the first one
      if (!this.standardAppellationLabel) {
        this.standardAppellationLabel = this.moreAppellationLabels[0];
      }
    }

  }

  add() {
    this.onAdd.emit(this.persistentItem.pk_entity)
  }

  open() {
    this.onOpen.emit(this.persistentItem.pk_entity)
  }

  select() {
    this.onSelect.emit(this.persistentItem.pk_entity)
  }

  selectAsMentioned() {
    const mentionedEntity = {
      label: this.standardAppellationLabel.getString(),
      pkEntity: this.persistentItem.pk_entity
    } as MentionedEntity
    this.onSelectAsMentioned.emit(mentionedEntity)
  }


  linkClicked() {
    if (this.isInProject) {
      this.open();
    }
    else {
      this.add();
    }
  }

}
