import { AppellationLabelTokenComponent } from "../../../information/components/appellation-label-token/appellation-label-token.component";

export interface TokenInterface {
  "id"?: number,
  "string": string,
  "autofocus"?: boolean,
  "isSeparator"?: boolean,
  typeId?: number,
  "type"?: any,
  "appellationLabelTokenComponent"?: AppellationLabelTokenComponent
}

export class Token implements TokenInterface {
  id?: number;
  string: string;
  autofocus?: boolean;
  isSeparator?: boolean;
  typeId?: number;
  appellationLabelTokenComponent?: AppellationLabelTokenComponent;
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

