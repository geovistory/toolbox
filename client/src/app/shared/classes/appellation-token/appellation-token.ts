import { NamePartInputComponent } from '../../../name-part-input/name-part-input.component';

export interface TokenInterface {
  "id": number,
  "string": string,
  "autofocus": boolean,
  "isSeparator": boolean,
  "type"?: any,
  "namePartInputComponent"?: NamePartInputComponent
}

export class Token implements TokenInterface {
  id: number;
  string: string;
  autofocus: boolean;
  isSeparator: boolean;
  typeId: number;
  namePartInputComponent?: NamePartInputComponent;
  type?:Object;

  constructor(
    data?: TokenInterface
  ) {
    Object.assign(this, data);
  }

  toJSON(){
    return {
      id: this.id,
      string: this.string,
      typeId: this.typeId,
      isSeparator: this.isSeparator
    }
  }

}


export class AppellationTokenInput {
  token:Token;
  index: number;
  event:any;
}

