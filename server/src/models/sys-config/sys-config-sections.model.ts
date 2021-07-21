import { model, property } from '@loopback/repository';
import { registerType } from '../../components/spec-enhancer/model.spec.enhancer';

export enum DisplayType { form, view }

@model()
export class Section {
  @property() position?: number; // the field position inside the section
  @property() hidden?: true; // if the field has to be hidden in this section (eg. has to be merged with in form-metadata)
}

@model({ jsonSchema: { additionalProperties: { $ref: registerType(Section) }, } })
export class Sections {
  @property() basic: Section;
  @property() metadata: Section;
  @property() specific: Section;
}
