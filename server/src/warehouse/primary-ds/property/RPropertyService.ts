import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {rPropertyIdToString, stringToRPropertyId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {RClassFieldId} from '../../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
export interface RPropertyId {pkProperty: number}

export class RPropertyService extends PrimaryDataService<InitItem, RPropertyId, RProperty>{

  measure = 1000;


  index = new IndexDBGeneric<RPropertyId, RProperty>(rPropertyIdToString, stringToRPropertyId)

  constructor(public wh: Warehouse) {
    super(wh, [
      'modified_projects_project',
      'modified_projects_dfh_profile_proj_rel',
      'modified_data_for_history_api_property'
    ])

    /**
     * Add actions after a new RProperty is put/updated into index
     */
    this.afterPut$.subscribe(item => {
      // Add update requests on aggregaters based on project property
      const outgoingField: RClassFieldId = {
        fkClass: item.val.fkDomain,
        fkProperty: item.val.fkProperty,
        isOutgoing: true
      }
      wh.agg.rClassFieldLabel.updater.addItemToQueue(outgoingField).catch(e => console.log(e))

      const incomingField: RClassFieldId = {
        fkClass: item.val.fkRange,
        fkProperty: item.val.fkProperty,
        isOutgoing: false
      }
      wh.agg.rClassFieldLabel.updater.addItemToQueue(incomingField).catch(e => console.log(e))
    })

    /**
    * Remove property preview from db
    */
    this.afterDel$.subscribe(item => {
    })


  }

  dbItemToKeyVal(item: InitItem): {key: RPropertyId; val: RProperty;} {
    const key: RPropertyId = {
      pkProperty: item.fkProperty
    };
    const val: RProperty = item
    return {key, val}
  }

  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql = undefined
}


interface InitItem {
  fkProperty: number,
  fkDomain: number
  fkRange: number
}

const updateSql = `
  SELECT DISTINCT
  dfh_pk_property "fkProperty",
  dfh_property_domain "fkDomain",
  dfh_property_range "fkRange"
  FROM
  data_for_history.api_property t1
  WHERE
  t1.tmsp_last_modification >= $1
`

export interface RProperty {
  fkProperty: number
  fkDomain: number
  fkRange: number
}



