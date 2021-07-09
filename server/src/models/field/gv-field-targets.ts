import {model} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {GvFieldTargetViewType} from './gv-field-target-view-type';

const ref = registerType(GvFieldTargetViewType);
@model({jsonSchema: {additionalProperties: {$ref: ref}, }})
export class GvFieldTargets {
  [key: number]: GvFieldTargetViewType | undefined;
  // @property({type: GvTargetType}) 1?: GvTargetType; // to comment out
}


