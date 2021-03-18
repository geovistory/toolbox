import {model, property} from '@loopback/repository';
import {SysConfigFieldsOfSourceClass} from './sys-config-fields-of-source-class.model';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';

@model({jsonSchema: {additionalProperties: {$ref: registerType(SysConfigFieldsBySourceClass)}, }})
export class SysConfigFieldsBySourceClass {
  [pkClass: number]: SysConfigFieldsOfSourceClass | undefined;
  @property({type: SysConfigFieldsOfSourceClass}) 1?: SysConfigFieldsOfSourceClass
}
