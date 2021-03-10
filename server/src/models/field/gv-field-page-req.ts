import {model, property} from '@loopback/repository';
import {GvFieldPage} from './gv-field-page';
import {GvFieldTargets} from './gv-field-targets';

@model()
export class GvFieldPageReq {
  @property({required: true}) pkProject: number
  @property({required: true}) page: GvFieldPage
  @property({type: GvFieldTargets, required: true}) targets: GvFieldTargets;
}

