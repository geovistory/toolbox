import {model, property} from '@loopback/repository';
import {SysConfigFieldPosition} from './sys-config-field-position.model';

@model()
export class SysConfigFieldDisplay {
  @property() comment: string;
  @property({type: SysConfigFieldPosition}) displayInBasicFields?: SysConfigFieldPosition;
  @property() isHasTimeSpanShortCut?: boolean // if true, the property will be replaced by the 6 has-time-span properties
  @property() hidden?: true;
};
