import {model} from '@loopback/repository';
import {GvFieldTargetViewType} from './gv-field-target-view-type';


// const ref = registerType(GvFieldTargetViewType);
const ref = `#/components/schemas/GvFieldTargetViewType`
@model({jsonSchema: {additionalProperties: {$ref: ref}, }})
export class GvSubentityFieldTargets {
  [key: number]: GvFieldTargetViewType | undefined;
}
