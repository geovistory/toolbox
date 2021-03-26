import {model} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {GvTargetType} from './gv-target-type';

const ref = registerType(GvTargetType);
@model({jsonSchema: {additionalProperties: {$ref: ref}, }})
export class GvFieldTargets {
  [key: number]: GvTargetType | undefined;
  // @property({type: GvTargetType}) 1?: GvTargetType; // to comment out
}


