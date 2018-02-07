import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EprService } from '../shared/services/epr.service';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';
import { PropertyComponent } from '../property/property.component';
import { KeyboardService } from '../shared/services/keyboard.service';
import { Property } from '../shared/services/property.service';
import { EntitiesToCreate } from '../shared/interfaces/entities-to-create';
import { Appellation } from '../shared/sdk/models/Appellation';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';

export enum RolePointToEnum {
  PeIt = "PeIt",
  TeEnt = "TeEnt"
};

@Component({
  selector: 'gv-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  /**
  * Inputs
  */

  @Input() role:InformationRole;

  @Input() isOutgoing:boolean;

  @Input() pointTo:string;

  @Input() roleState:string;

  @Input() pkTargetClass:string;

  @Input() fkProperty:string;

  @Input() parentProperty:Property;

  /**
  * Outputs
  */

  @Output() onRequestStandard:EventEmitter<RoleComponent> = new EventEmitter();

  @Output() readyToCreate: EventEmitter<InformationRole> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;




  /**
  * Properties
  */

  // this component
  thisComponent = this;

  // Flag to disable the standard toggle button while loading 
  loadingStdChange:boolean=false;

  // true if the role is ready to create (only for create state)
  isReadyToCreate:boolean;


  constructor(
    private eprService:EprService,
    private ref:ChangeDetectorRef,
    public keyboard:KeyboardService
  ) { }

  ngOnInit() {
    if(this.roleState === 'create'){
      this.role = new InformationRole();
      this.role.fk_property = this.fkProperty;
    }
  }


  /**
  * get the entity project relation between this role and active project
  */
  get epr():EntityVersionProjectRel{
    return this.eprService.getEprOfEntity(this.role);
  }


  /**
  * set the entity project relation between this role and active project
  */
  set epr(epr:EntityVersionProjectRel){
    this.eprService.updateEprOfEntity(this.role, epr);
    // this.ref.detectChanges();
  }


  /**
  * returns true if the UI to see and edit standard in project status should
  * be visible.
  *
  * @return {boolean}  true = UI for standard in project is visible
  */
  get standardInProjectVisible ():boolean{
    return true;
  }


  /**
  * returns true if this is the standard role for this kind and this project
  *
  * @return {boolen}  description
  */
  get isStandardInProject():boolean{
    return this.epr.is_standard_in_project;
  }


  /**
  * requestStandard - tells the parent Property that it wants to become standard
  */
  requestStandard():void {
    this.onRequestStandard.emit(this);
  }


  /**
  * Methods specific to create state
  */

  peItReadyToCreate(entity){

    if(entity instanceof Appellation){
      this.role.appellation = entity
    }

    if(entity instanceof InformationLanguage){
      this.role.language = entity
    }

    this.isReadyToCreate = true;

    this.readyToCreate.emit(this.role); 

  }


  peItNotReadyToCreate(){

    this.isReadyToCreate = false;

    this.notReadyToCreate.emit()

  }


  teEntReadyToCreate(teEnt:TemporalEntity){

    this.role.temporal_entity = teEnt;

    this.isReadyToCreate = true;

    this.readyToCreate.emit(this.role); 

  }


  teEntNotReadyToCreate(){

    this.isReadyToCreate = false;

    this.notReadyToCreate.emit()

  }

}
