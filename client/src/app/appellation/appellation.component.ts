import { Component, ViewChildren, EventEmitter } from '@angular/core';
import { Token } from '../appellation-token/appellation-token.component';

export interface AppellationInterface {
  "latestTokenId": number,
  "tokens": Token[]
}

export class Appellation implements AppellationInterface {
  "latestTokenId": 0;
  "tokens": Token[];

  constructor(data?: AppellationInterface) {
    Object.assign(this, data);
  }

  insertToken(oldToken:Token, newTokenIndex, newTokenString, isSeparator){
    this.latestTokenId++;
    const newToken = new Token({
      id: this.latestTokenId,
      string: newTokenString,
      spaceAfter: oldToken.spaceAfter,
      type: oldToken.type,
      autofocus: true,
      isSeparator: isSeparator
    });
    this.tokens.splice((newTokenIndex), 0, newToken)
    return newToken;
  }

  getString(){
    let string: string = "";
    for (let key in this.tokens) {
      string += this.tokens[key].string + (this.tokens[key].spaceAfter ? ' ' : '');
    }
    return string;
  }

  getJsonString (){
    return JSON.stringify(this);
  }
}

export const namePartTypes = ['First Name', 'Last Name', 'Dynastic Number', 'Other'];


@Component({
  selector: 'gv-appellation',
  templateUrl: './appellation.component.html',
  styleUrls: ['./appellation.component.scss']
})

export class AppellationComponent {
  @ViewChildren('input') vc;

  namePartTypes = namePartTypes;


  appellation = new Appellation({
    latestTokenId: 0,
    tokens: [
      new Token({
        "id": 0,
        "string": "",
        "spaceAfter": true,
        "type": namePartTypes[0],
        "autofocus":true,
        "isSeparator": false
      }),
    ]
  });


  constructor() {
  }




  getAppellationString(json: any){
    return this.appellation.getString()
  }



}
