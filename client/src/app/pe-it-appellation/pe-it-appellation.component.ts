import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { KeyboardService } from '../shared/services/keyboard.service';
import { AppellationApi } from '../shared/sdk/services/custom/Appellation';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EntitiesToCreate } from '../shared/interfaces/entities-to-create';


@Component({
  selector: 'gv-pe-it-appellation',
  templateUrl: './pe-it-appellation.component.html',
  styleUrls: ['./pe-it-appellation.component.scss']
})
export class PeItAppellationComponent implements OnInit {


  /**
  * Inputs
  */
  @Input() appellation:Appellation;

  @Input() peItAppeState:string;


  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<EntitiesToCreate> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;


  /**
  * Properties
  */

  appellationLabel:AppellationLabel = new AppellationLabel();

  appellationLabelInEdit:AppellationLabel;


  constructor(
    private appellationApi: AppellationApi,
    private activeProjectService: ActiveProjectService,
    public keyboard:KeyboardService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
  }

  ngOnInit() {
    if(this.appellation.appellation_label){
      this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);
    }

    this.peItAppeState = this.peItAppeState ? this.peItAppeState : 'view';

  }


  startEdit(){
    this.peItAppeState = 'edit'

    this.appellationLabelInEdit = new AppellationLabel(this.appellationLabel);

    console.log(this.peItAppeState)
  }


  cancelEdit(){
    this.peItAppeState = 'view'
  }

  save(appeLabel:AppellationLabel){
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

      this.appellation = new Appellation(appellations[0])

    })
    this.cancelEdit()

  }

  create(appeLabel:AppellationLabel){
    console.log(appeLabel);
  }



  /**
  * Methods specific to create state
  */

  emitReadyToCreate(appellationLabel:AppellationLabel){

    this.appellation.appellation_label = appellationLabel;

    this.readyToCreate.emit(this.appellation)

  }

  emitNotReadyToCreate(){

    this.notReadyToCreate.emit()

  }




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
