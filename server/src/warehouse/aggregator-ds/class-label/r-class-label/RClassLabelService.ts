/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassService} from '../../../primary-ds/class/RClassService';
import {RClassId, rClassIdKeyDefs} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelId, DfhClassLabelService, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelService, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH, Warehouse} from '../../../Warehouse';
import {RClassLabelAggregator} from './RClassLabelAggregator';
import {RClassLabelProviders} from './RClassLabelProviders';

export type RClassLabelValue = {label?: string}

@Injectable()
export class RClassLabelService extends AggregatedDataService2<RClassId, RClassLabelValue>{
    aggregator = RClassLabelAggregator;
    providers = RClassLabelProviders;

    dfhClassLabel: DependencyIndex<RClassId, RClassLabelValue, DfhClassLabelId, DfhClassLabelVal>
    proClassLabel: DependencyIndex<RClassId, RClassLabelValue, ProClassLabelId, ProClassLabelVal>
    batchSize = 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => RClassService)) rClass: RClassService,
        @Inject(forwardRef(() => DfhClassLabelService)) dfhClassLabel: DfhClassLabelService,
        @Inject(forwardRef(() => ProClassLabelService)) proClassLabel: ProClassLabelService
    ) {
        super(
            wh,
            rClassIdKeyDefs
        )
        this.registerCreatorDS({dataService: rClass});

        this.dfhClassLabel = this.addDepencency(dfhClassLabel)
        this.proClassLabel = this.addDepencency(proClassLabel)
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
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const geovistoryLabelsTw = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.proClassLabel,
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

        if (!geovistoryLabelsTw.aggregation) throw new Error("aggUpsertTableDef missing");
        await builder.joinProviderThroughDepIdx({
            leftTable: geovistoryLabelsTw.aggregation.tableDef,
            joinWhereLeftTableCondition: '= false',
            joinWithDepIdx: this.dfhClassLabel,
            joinOnKeys: {
                pkClass: {leftCol: 'pkClass'},
                language: {value: PK_ENGLISH},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            }
        })

        builder.registerUpsertHook()
        const count = await builder.executeQueries()
        // const count = await builder.printQueries()
        return count
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
