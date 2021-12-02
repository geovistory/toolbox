import {model, property} from '@loopback/repository';

@model()
export class Section {
  @property() position?: number; // the field position inside the section
  @property() hidden?: true; // if the field has to be hidden in this section (eg. has to be merged with in form-metadata)
  @property() controlsOnInit?: number; // how many controls should be present on init. Only available for formSections. Makes no sense for viewSections
  @property() required?: number; // how many must be valid. Only available for formSections. Makes no sense for viewSections
  @property() hideRemoveBtn?: boolean; // how many controls should be present on init. Only available for formSections. Makes no sense for viewSections
  @property() noFieldHeader?: boolean; // if true, the field has no header
}

@model()
export class Sections {
  @property() basic?: Section;
  @property() metadata?: Section;
  @property() specific?: Section;
  @property() timeSpan?: Section;
  @property() simpleForm?: Section;
}
