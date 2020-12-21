import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {KeyDefinition} from '../../../base/interfaces/KeyDefinition';
import {DfhPropertyLabelId, DfhPropertyLabelService, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
import {PPropertyService} from '../../../primary-ds/property/PPropertyService';
import {ProjectId, ProjectVal, ProProjectService} from '../../../primary-ds/ProProjectService';
import {ProPropertyLabelId, ProPropertyLabelService, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH, Warehouse} from '../../../Warehouse';

export interface PClassFieldLabelId {
    fkProject: number,
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}
export interface PClassFieldLabelVal {
    label?: string
}
export const pClassFieldKeyDef: KeyDefinition[] = [
    {name: 'fkProject', type: 'integer'},
    {name: 'fkClass', type: 'integer'},
    {name: 'fkProperty', type: 'integer'},
    {name: 'isOutgoing', type: 'boolean'},
]
@Injectable()
export class PClassFieldLabelService extends AggregatedDataService2<PClassFieldLabelId, PClassFieldLabelVal>{
    // aggregator = PClassFieldLabelAggregator;
    // providers = PClassFieldLabelProviders;
    depProProject: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, ProjectId, ProjectVal>
    depDfhPropertyLabel: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, DfhPropertyLabelId, DfhPropertyLabelVal>
    depProPropertyLabel: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, ProPropertyLabelId, ProPropertyLabelVal>
    batchSize=100000;

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PPropertyService)) pProperty: PPropertyService,
        @Inject(forwardRef(() => ProProjectService)) proProject: ProProjectService,
        @Inject(forwardRef(() => DfhPropertyLabelService)) dfhPropertyLabel: DfhPropertyLabelService,
        @Inject(forwardRef(() => ProPropertyLabelService)) proPropertyLabel: ProPropertyLabelService,
    ) {
        super(
            wh,
            pClassFieldKeyDef
        )

        this.registerCreatorDS({
            dataService: pProperty,
            customSql: [
                {
                    select: `"fkProject" as "fkProject", "fkDomain" as "fkClass", "pkProperty" as "fkProperty", true as "isOutgoing"`,
                },
                {
                    select: `"fkProject" as "fkProject", "fkRange" as "fkClass", "pkProperty" as "fkProperty", false as "isOutgoing"`,
                }
            ]
        })
        this.depProProject = this.addDepencency(proProject)
        this.depDfhPropertyLabel = this.addDepencency(dfhPropertyLabel)
        this.depProPropertyLabel = this.addDepencency(proPropertyLabel)
    }

    async aggregateBatch(client: PoolClient, client2: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const projectLang = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depProProject,
            joinOnKeys: {
                pkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                providerVal: {fkLanguage: 'IS NOT NULL'}
            },
            createCustomObject: (() => `jsonb_build_object(
                'fkLanguage', t2.val->'fkLanguage'
            )`) as CustomValSql<{fkLanguage: number}>,
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object()`,
                upsert: {whereCondition: '= false'}
            }
        })

        /**
         * Try to get label in project language
         */

        // from project
        const proLangFromProject = await builder.joinProviderThroughDepIdx({
            leftTable: projectLang.aggregation.tableDef,
            joinWithDepIdx: this.depProPropertyLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                fkClass: {leftCol: 'fkClass'},
                fkProject: {leftCol: 'fkProject'},
                fkProperty: {leftCol: 'fkProperty'},
                isOutgoing: {leftCol: 'isOutgoing'},
                fkLanguage: {leftCustom: {name: 'fkLanguage', type: 'int'}},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            },
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkLanguage: number}>,
        })

        // from geovistory
        const proLangFromDefaultProject = await builder.joinProviderThroughDepIdx({
            leftTable: proLangFromProject.aggregation.tableDef,
            joinWithDepIdx: this.depProPropertyLabel,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                fkClass: {leftCol: 'fkClass'},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT},
                fkProperty: {leftCol: 'fkProperty'},
                isOutgoing: {leftCol: 'isOutgoing'},
                fkLanguage: {leftCustom: {name: 'fkLanguage', type: 'int'}},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            },
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkLanguage: number}>,
        })
        // from ontome
        const proLangOntoMe = await builder.joinProviderThroughDepIdx({
            leftTable: proLangFromDefaultProject.aggregation.tableDef,
            joinWhereLeftTableCondition: '= false',
            joinWithDepIdx: this.depDfhPropertyLabel,
            joinOnKeys: {
                pkProperty: {leftCol: 'fkProperty'},
                language: {leftCustom: {name: 'fkLanguage', type: 'int'}},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: this.completeReverseLabels(),
                upsert: {whereCondition: '= true'}
            }
        })

        /**
        * Try to get label in english
        */

        // from project
        const enFromProject = await builder.joinProviderThroughDepIdx({
            leftTable: proLangOntoMe.aggregation.tableDef,
            joinWithDepIdx: this.depProPropertyLabel,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                fkClass: {leftCol: 'fkClass'},
                fkProject: {leftCol: 'fkProject'},
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
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkLanguage: number}>,
        })

        // from geovistory
        const enFromDefaultProject = await builder.joinProviderThroughDepIdx({
            leftTable: enFromProject.aggregation.tableDef,
            joinWithDepIdx: this.depProPropertyLabel,
            joinWhereLeftTableCondition: '= false',
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
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkLanguage: number}>,
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
