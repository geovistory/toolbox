import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { PeItComponent, PeItStates } from '../pe-it/pe-it.component';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { PropertyPipe } from '../shared/pipes/property';
import { Appellation } from '../shared/sdk/models/Appellation';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';
import { ActivePeItService } from '../shared/services/active-pe-it.service';
import { PeItService } from '../shared/services/pe-it.service'
import { Property } from '../shared/services/property.service';
import { ClassService } from '../shared/services/class.service';
import { KeyboardService } from '../shared/services/keyboard.service';
import { PersistentItemVersionApi } from '../shared/sdk/services/custom/PersistentItemVersion';
import { AppellationStdBool } from '../role/role.component';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';

@Component({
  selector: 'gv-pe-it-entity',
  templateUrl: './pe-it-entity.component.html',
  styleUrls: ['./pe-it-entity.component.scss']
})
export class PeItEntityComponent implements OnInit {

  /**
  * Inputs
  */

  // Primary key of the peIt
  @Input() pkEntity: number;

  // State of this component
  @Input() peItEntityState: string;

  // FkClass of peIt
  @Input() fkClass: string;

  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<PersistentItemVersion> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() created: EventEmitter<PersistentItemVersion> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<PersistentItemVersion> = new EventEmitter;

  /**
  * Properties
  */

  // id of the active project
  pkProject: number;

  // Flag if some async process is running
  loading: boolean;

  // Persistent Item used by this component
  peIt: PersistentItemVersion;

  // Persistent Item to be created
  peItToCreate: PersistentItemVersion;

  // Persistent Item to be added
  peItToAdd: PersistentItemVersion;

  // Displayed standard name of this peIt
  stdAppeString: string;

  // array of properies of which the class of this peIt is range.
  outgoingProperties: Property[];

  // array of properies of which the class of this peIt is domain.
  ingoingProperties: Property[];

  //
  loadingProperties: boolean

  // true, when the peIt is ready to be created
  isReadyToCreate: boolean;

  //this components
  thisComponent = this;

  // true when the user clicks on add Information
  addingInformation: boolean;

  constructor(
    private peItApi: PersistentItemVersionApi,
    private peItService: PeItService,
    private activeProjectService: ActiveProjectService,
    private propertyPipe: PropertyPipe,
    private activePeItService: ActivePeItService,
    private slimLoadingBarService: SlimLoadingBarService,
    private classService: ClassService,
    public keyboard: KeyboardService,
    private changeDetector: ChangeDetectorRef
  ) {
  }


  /**
  * Methods
  */

  ngOnInit() {

    this.pkProject = this.activeProjectService.project.pk_project;

    // if no state provided on input, default to edit

    this.peItEntityState = this.peItEntityState ? this.peItEntityState : PeItStates.edit;

    // if it is not create state

    if (["preview", "edit", "viewCommunity"].indexOf(this.peItEntityState) !== -1) {

      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfProject()

    }

    if (this.peItEntityState == "add-pe-it") {

      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObjectOfRepo().subscribe(() => {

        // make a copy
        this.peItToAdd = new PersistentItemVersion(this.peIt);

        // add an epr
        this.peItToAdd.entity_version_project_rels = [
          new EntityVersionProjectRel({
            fk_project: this.activeProjectService.project.pk_project,
            is_in_project: true,
            fk_entity_version_concat: this.peIt.pk_entity_version_concat
          })
        ]

      })

    }


    else if (this.peItEntityState == "create") {

      // initialize the ingoing Properties
      this.ingoingProperties = this.classService
        .getIngoingProperties(this.fkClass);

      // initialize the outgoing Properties
      this.outgoingProperties = this.classService
        .getOutgoingProperties(this.fkClass);

      this.peItToCreate = new PersistentItemVersion();
      this.peItToCreate.fk_class = this.fkClass;

    }



  }

  queryRichObjectOfRepo() {

    const onDone = new EventEmitter()

    this.startLoading();

    this.peItApi.nestedObjectOfRepo(this.pkEntity).subscribe(
      (peIts: PersistentItemVersion[]) => {

        this.peIt = peIts[0];

        // initialize the ingoing Properties
        this.ingoingProperties = this.classService
          .getIngoingProperties(this.peIt.fk_class);

        // initialize the outgoing Properties
        this.outgoingProperties = this.classService
          .getOutgoingProperties(this.peIt.fk_class);


        this.completeLoading();

        onDone.emit();

      });

    return onDone;

  }

  queryRichObjectOfProject() {
    this.startLoading();

    this.peItApi.nestedObjectOfProject(this.pkProject, this.pkEntity).subscribe(
      (peIts: PersistentItemVersion[]) => {

        this.peIt = peIts[0];

        // initialize the ingoing Properties
        this.ingoingProperties = this.classService
          .getIngoingProperties(this.peIt.fk_class);

        // initialize the outgoing Properties
        this.outgoingProperties = this.classService
          .getOutgoingProperties(this.peIt.fk_class);


        this.completeLoading();

      });

  }



  /**
   * Methods for creating a peIt
   */

  emitReadyToCreate(roles: InformationRole[]) {
    this.peItToCreate.pi_roles = roles; //TODO this is not good because it overwrites roles coming form another property!
    this.isReadyToCreate = true
    this.readyToCreate.emit(this.peItToCreate)
  }


  emitNotReadyToCreate() {
    this.isReadyToCreate = false
    this.notReadyToCreate.emit()
  }



  /**
  * Methods for adding a peIt
  */

  onRolesReadyToAdd(rolesToAdd: InformationRole[]) {


    let newRoles = [];

    // For each role coming in from property component
    rolesToAdd.forEach(roleToAdd => {

      let exists = false;

      for (let i = 0; i < this.peItToAdd.pi_roles.length; i++) {

        // Check if the role is allready in the teEntToAdd
        if (this.peItToAdd.pi_roles[i].pk_entity === roleToAdd.pk_entity) {

          // if yes replace it with the new one
          this.peItToAdd.pi_roles[i] = roleToAdd;
          exists = true;
        }
      }

      // else add it to a temporary array
      if (!exists) {
        newRoles.push(roleToAdd);
      }

    })
    // add all the new roles to teEntToAdd
    this.peItToAdd.pi_roles.concat(newRoles);

    this.readyToAdd.emit(this.peItToAdd);
  }


  /**
   * Methods for event bubbeling
   */

  whenAppeChange(appeStd: AppellationStdBool) {
    if (appeStd.isStandardInProject) {
      const label = new AppellationLabel(appeStd.appellation.appellation_label);
      this.stdAppeString = label.getString();
      this.changeDetector.detectChanges()
    }
  }

  startAddingInformation() {
    this.addingInformation = true;
  }

  stopAddingInformation() {
    this.addingInformation = false;
  }

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.loading = true;
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.loading = false;
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }



}
