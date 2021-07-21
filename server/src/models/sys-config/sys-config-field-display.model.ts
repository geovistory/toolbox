import { model, property } from '@loopback/repository';
import { Sections } from './sys-config-sections.model';

@model()
export class SysConfigFieldDisplay {
  @property() comment: string;
  @property({ type: Sections }) formSections?: Sections;
  @property({ type: Sections }) viewSections?: Sections;
  @property() isHasTimeSpanShortCut?: boolean // if true, the property will be replaced by the 6 has-time-span properties
};
