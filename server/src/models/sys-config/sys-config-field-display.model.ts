import {model, property} from '@loopback/repository';
import {SysConfigFieldPosition} from './sys-config-field-position.model';

@model()
export class SysConfigFieldDisplay {
  @property() comment: string;
  @property({type: SysConfigFieldPosition}) displayInBasicFields?: SysConfigFieldPosition;
  @property() hidden?: true;
};
