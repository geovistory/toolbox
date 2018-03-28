import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfAppellation, InfAppellationApi, ActiveProjectService, EntityEditorService, InfEntityProjectRel } from 'app/core';
import { AppellationStdBool } from '../role/role.component';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';



@Component({
  selector: 'gv-pe-it-appellation',
  templateUrl: './pe-it-appellation.component.html',
  styleUrls: ['./pe-it-appellation.component.scss']
})
export class PeItAppellationComponent implements OnInit {


  /**
  * Inputs
  */
  @Input() appellation: InfAppellation;

  @Input() peItAppeState: string;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<InfAppellation> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfAppellation> = new EventEmitter();

  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();


  /**
  * Properties
  */

  appellationLabel: AppellationLabel = new AppellationLabel();

  appellationLabelInEdit: AppellationLabel;


  constructor(
    private appellationApi: InfAppellationApi,
    private activeProjectService: ActiveProjectService,
    public entityEditor: EntityEditorService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
  }

  ngOnInit() {
    if (this.appellation.appellation_label) {
      this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);
      this.appeChange.emit({
        appellation: this.appellation,
        isStandardInProject: false
      })
    }

    this.peItAppeState = this.peItAppeState ? this.peItAppeState : 'view';


    // if (this.peItAppeState === 'add-pe-it') {
    //
    //   // make a copy
    //   let appe = new InfAppellation(this.appellation);
    //
    //   // add an epr
    //   appe.entity_version_project_rels = [
    //     new InfEntityProjectRel({
    //       fk_project: this.activeProjectService.project.pk_project,
    //       is_in_project: true,
    //       fk_entity_version_concat: this.appellation.pk_entity_version_concat
    //     })
    //   ]
    //
    //   // emit it
    //   this.readyToAdd.emit(appe);
    // }

    // if (this.peItAppeState === 'add') {

    // make a copy
    let appe = new InfAppellation(this.appellation);

    // add an epr
    appe.entity_version_project_rels = [
      new InfEntityProjectRel({
        fk_project: this.activeProjectService.project.pk_project,
        fk_entity_version_concat: this.appellation.pk_entity_version_concat
      })
    ]

    // emit it
    this.readyToAdd.emit(appe);
    // }

  }


  // startEdit() {
  //   this.peItAppeState = 'edit'
  //
  //   this.appellationLabelInEdit = new AppellationLabel(this.appellationLabel);
  //
  // }


  onCancel() {
    this.cancelEdit.emit()
  }

  save(appeLabel: AppellationLabel) {
    this.startLoading();

    this.appellationApi.findOrCreateAppellation(
      this.activeProjectService.project.pk_project,
      {
        pk_entity: this.appellation.pk_entity,
        fk_class: this.appellation.fk_class,
        appellation_label: appeLabel
      }
    ).subscribe(appellations => {
      this.completeLoading();

      this.appellation = new InfAppellation(appellations[0])
      this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);

      this.appeChange.emit({
        appellation: this.appellation,
        isStandardInProject: false
      })

    })
    this.cancelEdit.emit()

  }

  create(appeLabel: AppellationLabel) {
    console.log(appeLabel);
  }



  /**
  * Methods specific to create state
  */

  emitReadyToCreate(appellationLabel: AppellationLabel) {

    this.appellation.appellation_label = appellationLabel;

    this.readyToCreate.emit(this.appellation)

  }

  emitNotReadyToCreate() {

    this.notReadyToCreate.emit()

  }

  /**
  * Methods specific to add state
  */




  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }

}
