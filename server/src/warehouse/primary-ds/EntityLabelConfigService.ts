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
    fkClass: number
    labelParts: LabelPart[]
}


export class EntityLabelConfigService extends PrimaryDataService<InitItem, PClassId, EntityLabelConfig>{

    measure = 1000;

    index = new IndexDBGeneric<PClassId, EntityLabelConfig>(pClassIdToString, stringToPClassId)

    constructor(wh: Warehouse) {
        super(wh, ['modified_data_for_history_api_class'])
    }

    dbItemToKeyVal(item: InitItem): {key: PClassId; val: EntityLabelConfig;} {

        const pkClass = item.pkClass; //365

        // TODO: This needs to be adapted! Load configs for individual projects
        const key: PClassId = {
            fkProject: PK_DEFAULT_CONFIG_PROJECT,
            pkClass: pkClass
        }
        let val: EntityLabelConfig;
        switch (pkClass) {
            case 365:
                val = {
                    fkClass: pkClass,
                    labelParts: [
                        {
                            ordNum: 1,
                            field: {
                                fkProperty: 1113,
                                isOutgoing: true,
                                nrOfStatementsInLabel: 1
                            }
                        }
                    ]
                }
                break;
            case 631:
                val = {
                    fkClass: pkClass,
                    labelParts: [
                        {
                            ordNum: 1,
                            field: {
                                fkProperty: 1432,
                                isOutgoing: true,
                                nrOfStatementsInLabel: 2
                            }
                        }
                    ]
                }
                break;
            case 84:
                val = {
                    fkClass: pkClass,
                    labelParts: [
                        {
                            ordNum: 1,
                            field: {
                                fkProperty: 147,
                                isOutgoing: true,
                                nrOfStatementsInLabel: 1
                            }
                        }
                    ]
                }
                break;
            default:
                val = {
                    fkClass: pkClass,
                    labelParts: [
                        {
                            ordNum: 1,
                            field: {
                                fkProperty: 1111,
                                isOutgoing: false,
                                nrOfStatementsInLabel: 1
                            }
                        }
                    ]
                }
                break;
        }

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
    getDeletesSql = undefined;

}


interface InitItem {
    pkClass: number
}

export const initSql = `
    SELECT DISTINCT pk_class "pkClass"
    FROM data_for_history.v_class
    WHERE $1::text IS NOT NULL
`


const updateSql = `
    SELECT DISTINCT
        dfh_pk_class "pkClass"
    FROM
        data_for_history.api_class t1
    WHERE
        t1.tmsp_last_modification >= $1;`
