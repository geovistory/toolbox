import {RClassFieldId} from '../../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {rClassIdToString, stringToRClassId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {RClassId} from '../DfhClassHasTypePropertyService';

export class RClassService extends PrimaryDataService<InitItem, RClassId, RClass>{

  measure = 1000;


  index = new IndexDBGeneric<RClassId, RClass>(rClassIdToString, stringToRClassId)

  constructor(public wh: Warehouse) {
    super(wh, [
      'modified_data_for_history_api_class'
    ])

    /**
     * Add actions after a new RClass is put/updated into index
     */
    this.afterPut$.subscribe(item => {
      // Add update requests on aggregaters based on project class
      wh.agg.rClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
      // Generate incoming class field for 'has appellation' property 1111
      if ([8, 9, 30].includes(item.val.basicType)) {
        const incomingField: RClassFieldId = {
          fkClass: item.val.fkClass,
          fkProperty: 1111,
          isOutgoing: false
        }
        wh.agg.rClassFieldLabel.updater.addItemToQueue(incomingField).catch(e => console.log(e))
      }
    })

    /**
    * Remove class preview from db
    */
    this.afterDel$.subscribe(item => {
    })


  }

  dbItemToKeyVal(item: InitItem): {key: RClassId; val: RClass;} {
    const key: RClassId = {
      pkClass: item.fkClass,

    };
    const val: RClass = {
      fkClass: item.fkClass,
      basicType: item.basicType
    };
    return {key, val}
  }

  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql = undefined

}


interface InitItem {
  fkClass: number,
  basicType: number
}

const updateSql = `
  SELECT DISTINCT
  dfh_pk_class "fkClass",
  dfh_basic_type "basicType"
  FROM
  data_for_history.api_class t1
  WHERE
  t1.tmsp_last_modification >= $1
`

export interface RClass {
  fkClass: number
  basicType: number
}



