import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationApi } from '../shared/sdk/services/custom/Appellation';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';
import { EntityProjectRel } from '../shared/sdk/models/EntityProjectRel';
import { EntityProjectRelApi } from '../shared/sdk/services/custom/EntityProjectRel';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';

export const namePartTypes = [
  {
    'id': 1,
    'label': 'First Name'
  },
  {
    'id': 2,
    'label': 'Last Name'
  },
  {
    'id': 3,
    'label': 'Dynastic Number'
  },
  {
    'id': 4,
    'label': 'Other'
  }
];


@Component({
  selector: 'gv-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*'
      })),
      state('collapsed', style({
        height: '0px'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out')),
      transition('collapsed => expanded', animate('400ms ease-in-out'))
    ])
  ]
})
export class NameComponent implements OnInit{
  namePartTypes = namePartTypes;

  @Output() standardNameChange: EventEmitter<NameComponent> = new EventEmitter();

  entityEditorState = new EntityEditorState();

  @Input() set state(value:string){
    this.entityEditorState.state = value;
  };

  get state():string{
    return this.entityEditorState.state;
  }


  /*** Data ***/
  @Input() name: InformationRole;

  // On state 'add' set true to check is_standard_in_project
  @Input() isStandardOnAdd: boolean = false;

  // Entity Project Relation
  entityProjectRel: EntityProjectRel;

  // Appellation Usage
  appellationUsage: TemporalEntity; // F52_Name_Use_Activity

  // TemporalEntity --> Role --> Appellation
  roleR64: InformationRole; // R64_used_name
  appellation: Appellation; // E41_Appellation
  appellationLabel:AppellationLabel; // appellation.appellation_label

  // TemporalEntity --> Role --> PersistentItem
  roleR61: InformationRole; // R61_occured_in_kind_of_context
  language: InformationLanguage; // E56_Language


  /*** App logic ***/
  editingAppellation:boolean = false;
  editingLanguage:boolean = false;
  cardBodyState:string='collapsed';

  changeStandardLoading:boolean = false;
  changeIsInProjectLoading:boolean = false;



  /*** App logic ***/


  get inProject():boolean {
    return this.entityProjectRel.is_in_project;
  }

  set inProject(value:boolean) {

    // Change the value
    this.entityProjectRel.is_in_project = value;

    if(this.state ==='add' || this.state === 'nameAdd'){
      // Emit the change
      this.emitEprChange();
    }
    else{
      // Save the changes
      this.startLoading();
      this.changeIsInProjectLoading = true;
      this.entityProjectRelApi.patchAttributes(
        this.entityProjectRel.pk_entity_project_rel,
        this.entityProjectRel
      ).subscribe(success => {
        this.completeLoading();
        this.changeIsInProjectLoading = false;
      })
    }

  }

  @Output() inProjectChange = new EventEmitter();

  // Visibility Logic

  get inProjectVisible() {
    if (this.state === 'add') return true;
    if (this.state === 'nameAdd') return true;
    if (this.state === 'communityDataView') return true;

    return false;
  }

  get standardInProjectVisible() {
    if (this.state === 'edit') return true;
    if (this.state === 'add') return true;

    if (this.state === 'communityDataView' && this.entityProjectRel.is_in_project) return true;

    return false;
  }

  get editBtnVisible (){
    if (this.state === 'edit') return true;

    return false;
  }

  get communityStatisticsVisible (){
    if (this.state === 'add') return true;

    if (this.state === 'communityDataView') return true;

    return false;
  }

  // Community statistics Logic

  get isInProjectCount():number{
    return this.name.entity_project_rels.filter(epr => epr.is_in_project).length;
  }

  get isStandardInProjectCount():number{
    return this.name.entity_project_rels.filter(epr => epr.is_standard_in_project).length;
  }


  constructor(
    private appellationApi: AppellationApi,
    private entityProjectRelApi:EntityProjectRelApi,
    private activeProjectService: ActiveProjectService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {

  }

  ngOnInit(){
    // Entity Project Relation
    if( this.state === 'add'){
    this.entityProjectRel = new EntityProjectRel({
      fk_entity: this.name.pk_entity,
      fk_project: this.activeProjectService.project.pk_project,
      is_in_project: true,
      is_standard_in_project: this.isStandardOnAdd
    })
  }
  else {
    this.entityProjectRel = this.name.entity_project_rels
    .filter(
      epr =>  epr.fk_project === this.activeProjectService.project.pk_project
    )[0];
  }

  // Set appellationUsage
  this.appellationUsage = this.name.temporal_entity;

  // Set appellation label
  this.roleR64 = this.appellationUsage.roles.filter(role => role.fk_property === 'R64')[0]
  this.appellation = this.roleR64.appellation;
  this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);

  // Set appellation usage language
  this.roleR61 = this.appellationUsage.roles.filter(role => role.fk_property === 'R61')[0]
  if(this.roleR61){
    this.language = this.roleR61.language;
  }

  // Emit standardName Event
  this.emitIfStandardName();


  if(this.state === 'add') {
    this.inProject = true;
  }

}

get appellationLabelString():string{
  return this.appellationLabel.getString();
}

get notEmptyAppellation():boolean{
  if (this.appellationLabel.tokens.length === 1 && this.appellationLabel.tokens[0].string === '') return false;
  else return true;
}

get isStandardInProject(){
  if(this.entityProjectRel){
    return this.entityProjectRel.is_standard_in_project;
  }
  return undefined;
}

editAppellation(){
  this.editingAppellation = true;
  this.cardBodyState = 'expanded';
}

stopEditAppellation(){
  this.editingAppellation = false;
}

editLanguage(){
}

emitIfStandardName(){
  if(this.isStandardInProject){
    setTimeout( () => this.standardNameChange.emit(this), 0);
  }
}

emitEprChange(){
  this.inProjectChange.emit([this.entityProjectRel]);
}

saveAppellationLabel(){
  this.startLoading();

  this.appellationApi.patchAttributes(this.appellation.pk_appellation, {
    appellation_label: this.appellationLabel
  }).subscribe(success => {
    this.completeLoading();
    this.emitIfStandardName();
    console.log(success);
  })
  this.stopEditAppellation()
}

toggleCardBody(): void {
  if(this.cardBodyState === 'collapsed') this.showDetails();
  else this.hideDetails();
}

hideDetails(){
  this.cardBodyState = 'collapsed';
  this.stopEditAppellation()
}
showDetails(){
  this.cardBodyState = 'expanded';
}

showNamePartSection():boolean{
  if (!(this.appellationLabel.tokens.length === 1 && this.appellationLabel.tokens[0].string === '') && !this.editingAppellation)
  return true
  else
  return false;
}

isNamePartToken(token):boolean{
  if(!token.isSeparator && token.string) return true;
  else return false;
}

getTokenTypeLabel(typeId:number){
  const labels = this.namePartTypes.filter(type => type.id === typeId)
  return (labels.length === 1 ? labels[0].label : '')
}

makeStandardInProject(){
  if(this.state !== 'add'){
    this.startLoading();
    this.changeStandardLoading = true;
    this.entityProjectRelApi.patchAttributes(this.entityProjectRel.pk_entity_project_rel, {
      is_standard_in_project: true
    }).subscribe(entProRel=>{
      this.entityProjectRel.is_standard_in_project = true;
      this.standardNameChange.emit(this);
    })
  }
  else if(this.state === 'add'){
    this.inProject = true;
    this.entityProjectRel.is_standard_in_project = true;
    this.standardNameChange.emit(this);
  }

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
