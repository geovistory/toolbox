import {model, property} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {GvSubentityFieldTargetViewType} from './gv-subentity-field-target-view-type';


const ref = registerType(GvSubentityFieldTargetViewType);
@model({jsonSchema: {additionalProperties: {$ref: ref}, }})
export class GvSubentityFieldTargets {
  [key: number]: GvSubentityFieldTargetViewType | undefined;
  @property({type: GvSubentityFieldTargetViewType}) 1?: GvSubentityFieldTargetViewType;
}
