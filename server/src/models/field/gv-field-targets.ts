import {model, property} from '@loopback/repository';
import {GvTargetType} from './gv-target-type';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';

const ref = registerType(GvTargetType);
@model({jsonSchema: {additionalProperties: {$ref: ref}, }})
export class GvFieldTargets {
  [key: number]: GvTargetType | undefined;
  @property({type: GvTargetType}) 1?: GvTargetType;
}


