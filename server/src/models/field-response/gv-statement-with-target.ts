import {model, property} from '@loopback/repository';
import {InfStatement, ProInfoProjRel} from '..';
import {OmitEntity} from '../../__tests__/helpers/data/gvDB/local-model.helpers';
import {SatementTarget} from './SatementTarget';

@model()
export class StatementWithTarget {
  @property({type: InfStatement, required: true}) statement: OmitEntity<InfStatement>;
  @property({type: ProInfoProjRel, required: true}) projRel?: OmitEntity<ProInfoProjRel>;
  @property() ordNum?: number;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) targetLabel: string;
  @property({required: true}) targetClass: number;
  @property({type: SatementTarget, required: true}) target: SatementTarget;
}
