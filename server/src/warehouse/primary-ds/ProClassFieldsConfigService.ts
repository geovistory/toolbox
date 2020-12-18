import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
import {Warehouse} from '../Warehouse';
import {Injectable, Inject, forwardRef} from 'injection-js';

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
export interface ProClassFieldVal {
    outgoing: {
        [fkProperty: number]: {ordNum: number}
    }
    incoming: {
        [fkProperty: number]: {ordNum: number}
    }
} // = ClassField[]
@Injectable()
export class ProClassFieldsConfigService extends PrimaryDataService<PClassId, ProClassFieldVal>{
    measure = 1000;
    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            ['modified_projects_class_field_config'],
            pClassIdKeyDef
        )
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};


}

export const updateSql = `
WITH tw1 AS(
	SELECT
	fk_project,
	fk_domain_class fk_source_class,
	json_object_agg(fk_property, json_build_object(
		'ordNum', ord_num
	) ORDER BY ord_num ) outgoing,
	max(tmsp_last_modification)
    FROM projects.class_field_config
	WHERE fk_domain_class IS NOT NULL
	GROUP BY fk_project, fk_source_class
),
tw2 AS (
	SELECT
	fk_project,
	fk_range_class fk_source_class,
	json_object_agg(fk_property, json_build_object(
		'ordNum', ord_num
	) ORDER BY ord_num ) incoming,
	max(tmsp_last_modification)
    FROM projects.class_field_config
	WHERE fk_range_class IS NOT NULL
	GROUP BY fk_project, fk_source_class
)
SELECT
coalesce(t1.fk_project,t2.fk_project) "fkProject",
coalesce(t1.fk_source_class,t2.fk_source_class) "pkClass",
json_build_object(
		'outgoing', COALESCE(outgoing,'{}'::json),
		'incoming', COALESCE(incoming,'{}'::json)
	) val
FROM tw1 t1
FULL OUTER JOIN tw2 t2 ON t1.fk_project=t2.fk_project
AND  t1.fk_source_class=t2.fk_source_class
WHERE t1.max >= $1 OR t2.max >= $1


--WITH tw1 AS (
--	SELECT
--	fk_project,
--	CASE WHEN
--		fk_domain_class IS NOT NULL
--		THEN true
--		ELSE false
--		END
--		property_is_outgoing,
--	coalesce(fk_domain_class, fk_range_class) fk_source_class,
--	fk_property,
--	ord_num
--    FROM projects.class_field_config
--    WHERE tmsp_last_modification >= $1
--	ORDER BY ord_num
--)
--    SELECT
--    fk_project "fkProject",
--    fk_source_class "pkClass",
--    json_agg(json_build_object(
--		'fkProperty', fk_property,
--		'isOutgoing', property_is_outgoing,
--		'ordNum', ord_num
--	)) val
--	FROM tw1
--	GROUP BY fk_project, fk_source_class
`

