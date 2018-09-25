
import { Token } from '../appellation-token/appellation-token';

export interface AppellationLabelInterface {
  'latestTokenId': number, // the id of the latest created token. increments by 1, starting by 0.
  'tokens': Token[] // Array of Tokens
}

export interface UpdateTokenStringRequest {
  newString: string;
  index: number;
}

export interface UpdateTokenIsSeparatorRequest {
  newIsSeparator: boolean;
  index: number;
}

export interface InsertTokenRequest {
  oldToken: Token;
  newToken: Token;
  index: number; // where the new token should be inserted
}

export class AppellationLabel implements AppellationLabelInterface {
  'latestTokenId': number;
  'tokens': Token[] = [];

  // get jsonString (){
  //   return JSON.stringify(this);
  // }

  constructor(data?: AppellationLabelInterface, string?:string) {
    if(string){
      this.latestTokenId = 0;
      this.tokens.push(new Token({
        id: this.latestTokenId,
        string: string,
        type: undefined,
        autofocus: true,
        isSeparator: false
      }))
    }
    else if (data) {
      if (
        data.tokens
        && data.tokens.length > 0
      ) {
        for (let token of data.tokens) {
          this.tokens.push(new Token(token));
        }
      }
      if (data.latestTokenId) {
        this.latestTokenId = data.latestTokenId;
      }
    } else {
      this.latestTokenId = 0;
      this.tokens.push(new Token({
        id: this.latestTokenId,
        string: '',
        type: undefined,
        autofocus: true,
        isSeparator: false
      }))
    }
  }

  insertToken(token: Token, index: number) {
    this.latestTokenId++;
    this.tokens.splice((index), 0, token)
  }

  updateTokenString(req: UpdateTokenStringRequest) {
    this.tokens[req.index].string = req.newString;
  }

  updateTokenIsSeparator(req: UpdateTokenIsSeparatorRequest) {
    this.tokens[req.index].isSeparator = req.newIsSeparator;
  }

  deleteToken(token:Token) {
    if (this.tokens.length > 1) {
        this.tokens.splice(this.getIndex(token), 1);
    }
  }


  getIndex(token:Token) {
    return this.tokens.indexOf(token);
  }

  getHasNextToken(token:Token) {
    return this.tokens[(this.getIndex(token) + 1)] !== undefined;
  }

  getHasPreviousToken(token:Token) {
    return this.tokens[(this.getIndex(token) + -1)] !== undefined;
  }

  getNextToken(token:Token) {
    return this.tokens[(this.getIndex(token) + 1)];
  }

  getPreviousToken(token:Token) {
    return this.tokens[(this.getIndex(token) + -1)];
  }


  getString() {
    let string: string = '';
    for (let key in this.tokens) {
      string += this.tokens[key].string;
    }
    return string;
  }

}
