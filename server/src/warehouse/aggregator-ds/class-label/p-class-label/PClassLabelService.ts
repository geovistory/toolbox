import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {PClassService} from '../../../primary-ds/class/PClassService';
import {DfhClassLabelId, DfhClassLabelService, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {PClassId, pClassIdKeyDef} from '../../../primary-ds/ProClassFieldsConfigService';
import {ProClassLabelId, ProClassLabelService, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {ProjectId, ProjectVal, ProProjectService} from '../../../primary-ds/ProProjectService';
import {Warehouse, PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {PClassLabelAggregator} from './PClassLabelAggregator';
import {PClassLabelProviders} from './PClassLabelProviders';
import {PoolClient} from 'pg';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';

export interface PClassLabelVal {label?: string}
@Injectable()
export class PClassLabelService extends AggregatedDataService2<PClassId, PClassLabelVal>{
    aggregator = PClassLabelAggregator;
    providers = PClassLabelProviders;
    depProProject: DependencyIndex<PClassId, PClassLabelVal, ProjectId, ProjectVal>
    depDfhClassLabel: DependencyIndex<PClassId, PClassLabelVal, DfhClassLabelId, DfhClassLabelVal>
    depProClassLabel: DependencyIndex<PClassId, PClassLabelVal, ProClassLabelId, ProClassLabelVal>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PClassService)) pClass: PClassService,
        @Inject(forwardRef(() => ProProjectService)) proProject: ProProjectService,
        @Inject(forwardRef(() => DfhClassLabelService)) dfhClassLabel: DfhClassLabelService,
        @Inject(forwardRef(() => ProClassLabelService)) proClassLabel: ProClassLabelService) {
        super(
            wh,
            pClassIdKeyDef
        )
        this.registerCreatorDS({dataService: pClass});
        this.depProProject = this.addDepencency(proProject)
        this.depDfhClassLabel = this.addDepencency(dfhClassLabel)
        this.depProClassLabel = this.addDepencency(proClassLabel)

    }
    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        INSERT INTO war.class_preview (fk_class, fk_project, label)
        SELECT  DISTINCT ON ("pkClass") "pkClass", "fkProject", val->>'label'
        FROM ${tableAlias}
        ON CONFLICT (fk_class, fk_project) DO UPDATE
        SET label = EXCLUDED.label
        WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
    }
    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
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
            joinWithDepIdx: this.depProClassLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                fkClass: {leftCol: 'pkClass'},
                fkProject: {leftCol: 'fkProject'},
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
            joinWithDepIdx: this.depProClassLabel,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                fkClass: {leftCol: 'pkClass'},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT},
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
            joinWithDepIdx: this.depDfhClassLabel,
            joinOnKeys: {
                pkClass: {leftCol: 'pkClass'},
                language: {leftCustom: {name: 'fkLanguage', type: 'int'}},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: (provider) => `jsonb_build_object('label',${provider}.val->>'label')`,
                upsert: {whereCondition: '= true'}
            }
        })

        /**
        * Try to get label in english
        */

        // from project
        const enFromProject = await builder.joinProviderThroughDepIdx({
            leftTable: proLangOntoMe.aggregation.tableDef,
            joinWithDepIdx: this.depProClassLabel,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                fkClass: {leftCol: 'pkClass'},
                fkProject: {leftCol: 'fkProject'},
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
            joinWithDepIdx: this.depProClassLabel,
            joinWhereLeftTableCondition: '= false',
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
            },
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkLanguage: number}>,
        })
        // from ontome
        await builder.joinProviderThroughDepIdx({
            leftTable: enFromDefaultProject.aggregation.tableDef,
            joinWhereLeftTableCondition: '= false',
            joinWithDepIdx: this.depDfhClassLabel,
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
        // await builder.printQueries()
        const count = await builder.executeQueries()
        return count
    }

}
