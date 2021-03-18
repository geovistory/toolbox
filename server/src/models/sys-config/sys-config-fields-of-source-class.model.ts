import {model} from '@loopback/repository';
import {SysConfigFieldsByProperty} from './sys-config-fields-by-property';

@model()
export class SysConfigFieldsOfSourceClass {
  incomingProperties: SysConfigFieldsByProperty;
  outgoingProperties: SysConfigFieldsByProperty;
}
