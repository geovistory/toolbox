import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {rPropertyIdToString, stringToRPropertyId} from '../../base/functions';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
import {Warehouse} from '../../Warehouse';
export interface RPropertyId {
  pkProperty: number,
  fkDomain: number
  fkRange: number
}

export interface RPropertyVal {
  fkProperty: number
  fkDomain: number
  fkRange: number
}
export const rPropertyIdKeyConfig: KeyDefinition[] = [
  {
    name: 'pkProperty',
    type: 'integer'
  },
  {
    name: 'fkDomain',
    type: 'integer'
  },
  {
    name: 'fkRange',
    type: 'integer'
  }
]
export class RPropertyService extends PrimaryDataService<RPropertyId, RPropertyVal>{

  measure = 1000;



  constructor(public wh: Warehouse) {
    super(wh, [
      'modified_projects_project',
      'modified_projects_dfh_profile_proj_rel',
      'modified_data_for_history_api_property'
    ], rPropertyIdToString, stringToRPropertyId,
      rPropertyIdKeyConfig
    )

    /**
     * Add actions after a new RProperty is put/updated into index
     */
    // this.afterPut$.subscribe(item => {
    //   // Add update requests on aggregaters based on project property
    //   const outgoingField: RClassFieldId = {
    //     fkClass: item.val.fkDomain,
    //     fkProperty: item.val.fkProperty,
    //     isOutgoing: true
    //   }
    //   wh.agg.rClassFieldLabel.updater.addItemToQueue(outgoingField).catch(e => console.log(e))

    //   const incomingField: RClassFieldId = {
    //     fkClass: item.val.fkRange,
    //     fkProperty: item.val.fkProperty,
    //     isOutgoing: false
    //   }
    //   wh.agg.rClassFieldLabel.updater.addItemToQueue(incomingField).catch(e => console.log(e))
    // })
  }

  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql(tmsp: Date) {return ''}
}


interface InitItem {
  fkProperty: number,
  fkDomain: number
  fkRange: number
}

const updateSql = `
  SELECT DISTINCT
  dfh_pk_property "pkProperty",
  dfh_property_domain "fkDomain",
  dfh_property_range "fkRange",
  jsonb_build_object(
    'fkProperty', dfh_pk_property,
    'fkDomain', dfh_property_domain,
    'fkRange', dfh_property_range
  ) val
  FROM
  data_for_history.api_property t1
  WHERE
  t1.tmsp_last_modification >= $1
`




