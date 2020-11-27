/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {brkOnErr, logSql} from '../../../../utils/helpers';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassService} from '../../../primary-ds/class/RClassService';
import {RClassId, rClassIdKeyDefs} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH, Warehouse} from '../../../Warehouse';
import {RClassLabelAggregator} from './RClassLabelAggregator';
import {RClassLabelProviders} from './RClassLabelProviders';

export type RClassLabelValue = {label?: string}

@Injectable()
export class RClassLabelService extends AggregatedDataService2<RClassId, RClassLabelValue>{
    creatorDS: RClassService
    aggregator = RClassLabelAggregator;
    providers = RClassLabelProviders;

    dfhClassLabel: DependencyIndex<RClassId, RClassLabelValue, DfhClassLabelId, DfhClassLabelVal>
    proClassLabel: DependencyIndex<RClassId, RClassLabelValue, ProClassLabelId, ProClassLabelVal>

    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            rClassIdKeyDefs
        )
        this.registerCreatorDS(wh.prim.rClass);

        this.dfhClassLabel = this.addDepencency(wh.prim.dfhClassLabel)
        this.proClassLabel = this.addDepencency(wh.prim.proClassLabel)
    }

    onUpsertSql(tableAlias: string) {
        return `
        INSERT INTO war.class_preview (fk_class, fk_project, label)
        SELECT DISTINCT ON ("pkClass") "pkClass", 0, val->>'label'
        FROM ${tableAlias}
        ON CONFLICT (fk_class, fk_project) DO UPDATE
        SET label = EXCLUDED.label
        WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
    }

    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        let changes = 0
        const builder = new AggregatorSqlBuilder(this, currentTimestamp)

        const twBatch = builder.twBatch(limit, offset)

        const geovistoryLabelsTw = builder.joinProviderThroughDepIdx({
            leftTable: twBatch.tableDef,
            joinWith: this.proClassLabel,
            joinOnKeys: {
                fkClass: {leftCol: 'pkClass'},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT},
                fkLanguage: {value: PK_ENGLISH},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            }
        })

        if(!geovistoryLabelsTw.aggTableDef) throw new Error("aggUpsertTableDef missing");
        const ontomeLabelsTw = builder.joinProviderThroughDepIdx({
            leftTable: geovistoryLabelsTw.aggTableDef,
            joinWhereLeftTableCondition: '= false',
            joinWith: this.dfhClassLabel,
            joinOnKeys: {
                pkClass: {leftCol: 'pkClass'},
                language: {value: 'en'},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql:(provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            }
        })
        const count = builder.twCount()

        const hook = builder.twOnUpsertHook()


        const sql = `
        ${twBatch.sql},
        ${geovistoryLabelsTw.sql},
        ${ontomeLabelsTw.sql},
        ${hook.sql},
        ${count.sql}
        `
        logSql(sql, builder.params)
        const result = await brkOnErr(client.query<{changes: number;}>(
            sql, builder.params));
        changes = result.rows?.[0].changes ?? 0;
        return changes
    }



}









// import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
// import {RClassService} from '../../../primary-ds/class/RClassService';
// import {RClassId, rClassIdKeyDefs} from '../../../primary-ds/DfhClassHasTypePropertyService';
// import {Warehouse} from '../../../Warehouse';
// import {RClassLabelAggregator} from './RClassLabelAggregator';
// import {RClassLabelProviders} from './RClassLabelProviders';

// export type RClassLabelValue = {label?: string}
// @Injectable()
// export class RClassLabelService extends AggregatedDataService<RClassId, RClassLabelValue>{
//     creatorDS: RClassService
//     aggregator = RClassLabelAggregator;
//     providers = RClassLabelProviders;
//     constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
//         super(
//             wh,
//             rClassIdKeyDefs
//         )
//         this.registerCreatorDS(wh.prim.rClass);

//     }
//     getDependencies() {
//         return this.wh.dep.rClassLabel
//     };
//     onUpsertSql(tableAlias: string) {
//         return `
//         INSERT INTO war.class_preview (fk_class, fk_project, label)
//         SELECT "pkClass", 0, val->>'label'
//         FROM ${tableAlias}
//         ON CONFLICT (fk_class, fk_project) DO UPDATE
//         SET label = EXCLUDED.label
//         WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
//     }
// }
