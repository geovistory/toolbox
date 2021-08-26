import { model, property } from '@loopback/repository';
import { SysConfigFieldsByProperty } from './sys-config-fields-by-property';

@model()
export class SysConfigFieldsOfSourceClass {
  @property({ type: SysConfigFieldsByProperty }) incomingProperties?: SysConfigFieldsByProperty;
  @property({ type: SysConfigFieldsByProperty }) outgoingProperties?: SysConfigFieldsByProperty;
}
