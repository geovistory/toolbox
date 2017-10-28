import { Token } from '../appellation-token/appellation-token';

export interface AppellationInterface {
  "latestTokenId": number,
  "tokens": Token[]
}

export class Appellation implements AppellationInterface {
  "latestTokenId": number;
  "tokens": Token[];

  get jsonString (){
    return JSON.stringify(this);
  }

  constructor(data?: AppellationInterface) {
    Object.assign(this, data);
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
