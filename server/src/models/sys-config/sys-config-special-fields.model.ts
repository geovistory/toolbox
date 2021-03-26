import {model, property} from '@loopback/repository';
import {SysConfigFieldsByProperty} from './sys-config-fields-by-property';
import {SysConfigFieldsBySourceClass} from './sys-config-fields-by-source-class.model';
import {SysConfigFieldDisplay} from './sys-config-field-display.model';

@model()
export class SysConfigSpecialFields {
  @property({type: SysConfigFieldsByProperty}) incomingProperties?: SysConfigFieldsByProperty;
  @property({type: SysConfigFieldsByProperty}) outgoingProperties?: SysConfigFieldsByProperty;
  @property({type: SysConfigFieldsBySourceClass}) bySourceClass?: SysConfigFieldsBySourceClass;
  @property({type: SysConfigFieldDisplay}) hasTypeSubproperties?: SysConfigFieldDisplay
}
