import { TimePrimitive } from "app/core";

export type FieldState = 'editable' | 'hidden' | 'view' | 'edit' | 'addBtn';

export class Field {

  label: string;
  state: FieldState;
  datePrefix: string;
  tpName: string;
  ctrlName: string;
  visible: boolean;

  // // ctrlNames (p81, p81a …) that are uses by this field.
  // ctrlNames: Array<string>;

  // true if the time primitive is implied
  isImplicit: boolean;

  // timePtimitive cached here that can be used for reset on cancel
  tpForReset: TimePrimitive;

  constructor(data?) {
    Object.assign(this, data);
  }

}