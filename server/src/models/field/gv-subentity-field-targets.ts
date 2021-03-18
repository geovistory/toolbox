import {model, property} from '@loopback/repository';
import {GvSubentityTargetType} from './gv-subentity-target-type';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';


const ref = registerType(GvSubentityTargetType);
@model({jsonSchema: {additionalProperties: {$ref: ref}, }})
export class GvSubentityFieldTargets {
  [key: number]: GvSubentityTargetType | undefined;
  @property({type: GvSubentityTargetType}) 1?: GvSubentityTargetType;
}
