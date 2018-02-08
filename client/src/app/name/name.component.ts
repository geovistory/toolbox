import { Component, EventEmitter, OnChanges, OnInit, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationApi } from '../shared/sdk/services/custom/Appellation';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';
import { EntityVersionProjectRel } from '../shared/sdk/models/EntityVersionProjectRel';
import { EntityVersionProjectRelApi } from '../shared/sdk/services/custom/EntityVersionProjectRel';
import { AppellationService } from '../shared/services/appellation.service';
import { InformationRoleApi } from '../shared/sdk/services/custom/InformationRole';
import { VersionModalComponent } from '../version-modal/version-modal.component';

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
export class NameComponent implements OnInit, OnChanges{

  @Output() standardNameChange: EventEmitter<NameComponent> = new EventEmitter();


  @Output() onNameAdd: EventEmitter<any> = new EventEmitter();

  entityEditorState = new EntityEditorState();

  @Input() set state(value:string){
    this.entityEditorState.state = value;
    if(value === 'communityDataView' && this.onInitDone){
      this.queryVersions();
    }
  };

  get state():string{
    return this.entityEditorState.state;
  }


  /*** Data ***/
  @Input() name: InformationRole; // R63_Named
  r63Versions:InformationRole[];

  // On state 'add' set true to check is_standard_in_project
  @Input() isStandardOnAdd: boolean = false;

  // Entity Version Project Relation
  _entityProjectRel: EntityVersionProjectRel;

  set entityProjectRel(value: EntityVersionProjectRel){
    this._entityProjectRel = value;
  }

  get entityProjectRel():EntityVersionProjectRel{
    return this._entityProjectRel;
  }

  // Appellation Usage
  _appellationUsage: TemporalEntity; // F52_Name_Use_Activity

  set appellationUsage(value:TemporalEntity){
    this._appellationUsage = value;
  }

  get appellationUsage():TemporalEntity{
    return this._appellationUsage;
  }

  // TemporalEntity --> Role --> Appellation
  _roleR64: InformationRole; // R64_used_name

  set roleR64(value:InformationRole){
    this._roleR64 = value;
  }

  get roleR64():InformationRole{
    return this._roleR64;
  }

  // Appellation
  _appellation: Appellation; // E41_Appellation

  set appellation(value:Appellation){
    this._appellation = value;
  }

  get appellation():Appellation{
    return this._appellation;
  }

  _appellationLabel:AppellationLabel; // appellation.appellation_label

  set appellationLabel(value:AppellationLabel){
    this._appellationLabel = new AppellationLabel(value);
  }

  get appellationLabel():AppellationLabel{
    return this._appellationLabel;
  }

  get appellationEpr():EntityVersionProjectRel{
    const epr = this.appellation.entity_version_project_rels.filter(
      epr => epr.fk_project === this.activeProjectService.project.pk_project
    )[0];
    return epr;
  }

  // TemporalEntity --> Role --> PersistentItem
  _roleR61: InformationRole; // R61_occured_in_kind_of_context

  set roleR61(value:InformationRole){
    this._roleR61 = value;
  }

  get roleR61():InformationRole{
    return this._roleR61;
  }

  // Language
  _language: InformationLanguage; // E56_Language

  set language(value:InformationLanguage){
    this._language = value;
  }

  get language():InformationLanguage{
    return this._language;
  }

  // Appellation Versions
  appellationVersions: Appellation[]; // E41_Appellations

  /*** App logic ***/
  editingAppellation:boolean = false;
  editingLanguage:boolean = false;
  cardBodyState:string='collapsed';

  changeStandardLoading:boolean = false;
  changeIsInProjectLoading:boolean = false;

  appellationLabelInEdit:AppellationLabel; // temporal storage during editing

  /*** App logic ***/


  get inProject():boolean {
    return this.entityProjectRel.is_in_project;
  }

  set inProject(value:boolean) {

    // Change the value
    this.entityProjectRel.is_in_project = value;

    if(this.state ==='add' || this.state === 'nameAdd'){
      // Emit the change
      this.emitEprChange(value);
    }
    else{
      // Save the changes
      this.startLoading();
      this.changeIsInProjectLoading = true;
      this.entityProjectRelApi.patchAttributes(
        this.entityProjectRel.pk_entity_version_project_rel,
        this.entityProjectRel
      ).subscribe(success => {
        this.completeLoading();
        this.changeIsInProjectLoading = false;
      })
    }

  }

  private get latestVersion():Appellation{
    if(!this.appellationVersions) return undefined;
    let nr = 0;
    let latestVersion;
    this.appellationVersions.forEach(v => {
      if(nr < v.entity_version){
        nr = v.entity_version;
        latestVersion = v;
      }
    })
    return latestVersion;
  }

  private get latestVersionNumber():number{
    return this.latestVersion.entity_version;
  }

