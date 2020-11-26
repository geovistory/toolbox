import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
import {Warehouse} from '../../Warehouse';
import {Injectable, Inject, forwardRef} from 'injection-js';
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
@Injectable()
export class RPropertyService extends PrimaryDataService<RPropertyId, RPropertyVal>{

  measure = 1000;



  constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
    super(
      wh,
      [
        'modified_data_for_history_api_property',
        'modified_data_for_history_api_class'
      ],
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

  --- add generic incoming 1111 for all classes of basic type 8/9/30
  UNION
  SELECT DISTINCT
    1111 "pkProperty",
    365 "fkDomain",
    t1.dfh_pk_class "fkRange",
    jsonb_build_object(
      'fkProperty', 1111,
      'fkDomain', 365,
      'fkRange',  t1.dfh_pk_class
    ) val
  FROM data_for_history.api_class t1
  WHERE t1.dfh_pk_class <> 365
  AND  t1.tmsp_last_modification >= $1
  AND t1.dfh_basic_type IN (8, 9, 30)
  GROUP BY t1.dfh_pk_class
`




