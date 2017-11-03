import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { Token } from '../appellation-token/appellation-token';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AppellationLabel } from '../appellation-label/appellation-label';
import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationApi } from '../shared/sdk/services/custom/Appellation';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';

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

  /*** Data ***/

  // Appellation Usage
  @Input() appellationUsage: TemporalEntity; // F52_Name_Use_Activity

  // TemporalEntity --> Role --> Appellation
  roleR64: InformationRole; // R64_used_name
  appellation: Appellation; // E41_Appellation
  appellationLabel:AppellationLabel; // appellation.appellation_label

  // TemporalEntity --> Role --> PersistentItem
  roleR61: InformationRole; // R61_occured_in_kind_of_context
  language: InformationLanguage; // E56_Language

  /*** App logic ***/

  editingAppellation:boolean = false;
  cardBodyState:string='collapsed';

  constructor(
    private appellationApi: AppellationApi
  ) {

  }

  ngOnInit(){

    // Set appellation label
    this.roleR64 = this.appellationUsage.roles.filter(role => role.fk_property === 'R64')[0]
    this.appellation = this.roleR64.appellation;
    this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);

    // Set appellation usage language
    this.roleR61 = this.appellationUsage.roles.filter(role => role.fk_property === 'R61')[0]
    if(this.roleR61){
      this.language = this.roleR61.language;
    }
  }

  get appellationLabelString():string{
    return this.appellationLabel.getString();
  }

  get notEmptyAppellation():boolean{
    if (this.appellationLabel.tokens.length === 1 && this.appellationLabel.tokens[0].string === '') return false;
    else return true;
  }

  editAppellation(){
    this.editingAppellation = true;
    this.cardBodyState = 'expanded';
  }

  stopEditAppellation(){
    this.editingAppellation = false;
  }

  saveAppellationLabel(){

    this.appellationApi.patchAttributes(this.appellation.pk_appellation, {
      appellation_label: this.appellationLabel
    }).subscribe(success => {
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
}
