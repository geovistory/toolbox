import {model, property} from '@loopback/repository';
import {SysConfigFieldDisplay} from './sys-config-field-display.model';
import {SysConfigFieldsByProperty} from './sys-config-fields-by-property';
import {SysConfigFieldsBySourceClass} from './sys-config-fields-by-source-class.model';
import {SysConfigFieldsOfSourceSuperClass} from './sys-config-fields-of-source-super-class';

@model()
export class SysConfigSpecialFields {
  @property({type: SysConfigFieldsByProperty}) incomingProperties?: SysConfigFieldsByProperty;
  @property({type: SysConfigFieldsByProperty}) outgoingProperties?: SysConfigFieldsByProperty;
  @property({type: SysConfigFieldsBySourceClass}) bySourceClass?: SysConfigFieldsBySourceClass;
  @property.array(SysConfigFieldsOfSourceSuperClass) bySourceSuperClass?: SysConfigFieldsOfSourceSuperClass[];
  @property({type: SysConfigFieldDisplay}) hasTypeSubproperties?: SysConfigFieldDisplay
}
