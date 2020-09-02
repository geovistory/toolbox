import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {pClassIdToString, stringToPClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';

export interface PClassId {
    fkProject: number,
    pkClass: number
}
export interface ClassField {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
}
export type ProClassFieldVal = ClassField[]
export class ProClassFieldsConfigService extends PrimaryDataService<InitItem, PClassId, ProClassFieldVal>{


    measure = 1000;


    index = new IndexDBGeneric<PClassId, ProClassFieldVal>(pClassIdToString, stringToPClassId)


    constructor(wh: Warehouse) {
        super(wh, ['modified_projects_class_field_config'])
    }
    dbItemToKeyVal(item: InitItem): {key: PClassId; val: ProClassFieldVal;} {
        const key: PClassId = {
            fkProject: item.fkProject,
            pkClass: item.fkSourceClass
        }
        const val: ProClassFieldVal = item.fields
        return {key, val}
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
   }
   getDeletesSql = undefined;

    // /**
    //  * returns class config of requested project, else of default config project
    //  * @param classId
    //  */
    // async getClassConfig(classId: PClassId) {
    //     let x = await this.index.getFromIdx(classId)
    //     if (x) return x

    //     x = await this.index.getFromIdx({
    //         fkProject: PK_DEFAULT_CONFIG_PROJECT,
    //         pkClass: classId.pkClass
    //     })

    //     return x
    // }

}


interface InitItem {
    fkProject: number,
    fkSourceClass: number,
    fields: {
        fkProperty: number,
        isOutgoing: boolean,
        ordNum: number,
        nrOfStatementsInLabel?: number
    }[]
}

export const updateSql = `
WITH tw1 AS (
	SELECT
	fk_project,
	CASE WHEN
		fk_domain_class IS NOT NULL
		THEN true
		ELSE false
		END
		property_is_outgoing,
	coalesce(fk_domain_class, fk_range_class) fk_source_class,
	fk_property,
	ord_num
    FROM projects.class_field_config
    WHERE tmsp_last_modification >= $1
	ORDER BY ord_num
)
    SELECT
    fk_project "fkProject",
    fk_source_class "fkSourceClass",
    json_agg(json_build_object(
		'fkProperty', fk_property,
		'isOutgoing', property_is_outgoing,
		'ordNum', ord_num
	)) fields
	FROM tw1
	GROUP BY fk_project, fk_source_class;
`