  get versionCount():number{
    if(!this.appellationVersions) return undefined;
    return this.appellationVersions.length;
  }

  onInitDone:boolean=false;

  versionModalOptions: NgbModalOptions = {
    size: 'lg'
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

  get namePartsVisible():boolean{
    if (
      !(this.appellationLabel.tokens.length === 1 && this.appellationLabel.tokens[0].string === '')
      && !this.editingAppellation
    ) return true;

    return false;
  }

  get communityStatisticsVisible (){
    if (this.state === 'add') return true;

    if (this.state === 'communityDataView') return true;

    return false;
  }

  get newUpdateAppellationVisible(){

    if(!this.appellationVersions) return false;

    if (
      this.latestVersionNumber > this.appellation.entity_version &&
      Date.parse(this.latestVersion.tmsp_last_modification)
      > Date.parse(this.appellationEpr.tmsp_last_modification)
    ) return true;

    return false;
  }

  // Community statistics Logic

  get isInProjectCount():number{
    let count = 0
    if(this.appellationVersions){
      this.appellationVersions.forEach((version)=>{
        const rels = version.entity_version_project_rels;
        if(rels){
          count = count + rels.filter(epr => epr.is_in_project).length;
        }
      });
    }
    return count;
    // return this.name.entity_version_project_rels.filter(epr => epr.is_in_project).length;
  }

  get isStandardInProjectCount():number{
    let count = 0
    if(this.r63Versions){
      this.r63Versions.forEach((version)=>{
        const rels = version.entity_version_project_rels;
        if(rels){
          count = count + rels.filter(epr => epr.is_standard_in_project).length;
        }
      });
    }
    return count;

    // return this.name.entity_version_project_rels.filter(epr => epr.is_standard_in_project).length;
  }


  constructor(
    public appellationService: AppellationService,
    private appellationApi: AppellationApi,
    private entityProjectRelApi:EntityVersionProjectRelApi,
    private activeProjectService: ActiveProjectService,
    private slimLoadingBarService: SlimLoadingBarService,
    private informationRoleApi: InformationRoleApi,
    private modalService: NgbModal
  ) {
  }

  ngOnChanges(){
    /** Entity Project Relation */
    if( this.state === 'add'){
      this.entityProjectRel = new EntityVersionProjectRel({
        fk_entity_version_concat: this.name.pk_entity_version_concat,
        fk_project: this.activeProjectService.project.pk_project,
        is_in_project: true,
        is_standard_in_project: this.isStandardOnAdd
      })
    }
    else {

      // set R63 entity project relation
      this.entityProjectRel = this.name.entity_version_project_rels
      .filter(
        epr =>  epr.fk_project === this.activeProjectService.project.pk_project
      )[0];

    }

    // Init appellationUsage
    this.appellationUsage = this.name.temporal_entity;

    // Init R64_used_name
    this.roleR64 = this.appellationUsage.te_roles.filter(role => role.fk_property === 'R64')[0]

    // Init appellation
    this.appellation = this.roleR64.appellation;

    // Init appellation Label
    this.appellationLabel = this.appellation.appellation_label;

    // Init r62_used in language context
    this.roleR61 = this.appellationUsage.te_roles.filter(role => role.fk_property === 'R61')[0]

    if(this.roleR61){
      // Init appellation usage language
      this.language = this.roleR61.language;
    }

    // Emit standardName Event
    this.emitIfStandardName();


    if(this.state === 'add') {
      this.inProject = true;
    }

    if(this.state=== 'communityDataView'){
      this.queryVersions();
    }

    this.onInitDone = true;

  }

  ngOnInit(){

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
    this.appellationLabelInEdit = new AppellationLabel(this.appellationLabel);
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


  emitEprChange(boolean:boolean){

    let epr:EntityVersionProjectRel[] = [];

    if(this.state === "add"){

      /** create epr for appellation usage (temporal entity) */
      epr.push(new EntityVersionProjectRel({
        fk_project: this.activeProjectService.project.pk_project,
        fk_entity_version_concat: this.appellationUsage.pk_entity_version_concat,
        is_in_project: true
      }))

      if(this.roleR61){
        /** create epr for R61_occured_in_kind_of_context (role to attach language)*/
        epr.push(new EntityVersionProjectRel({
          fk_project: this.activeProjectService.project.pk_project,
          fk_entity_version_concat: this.roleR61.pk_entity_version_concat,
          is_in_project: true
        }))
      }
      if(this.language){
        /** create epr for language*/
        epr.push(new EntityVersionProjectRel({
          fk_project: this.activeProjectService.project.pk_project,
          fk_entity_version_concat: this.language.pk_entity_version_concat,
          is_in_project: true
        }))
      }

      /** create epr for R64_used_name (role to attach appellation) */
      epr.push(new EntityVersionProjectRel({
        fk_project: this.activeProjectService.project.pk_project,
        fk_entity_version_concat: this.roleR64.pk_entity_version_concat,
        is_in_project: true
      }))

      /** create epr for appellation */
      epr.push(new EntityVersionProjectRel({
        fk_project: this.activeProjectService.project.pk_project,
        fk_entity_version_concat: this.appellation.pk_entity_version_concat,
        is_in_project: true
      }))

      /** add epr to the R63_Named (role to attach persistent item) */
      epr.push(this.entityProjectRel)

      this.inProjectChange.emit(epr);
    }

    if(this.state === "nameAdd"){
      if(boolean === false){
        //TODO emit on name remove

      }else if(boolean === true){

        //collect fks
        const fks = [
        this.entityProjectRel.fk_entity_version_concat,
        this.appellationUsage.pk_entity_version_concat,
        this.roleR61.pk_entity_version_concat,
        this.language.pk_entity_version_concat,
        this.roleR64.pk_entity_version_concat,
        this.appellation.pk_entity_version_concat
      ]

      this.entityProjectRelApi.find({
        where:  {
          and: [
            { fk_entity_version_concat: {
              inq: fks
            }
          },
          { fk_project: this.activeProjectService.project.pk_project }
        ]
      }
    })
    .subscribe((result:EntityVersionProjectRel[]) => {
      const eprs:EntityVersionProjectRel[] = [];
      fks.forEach(fk => {
        const epr = result.filter(epr => epr.fk_entity_version_concat === fk)
        if(epr.length > 0){
          eprs.push(epr[0]);
        }
        else{
          eprs.push(new EntityVersionProjectRel({
            fk_project: this.activeProjectService.project.pk_project,
            fk_entity_version_concat: fk,
            is_in_project: boolean
          }))
        }
      })
      eprs.forEach(epr => {epr['is_in_project'] = boolean});
      this.onNameAdd.emit({
        nameRole: this.name,
        entityProjectRels: eprs
      });
    })
  }
}
}

saveAppellationLabel(){
  this.startLoading();

  this.appellationApi.findOrCreateAppellation(
    this.activeProjectService.project.pk_project,
    {
      pk_entity: this.appellation.pk_entity,
      fk_class: this.appellation.fk_class,
      appellation_label: this.appellationLabelInEdit
    }
  ).subscribe(appellations => {
    this.completeLoading();

    this.updateAppellation(appellations[0]);

    this.emitIfStandardName();
  })
  this.stopEditAppellation()
}


/**
* updateAppellation - update the appellation in this component and in the
* name input of the component
*
* @param  {type} appellation description
* @return {type}             description
*/
updateAppellation(appellation){
  // set appellation
  this.appellation = appellation;

  // set appellation label
  this.appellationLabel = this.appellation.appellation_label;

  // set the name
  this.name.temporal_entity.te_roles
  .filter(role => role.fk_property === 'R64')[0]
  .appellation = appellation;
}

queryVersions(){
  this.startLoading();

  /**
  * Query Versions of the appellation
  */
  const appe = this.appellationApi.findComplex({
    "where": ["pk_entity","=",this.appellation.pk_entity],
    "include": {
      "entity_version_project_rels": {
        "$relation": {
          "name": "entity_version_project_rels",
          "joinType": "left join",
          "orderBy":[{"pk_entity_version_project_rel":"desc"}]
        }
      }
    },
    "order":[{"entity_version":"desc"}]
  });


  /**
  * Query Versions of the role R63_Named
  */

  const epr = this.informationRoleApi.findComplex({
    "where": ["pk_entity","=",this.name.pk_entity],
    "include": {
      "entity_version_project_rels": {
        "$relation": {
          "name": "entity_version_project_rels",
          "joinType": "left join",
          "orderBy":[{"pk_entity_version_project_rel":"desc"}]
        }
      }
    },
    "order":[{"entity_version":"desc"}]
  })

  Observable.forkJoin([appe,epr]).subscribe(
    (data) => {

      this.appellationVersions = data[0];

      this.r63Versions = data[1];

      this.completeLoading();

    })

  }

  openVersionHistoryModal(){
    const modalRef = this.modalService.open(VersionModalComponent, this.versionModalOptions);
    modalRef.componentInstance.versions = this.appellationVersions;
    modalRef.componentInstance.currentVersion = this.appellation;
    modalRef.result.then(version => {
      this.updateAppellation(version);
      this.queryVersions(); //TODO disable reopening modal while querying verions
    }).catch()
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

  isNamePartToken(token):boolean{
    if(!token.isSeparator && token.string) return true;
    else return false;
  }

  makeStandardInProject(){
    if(this.state !== 'add'){
      this.startLoading();
      this.changeStandardLoading = true;
      this.entityProjectRelApi.patchAttributes(this.entityProjectRel.pk_entity_version_project_rel, {
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
