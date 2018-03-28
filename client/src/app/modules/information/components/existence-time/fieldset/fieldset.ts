export class Fieldset {
  state: 'collapsed' | 'expanded';
  visible: boolean;
  fields: any;
  label: string;

  constructor(data?) {
    Object.assign(this, data);
  }
}