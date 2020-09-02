import {pClassIdToString, stringToPClassId} from '../base/functions';
import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../Warehouse';
import {PClassId} from './PClassFieldsConfigService';


export interface LabelPart {
    field?: {
        fkProperty: number,
        isOutgoing: boolean,
        nrOfStatementsInLabel?: number
    }
    ordNum: number
}
export interface EntityLabelConfig {
    labelParts?: LabelPart[]
}


export class ProEntityLabelConfigService extends PrimaryDataService<InitItem, PClassId, EntityLabelConfig>{

    measure = 1000;

    index = new IndexDBGeneric<PClassId, EntityLabelConfig>(pClassIdToString, stringToPClassId)

    constructor(wh: Warehouse) {
        super(wh, ['modified_projects_entity_label_config'])
    }

    dbItemToKeyVal(item: InitItem): {key: PClassId; val: EntityLabelConfig;} {


        const key: PClassId = {
            fkProject: item.fkProject,
            pkClass: item.pkClass
        }
        const val: EntityLabelConfig = item.config;
        return {key, val}
    }

    /**
     * returns entity label config of requested project, else of default config project
     * @param classId
     */
    async getEntityLabelConfig(classId: PClassId) {
        let x = await this.index.getFromIdx(classId)
        if (x) return x
        x = await this.index.getFromIdx({
            fkProject: PK_DEFAULT_CONFIG_PROJECT,
            pkClass: classId.pkClass
        })
        return x
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };

}


interface InitItem {
    pkClass: number
    fkProject: number
    config: EntityLabelConfig
}

const updateSql = `
    SELECT
        fk_project "fkProject",
        fk_class "pkClass",
        config
    FROM
        projects.entity_label_config
    WHERE
        tmsp_last_modification >= $1;`

const deleteSql = `
    SELECT
         fk_project "fkProject",
         fk_class "pkClass"
    FROM
        projects.entity_label_config_vt
    WHERE
        upper(sys_period) >= $1

    EXCEPT

    SELECT
        fk_project "fkProject",
        fk_class "pkClass"
    FROM
        projects.entity_label_config;`
