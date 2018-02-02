import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { NameComponent } from '../name/name.component';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';
import { EntityVersionProjectRelApi } from '../shared/sdk/services/custom/EntityVersionProjectRel';
import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { KeyboardService } from '../shared/services/keyboard.service';

@Component({
  selector: 'gv-naming',
  templateUrl: './naming.component.html',
  styleUrls: ['./naming.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
      })),
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out', keyframes([
        style({
          height: '*',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '0px',
          display: 'hidden',
          offset: 1
        })
      ]))),
      transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
        style({
          height: '0px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '*',
          display: 'hidden',
          offset: 1
        })
      ])))
    ])
  ]
})
export class NamingComponent implements OnInit, OnChanges {

  // The parent PeItEntityComponent
  @Input() parentPeItC:PeItEntityComponent;

  @Input() roles:Array<InformationRole>;

  get rolesR63(){
    return this.roles.filter(role => role.fk_property === 'R63');
  }

  entityEditorState = new EntityEditorState();

  @Input() set state(value:string){
    this.entityEditorState.state = value;
  };

  get state():string{
    return this.entityEditorState.state;
  }

  @Output() standardNameStringChange: EventEmitter<string> = new EventEmitter();

  @Output() entityProjectRelChange: EventEmitter<EntityVersionProjectRel[]> = new EventEmitter();

  standardNameComponent: NameComponent;

  showCommunityData: boolean = false;

  cardState = 'expanded';

  addingName: boolean = false;

  entProRels: Array<EntityVersionProjectRel> = []; //

  standardNamePkOnAdd:number;

  isStandardOnAdd(pk:number):boolean{
    return this.standardNamePkOnAdd === pk;
  }

  get footerVisible():boolean{

    if(this.state === 'add') return false;

    if (this.addingName) return false;

    return true;
  }

  constructor(
    private entityProjectRelApi:EntityVersionProjectRelApi,
    public activeProject: ActiveProjectService,
    private slimLoadingBarService: SlimLoadingBarService,
    public keyboard:KeyboardService
  ) { }

  ngOnInit() {

  }
  ngOnChanges(){
    this.defineStandardNamePkOnAdd();
  }

  defineStandardNamePkOnAdd(){
    if(this.state === 'add'){
      /**
      * Order the rolesR63 by is-standard-count descending.
      */
      let map=[];
      this.rolesR63.forEach(name => {
        const isStandardCount = name.entity_version_project_rels.filter(epr => epr.is_standard_in_project).length;
        map.push(
          {
            namePkEntity: name.pk_entity,
            isStandardCount: isStandardCount
          }
        )
      })
      map.sort(this.compareNames);

      /**
      * Store the name pk with the highest isStandardCount.
      */
      map.some(o => {
        return this.rolesR63.some(name => {
          if(name.pk_entity === o.namePkEntity){
            this.standardNamePkOnAdd = name.pk_entity;
            return true;
          }
          return false;
        })
      })
    }
  }

  compareNames(a,b){
    let comparison = 0;
    if (a.isStandardCount < b.isStandardCount) {
      comparison = 1;
    } else if (b.isStandardCount > a.isStandardCount) {
      comparison = -1;
    }
    return comparison;
  }

  toggleCardBody(){
    this.cardState = this.cardState ==='expanded' ? 'collapsed':'expanded';
  }

  addName(){
    this.addingName = true;
  }

  cancelAddName(){
    this.addingName = false;
  }

  standardNameChange(newNameComponent:NameComponent){

    if(!this.standardNameComponent) {
      // on init
      this.standardNameComponent = newNameComponent;
      this.standardNameStringChange.emit(this.standardNameComponent.appellationLabel.getString());
    }

    /** if another name becomes standard in project */
    else if(this.standardNameComponent.entityProjectRel.pk_entity_version_project_rel !== newNameComponent.entityProjectRel.pk_entity_version_project_rel){

      /** stop current name to be standard in project  */
      this.entityProjectRelApi.patchAttributes(this.standardNameComponent.entityProjectRel.pk_entity_version_project_rel, {
        is_standard_in_project: false
      }).subscribe(entProRel => {

        // complete the loading bar
        this.completeLoading();

        // stop the loading flag on the new name
        newNameComponent.changeStandardLoading = false;

        // update the is_standard_in_project on the old standard name
        this.standardNameComponent.entityProjectRel.is_standard_in_project = false

        // replace the old standard name with the new standard name
        this.standardNameComponent = newNameComponent;

        /** fire event with the string of the new standard name  */
        this.standardNameStringChange.emit(this.standardNameComponent.appellationLabel.getString());
      })


    }
    /** if this is not yet added to the project */
    else if(this.standardNameComponent.entityProjectRel.pk_entity_version_project_rel === undefined){

      // update the is_standard_in_project on the old standard name
      this.standardNameComponent.entityProjectRel.is_standard_in_project = false

      // replace the old standard name with the new standard name
      this.standardNameComponent = newNameComponent;

      /** fire event with the string of the new standard name  */
      this.standardNameStringChange.emit(this.standardNameComponent.appellationLabel.getString());
    }

    /** on appellation label change */
    else {
      this.standardNameComponent = newNameComponent;
      this.standardNameStringChange.emit(this.standardNameComponent.appellationLabel.getString());
    }

  }

  inProjectChange(entProRels){
    let _that = this;
    entProRels.forEach(function(newRel) {
      var existing = _that.entProRels.filter(function(v, i) {
        // TODO check if this works with fk_entity_version_concat
        return (v.fk_entity_version_concat === newRel.fk_entity_version_concat && v.fk_project === newRel.fk_project);
      });
      if (existing.length) {
        var existingIndex = _that.entProRels.indexOf(existing[0]);
        _that.entProRels[existingIndex] = newRel;
      } else {
        _that.entProRels.push(newRel);
      }
    });

    this.entityProjectRelChange.emit(this.entProRels);

  }

  // addAppellation(){
  //   this.newAppellation = new Appellation();
  //   this.appellations.push(this.newAppellation);
  // }
  //
  // cancelAddAppellation(){
  //
  // }

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
