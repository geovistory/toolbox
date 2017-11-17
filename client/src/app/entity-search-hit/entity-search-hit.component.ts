import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';

@Component({
  selector: 'gv-entity-search-hit',
  templateUrl: './entity-search-hit.component.html',
  styleUrls: ['./entity-search-hit.component.scss']
})
export class EntitySearchHitComponent implements OnInit {

  @Input() persistentItem:any;

  /**
  * flag to indicate if this search hit is in the context of a project-wide
  * search or in a repository-wide search.
  *   false = project-wide
  *   true = repository-wide
  *   default = false
  */
  @Input() repositorySearch:boolean;

  @Output() onAdd: EventEmitter<number> = new EventEmitter();
  @Output() onOpen: EventEmitter<number> = new EventEmitter();

  standardAppellationLabel: AppellationLabel;
  moreAppellationLabels: Array<AppellationLabel> = [];

  get projectsCount():number {
    return this.persistentItem.projects.length
  }

  get isInProject():boolean {
    const projectId = this.activeProjectService.project.pk_project;
    if(this.persistentItem.projects.indexOf(projectId) !== -1){
      return true;
    }
    return false;
  }

  constructor(
    private activeProjectService: ActiveProjectService
  ) { }

  ngOnInit() {

    this.repositorySearch = this.repositorySearch === undefined ? false : this.repositorySearch;

    /** Set the standardAppellationLabel */
    if(this.repositorySearch){
      let highestCount = 0;
      let pk_standard_label;
      this.persistentItem.appellation_labels.forEach(label => {
        if(label.r63_is_standard_in_project_count > highestCount){
          highestCount = label.r63_is_standard_in_project_count;
          this.standardAppellationLabel = new AppellationLabel(
            label.appellation_label
          )
          pk_standard_label = label.pk_entity;
        }
      });


      /** Set the moreAppellationLabels */
      this.persistentItem.appellation_labels.forEach(label => {
        if(pk_standard_label !== label.pk_entity){
          this.moreAppellationLabels
          .push(new AppellationLabel(label.appellation_label))
        }
      });

    }
    else {
      this.persistentItem.appellation_labels.forEach(label => {
        if(label.r63_is_standard_in_project != true){
          this.moreAppellationLabels.push(new AppellationLabel(label.appellation_label))
        }
      });

      this.standardAppellationLabel = new AppellationLabel(
        this.persistentItem.standard_appellation_label
      )
    }



  }

  add(){
    this.onAdd.emit(this.persistentItem.pk_persistent_item)
  }

  open(){
    this.onOpen.emit(this.persistentItem.pk_persistent_item)
  }

  linkClicked(){
    if(this.isInProject){
      this.open();
    }
    else{
      this.add();
    }
  }

}
