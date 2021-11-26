import {model, property} from '@loopback/repository';
import {SysConfigAddProperty} from './sys-config-add-property';
import {ClassConfig} from './sys-config-class-config';
import {ClassesIndex} from "./sys-config-classes-index";
import {SysConfigSpecialFields} from './sys-config-special-fields.model';
@model({
  jsonSchema: {
    title: "SysConfigValue",
    description: 'Classes indexed by primary key: Use class id as key (e.g. \"21\" for Person, https://ontome.net/class/21) ',
    // example
  }
})
export class SysConfigValue {

  @property({type: ClassConfig})
  classesDefault?: ClassConfig;

  @property({type: ClassesIndex})
  classesByBasicType?: ClassesIndex;

  @property({type: ClassesIndex, required: true})
  classes: ClassesIndex;

  @property({type: SysConfigSpecialFields, required: true})
  specialFields: SysConfigSpecialFields;

  @property.array(SysConfigAddProperty)
  addProperty?: SysConfigAddProperty[]
}


