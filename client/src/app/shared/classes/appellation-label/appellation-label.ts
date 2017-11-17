
import { Token } from '../appellation-token/appellation-token';

export interface AppellationLabelInterface {
  "latestTokenId": number,
  "tokens": Token[]
}

export class AppellationLabel implements AppellationLabelInterface {
  "latestTokenId": number;
  "tokens": Token[] = [];

  // get jsonString (){
  //   return JSON.stringify(this);
  // }

  constructor(data?: AppellationLabelInterface) {
    if(data.tokens.length > 1){
      for(let token of data.tokens){
        this.tokens.push(new Token(token));
      }
    }
    this.latestTokenId = data.latestTokenId;
  }

  insertToken(oldToken:Token, newTokenIndex, newTokenString, isSeparator){
    this.latestTokenId++;
    const newToken = new Token({
      id: this.latestTokenId,
      string: newTokenString,
      type: undefined,
      autofocus: true,
      isSeparator: isSeparator
    });
    this.tokens.splice((newTokenIndex), 0, newToken)
    return newToken;
  }

  deleteToken(token:Token){
    const index = this.tokens.indexOf(token);
    if (index > -1) {
      this.tokens.splice(index, 1);
    }
  }

  getString(){
    let string: string = "";
    for (let key in this.tokens) {
      string += this.tokens[key].string;
    }
    return string;
  }

}
