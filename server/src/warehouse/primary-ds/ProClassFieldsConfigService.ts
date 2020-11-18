import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {pClassIdToString, stringToPClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';

export interface PClassId {
    fkProject: number,
    pkClass: number
}
export interface ClassField {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
}
export const pClassIdKeyDef: KeyDefinition[] = [
    {
        name: 'fkProject',
        type: 'integer'
    },
    {
        name: 'pkClass',
        type: 'integer'
    }
]
export type ProClassFieldVal = ClassField[]
export class ProClassFieldsConfigService extends PrimaryDataService<PClassId, ProClassFieldVal>{
    measure = 1000;
    constructor(wh: Warehouse) {
        super(
            wh,
            ['modified_projects_class_field_config'],
            pClassIdToString,
            stringToPClassId,
            pClassIdKeyDef
        )
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};


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
    fk_source_class "pkClass",
    json_agg(json_build_object(
		'fkProperty', fk_property,
		'isOutgoing', property_is_outgoing,
		'ordNum', ord_num
	)) val
	FROM tw1
	GROUP BY fk_project, fk_source_class
`
