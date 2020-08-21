import { classIdToString, stringToClassId } from '../base/functions';
import { IndexDBGeneric } from '../base/classes/IndexDBGeneric';
import { PrimaryDataService } from '../base/classes/PrimaryDataService';
import { PK_DEFAULT_CONFIG_PROJECT, Warehouse } from '../Warehouse';

export interface ClassId {
    fkProject: number,
    pkClass: number
}
export interface Field {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
}
export interface FieldsConfig {
    fkClass: number
    fields: Field[]
}


export class FieldsConfigService extends PrimaryDataService<InitItem, ClassId, FieldsConfig>{


    measure = 1000;
    updatesSql = updateSql
    deletesSql = '';

    index = new IndexDBGeneric<ClassId, FieldsConfig>(classIdToString, stringToClassId)


    constructor(main: Warehouse) {
        super(main, [])
    }
    dbItemToKeyVal(item: InitItem): { key: ClassId; val: FieldsConfig; } {
        const key: ClassId = {
            fkProject: item.fkProject,
            pkClass: item.fkSourceClass
        }
        const val: FieldsConfig = {
            fkClass: item.fkSourceClass,
            fields: item.fields
        }
        return { key, val }
    }


    /**
     * returns class config of requested project, else of default config project 
     * @param classId 
     */
    async getClassConfig(classId: ClassId) {
        let x = await this.index.getFromIdx(classId)
        if (x) return x

        x = await this.index.getFromIdx({
            fkProject: PK_DEFAULT_CONFIG_PROJECT,
            pkClass: classId.pkClass
        })

        return x
    }

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