// import {forwardRef, Inject, Injectable} from 'injection-js';
// import {PrimaryDataService} from '../base/classes/PrimaryDataService';
// import {Warehouse} from '../Warehouse';
// import {RClassId, rClassIdKeyDefs} from './DfhClassHasTypePropertyService';


// export interface EntityPathConfigKey {
//     whereSourceClass: number
// }
// interface EntityPathConfig {
//     pathName: string
//     isOutgoing: boolean
//     whereSourceClass: number
//     whereProperty: number
//     whereTargetClass: number
// }
// export interface EntityPathConfigVal {
//     pathConfigs: EntityPathConfig[]
// }


// @Injectable()
// export class EntityPathConfigService extends PrimaryDataService<RClassId, EntityPathConfigVal>{

//     measure = 1000;


//     constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
//         super(
//             wh,
//             ['modified_entity_path_config'],
//             rClassIdKeyDefs
//         )
//     }

//     getUpdatesSql(tmsp: Date) {
//         return updateSql
//     }
//     getDeletesSql(tmsp: Date) {return ''};
// }

// const items: EntityPathConfig[] = [
//     {
//         pathName: 'sourcesPath',
//         isOutgoing: true,
//         whereSourceClass: 503, // Expression portion
//         whereProperty: 1317, // is part of
//         whereTargetClass: 503 // Expression portion
//     },
//     {
//         pathName: 'sourcesPath',
//         isOutgoing: true,
//         whereSourceClass: 503, // Expression portion
//         whereProperty: 1317, // is part of
//         whereTargetClass: 218 // Expression
//     },
//     {
//         pathName: 'sourcesPath',
//         isOutgoing: true,
//         whereSourceClass: 218, // Expression
//         whereProperty: 979, // carriers provided by
//         whereTargetClass: 219 // Manifestation Product Type
//     }
// ]

// const updateSql = `
//     WITH tw1 as (
//         SELECT json_array_elements('${JSON.stringify(items)}'::json) as val
//         WHERE $1::timestamp with time zone IS NOT NULL
//     )
//     select
//         (val->>'whereSourceClass')::int as "pkClass",
//         json_build_object('pathConfigs',json_agg(val)) val
//     FROM tw1
//     GROUP BY val->>'whereSourceClass'
// `


