import {model, property} from '@loopback/repository';
import {GvSubentityFieldPage} from './gv-subentity-field-page';
import {GvSubentityFieldTargets} from './gv-subentity-field-targets';
@model()
export class GvSubentitFieldPageReq {
  @property({required: true}) page: GvSubentityFieldPage
  @property({required: true}) targets: GvSubentityFieldTargets;
}
