import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {rClassIdToString, stringToRClassId} from '../../base/functions';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
import {Warehouse} from '../../Warehouse';
import {RClassId} from '../DfhClassHasTypePropertyService';


const keyDefs: KeyDefinition[] = [
  {
    name: 'pkClass',
    type: 'integer'
  }
]
export class RClassService extends PrimaryDataService<RClassId, RClass>{

  measure = 1000;

  constructor(public wh: Warehouse) {
    super(
      wh,
      [
        'modified_data_for_history_api_class'
      ],
      rClassIdToString,
      stringToRClassId,
      keyDefs
    )

    /**
     * Add actions after a new RClass is put/updated into index
     */
    // this.afterPut$.subscribe(item => {
    //   // Add update requests on aggregaters based on project class
    //   // wh.agg.rClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
    //   // Generate incoming class field for 'has appellation' property 1111
    //   if ([8, 9, 30].includes(item.val.basicType)) {
    //     const incomingField: RClassFieldId = {
    //       fkClass: item.val.fkClass,
    //       fkProperty: 1111,
    //       isOutgoing: false
    //     }
    //     wh.agg.rClassFieldLabel.updater.addItemToQueue(incomingField).catch(e => console.log(e))
    //   }
    // })


  }

  getUpdatesSql(tmsp: Date) {
    return updateSql
  }
  getDeletesSql(tmsp: Date) {return ''}

}


const updateSql = `
  SELECT DISTINCT ON (dfh_pk_class)
  dfh_pk_class "pkClass",
  jsonb_build_object(
    'fkClass', dfh_pk_class,
    'basicType', dfh_basic_type
  ) val
  FROM
  data_for_history.api_class t1
  WHERE
  t1.tmsp_last_modification >= $1
`

export interface RClass {
  fkClass: number
  basicType: number
}



