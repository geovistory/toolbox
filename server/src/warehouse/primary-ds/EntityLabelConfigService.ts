import { classIdToString, stringToClassId } from '../base/functions';
import { IndexDBGeneric } from '../base/classes/IndexDBGeneric';
import { PrimaryDataService } from '../base/classes/PrimaryDataService';
import { PK_DEFAULT_CONFIG_PROJECT, Warehouse } from '../Warehouse';
import { ClassId } from './FieldsConfigService';


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


export class EntityLabelConfigService extends PrimaryDataService<InitItem, ClassId, EntityLabelConfig>{

    measure = 1000;
    updatesSql = initSql;
    deletesSql = '';

    index = new IndexDBGeneric<ClassId, EntityLabelConfig>(classIdToString, stringToClassId)

    constructor(main: Warehouse) {
        super(main, [])
    }

    dbItemToKeyVal(item: InitItem): { key: ClassId; val: EntityLabelConfig; } {

        const pkClass = item.pkClass; //365

        // TODO: This needs to be adapted! Load configs for individual projects
        const key: ClassId = {
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

        return { key, val }
    }

    /**
     * returns entity label config of requested project, else of default config project
     * @param classId
     */
    async getEntityLabelConfig(classId: ClassId) {
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
    pkClass: number
}

export const initSql = `
    SELECT DISTINCT pk_class "pkClass"
    FROM data_for_history.v_class
`
