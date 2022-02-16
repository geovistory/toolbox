import {model} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {SysConfigFieldsOfSourceClass} from './sys-config-fields-of-source-class.model';

@model({jsonSchema: {additionalProperties: {$ref: registerType(SysConfigFieldsOfSourceClass)}, }})
export class SysConfigFieldsBySourceClass {
  [pkClass: number]: SysConfigFieldsOfSourceClass | undefined;
  // @property({type: SysConfigFieldsOfSourceClass}) 1?: SysConfigFieldsOfSourceClass // to comment out
}



