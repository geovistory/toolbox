import { InfActions } from '../inf/inf.actions';
import { DatActions } from '../dat/dat.actions';
import { ProActions } from '../pro/pro.actions';
import { InfPersistentItem, InfAppellation, InfTimePrimitive, InfPlace, ProInfoProjRel, InfTemporalEntity } from '../sdk';
import { infDefinitions } from '../inf/inf.config';
import { proDefinitions } from '../pro/pro.config';
import { InfStatement } from '../sdk/models/InfStatement';

export interface FlatObject {
  persistent_item?: InfPersistentItem[]
  statement?: InfStatement[]
  temporal_entity?: InfTemporalEntity[]
  appellation?: InfAppellation[]
  time_primitive?: InfTimePrimitive[]
  place?: InfPlace[]
  info_proj_rel?: ProInfoProjRel[]
}
export class Stower {
  constructor(
    public infActions: InfActions,
    public datActions: DatActions,
    public proActions: ProActions
  ) { }

  stow(o: FlatObject, pk?: number) {
    for (const key in o) {
      try {
        if (o.hasOwnProperty(key) && o[key].length > 0) {
          if (infDefinitions.hasOwnProperty(key)) {
            this.infActions[key].loadSucceeded(o[key], undefined, pk)
          }
          else if (proDefinitions.hasOwnProperty(key)) {
            this.proActions[key].loadSucceeded(o[key], undefined, pk)
          }
        }

      } catch (error) {
        throw `Problem with stowing ${key}:` + error
      }
    }
  }

}
