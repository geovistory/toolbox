import {model} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {SysConfigFieldDisplay} from './sys-config-field-display.model';

@model({jsonSchema: {additionalProperties: {$ref: registerType(SysConfigFieldDisplay)}, }})
export class SysConfigFieldsByProperty {
  [pkProperty: number]: SysConfigFieldDisplay | undefined;
  // @property({type: SysConfigFieldDisplay}) 1?: SysConfigFieldDisplay; // to comment out
}
