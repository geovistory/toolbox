import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {DfhPropertyLabelId, DfhPropertyLabelService, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
import {RPropertyService} from '../../../primary-ds/property/RPropertyService';
import {ProPropertyLabelId, ProPropertyLabelService, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH, Warehouse} from '../../../Warehouse';

export interface RClassFieldId {
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}
export interface RClassFieldVal {
    label?: string
}
export const rClassFieldKeyDef: KeyDefinition[] = [
    {name: 'fkClass', type: 'integer'},
    {name: 'fkProperty', type: 'integer'},
    {name: 'isOutgoing', type: 'boolean'},
]
@Injectable()
export class RClassFieldLabelService extends AggregatedDataService2<RClassFieldId, RClassFieldVal>{
    // aggregator = RClassFieldLabelAggregator;
    // providers = RClassFieldLabelProviders;
    depDfhPropertyLabel: DependencyIndex<RClassFieldId, RClassFieldVal, DfhPropertyLabelId, DfhPropertyLabelVal>
    depProPropertyLabel: DependencyIndex<RClassFieldId, RClassFieldVal, ProPropertyLabelId, ProPropertyLabelVal>
    batchSize=100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => RPropertyService)) rProperty: RPropertyService,
        @Inject(forwardRef(() => DfhPropertyLabelService)) dfhPropertyLabel: DfhPropertyLabelService,
        @Inject(forwardRef(() => ProPropertyLabelService)) proPropertyLabel: ProPropertyLabelService

    ) {
        super(
            wh,
            rClassFieldKeyDef
        )

        this.registerCreatorDS({
            dataService: rProperty,
            customSql: [
                {
                    select: `"fkDomain" as "fkClass", "pkProperty" as "fkProperty", true as "isOutgoing"`,
                },
                {
                    select: `"fkRange" as "fkClass", "pkProperty" as "fkProperty", false as "isOutgoing"`,
                }
            ]
        })
        this.depDfhPropertyLabel = this.addDepencency(dfhPropertyLabel)
        this.depProPropertyLabel = this.addDepencency(proPropertyLabel)

    }
    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)


        // from geovistory
        const enFromDefaultProject = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depProPropertyLabel,
            joinOnKeys: {
                fkClass: {leftCol: 'fkClass'},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT},
                fkProperty: {leftCol: 'fkProperty'},
                isOutgoing: {leftCol: 'isOutgoing'},
                fkLanguage: {value: PK_ENGLISH},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            },
        })

        // from ontome
        await builder.joinProviderThroughDepIdx({
            leftTable: enFromDefaultProject.aggregation.tableDef,
            joinWhereLeftTableCondition: '= false',
            joinWithDepIdx: this.depDfhPropertyLabel,
            joinOnKeys: {
                pkProperty: {leftCol: 'fkProperty'},
                language: {value: PK_ENGLISH},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: this.completeReverseLabels(),
                upsert: {whereCondition: '= true'}
            }
        })

        builder.registerUpsertHook()
        // await builder.printQueries()
        const count = await builder.executeQueries()
        return count
    }


    private completeReverseLabels(): (provTable: string) => string {
        return (provider) => `jsonb_build_object('label',
                    CASE WHEN t1."r_isOutgoing" = true THEN  ${provider}.val->>'label'
                    ELSE '[reverse of: ' || (${provider}.val->>'label')::TEXT || ']'
                    END
                )`;
    }
}
