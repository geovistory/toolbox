import { Component, EventEmitter, OnInit } from '@angular/core';
import { Token } from '../appellation-token/appellation-token';
import { Appellation } from '../appellation/appellation';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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

let jsonString:string = '{"latestTokenId":4,"tokens":[{"id":0,"string":"Friedrich","typeId":1,"isSeparator":false},{"id":1,"string":" ","isSeparator":true},{"id":2,"string":"V.","typeId":3,"isSeparator":false},{"id":3,"string":",","isSeparator":true},{"id":4,"string":"Grossherzog","typeId":4,"isSeparator":false}]}';

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
  editingAppellation:boolean = false;

  cardBodyState:string='collapsed';

  get appellationString():string{
    return this.appellation.getString();
  }

  get notEmptyAppellation():boolean{
    if (this.appellation.tokens.length === 1 && this.appellation.tokens[0].string === '') return false;
    else return true;
  }


  appellation: Appellation;

  constructor() {

  }

  ngOnInit(){
    const appeObj = JSON.parse(jsonString);
    this.appellation = new Appellation({
      latestTokenId: appeObj.latestTokenId,
      tokens: []
    })

    for (let tokenObj of appeObj.tokens) {

      const nameTypes = namePartTypes.filter(type => {
        return type.id === tokenObj.typeId;
      })

      const token = new Token({
        id: tokenObj.id,
        string: tokenObj.string,
        type: nameTypes[0],
        isSeparator: tokenObj.isSeparator,
        autofocus: true
      })

      this.appellation.tokens.push(token);

    }
  }

  editAppellation(){
    this.editingAppellation = true;
    this.cardBodyState = 'expanded';
  }

  stopEditAppellation(){
    this.editingAppellation = false;
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
    if (!(this.appellation.tokens.length === 1 && this.appellation.tokens[0].string === '') && !this.editingAppellation)
      return true
    else
      return false;
  }

  isNamePartToken(token):boolean{
    if(!token.isSeparator && token.string) return true;
    else return false;
  }
}
