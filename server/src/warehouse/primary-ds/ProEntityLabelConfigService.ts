import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../Warehouse';
import {PClassId, pClassIdKeyDef} from './ProClassFieldsConfigService';
import {Injectable, Inject, forwardRef} from 'injection-js';


export interface LabelPart {
    field?: {
        fkProperty: number,
        isOutgoing: boolean,
        nrOfStatementsInLabel?: number
    }
    ordNum: number
}
export interface EntityLabelConfigVal {
    labelParts?: LabelPart[]
}


@Injectable()
export class ProEntityLabelConfigService extends PrimaryDataService<PClassId, EntityLabelConfigVal>{

    measure = 1000;


    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            ['modified_projects_entity_label_config'],
            pClassIdKeyDef
        )
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
    config: EntityLabelConfigVal
}

const updateSql = `
    SELECT
        fk_project "fkProject",
        fk_class "pkClass",
        config val
    FROM
        projects.entity_label_config
    WHERE
        tmsp_last_modification >= $1`

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
        projects.entity_label_config`
