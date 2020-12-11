/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable, Optional} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, JoinedProvider} from '../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../base/classes/DependencyIndex';
import {PEntityId, pEntityKeyDefs, PEntityService} from '../../primary-ds/entity/PEntityService';
import {REntityId, REntityService} from '../../primary-ds/entity/REntityService';
import {Warehouse} from '../../Warehouse';
import {EntityLabelVal} from '../entity-label/entity-label.commons';
import {PEntityLabelService} from '../entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../entity-label/r-entity-label/REntityLabelService';
import {PEntityClassLabelService, PEntityClassLabelVal} from '../entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {REntityClassLabelService, REntityClassLabelVal} from '../entity-class-label/r-entity-class-label/REntityClassLabelService';
import {PEntityFullTextService, PEntityFullTextVal} from '../entity-full-text/p-entity-full-text/PEntityFullTextService';
import {REntityFullTextService, REntityFullTextVal} from '../entity-full-text/r-entity-full-text/REntityFullTextService';
import {PEntityTimeSpanVal, PEntityTimeSpanService} from '../entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {REntityTimeSpanVal, REntityTimeSpanService, REntityTimeSpan} from '../entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {PEntityTypeVal, PEntityTypeService} from '../entity-type/p-entity-type/PEntityTypeService';
import {REntityTypeVal, REntityTypeService} from '../entity-type/r-entity-type/REntityTypeService';

export type EntityPreviewVal = {
    entityLabel: string,
    classLabel: string,
    fullText: string
    timeSpan?: REntityTimeSpan;
    firstSecond?: number
    lastSecond?: number
    fkType: number
    typeLabel: string
}
type JoinedProviders = (JoinedProvider<PEntityId, EntityPreviewVal, unknown> | undefined)[];

@Injectable()
export class EntityPreviewService extends AggregatedDataService2<PEntityId, EntityPreviewVal>{


    depPEntityLabel: DependencyIndex<PEntityId, EntityPreviewVal, PEntityId, EntityLabelVal>
    depREntityLabel: DependencyIndex<PEntityId, EntityPreviewVal, REntityId, EntityLabelVal>

    depPEntityClassLabel: DependencyIndex<PEntityId, EntityPreviewVal, PEntityId, PEntityClassLabelVal>
    depREntityClassLabel: DependencyIndex<PEntityId, EntityPreviewVal, REntityId, REntityClassLabelVal>

    depPEntityFullText: DependencyIndex<PEntityId, EntityPreviewVal, PEntityId, PEntityFullTextVal>
    depREntityFullText: DependencyIndex<PEntityId, EntityPreviewVal, REntityId, REntityFullTextVal>

    depPEntityTimeSpan: DependencyIndex<PEntityId, EntityPreviewVal, PEntityId, PEntityTimeSpanVal>
    depREntityTimeSpan: DependencyIndex<PEntityId, EntityPreviewVal, REntityId, REntityTimeSpanVal>

    depPEntityType: DependencyIndex<PEntityId, EntityPreviewVal, PEntityId, PEntityTypeVal>
    depREntityType: DependencyIndex<PEntityId, EntityPreviewVal, REntityId, REntityTypeVal>



    batchSize = 100000;

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Optional() @Inject(forwardRef(() => PEntityService)) pEntity?: PEntityService,
        @Optional() @Inject(forwardRef(() => REntityService)) rEntity?: REntityService,
        @Optional() @Inject(forwardRef(() => PEntityLabelService)) pEntityLabel?: PEntityLabelService,
        @Optional() @Inject(forwardRef(() => REntityLabelService)) rEntityLabel?: REntityLabelService,
        @Optional() @Inject(forwardRef(() => PEntityClassLabelService)) pEntityClassLabel?: PEntityClassLabelService,
        @Optional() @Inject(forwardRef(() => REntityClassLabelService)) rEntityClassLabel?: REntityClassLabelService,
        @Optional() @Inject(forwardRef(() => PEntityFullTextService)) pEntityFullText?: PEntityFullTextService,
        @Optional() @Inject(forwardRef(() => REntityFullTextService)) rEntityFullText?: REntityFullTextService,
        @Optional() @Inject(forwardRef(() => PEntityTimeSpanService)) pEntityTimeSpan?: PEntityTimeSpanService,
        @Optional() @Inject(forwardRef(() => REntityTimeSpanService)) rEntityTimeSpan?: REntityTimeSpanService,
        @Optional() @Inject(forwardRef(() => PEntityTypeService)) pEntityType?: PEntityTypeService,
        @Optional() @Inject(forwardRef(() => REntityTypeService)) rEntityType?: REntityTypeService,

    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        if (pEntity) this.registerCreatorDS({dataService: pEntity});
        if (rEntity) this.registerCreatorDS({
            dataService: rEntity,
            customSql: [{
                select: `"pkEntity", 0::int as "fkProject"`,
            }]
        });

        // Entity Label
        if (pEntityLabel) this.depPEntityLabel = this.addDepencency(pEntityLabel)
        if (rEntityLabel) this.depREntityLabel = this.addDepencency(rEntityLabel)

        // Entity Class Label
        if (pEntityClassLabel) this.depPEntityClassLabel = this.addDepencency(pEntityClassLabel)
        if (rEntityClassLabel) this.depREntityClassLabel = this.addDepencency(rEntityClassLabel)

        // Entity Full Text
        if (pEntityFullText) this.depPEntityFullText = this.addDepencency(pEntityFullText)
        if (rEntityFullText) this.depREntityFullText = this.addDepencency(rEntityFullText)

        // Entity Time Span
        if (pEntityTimeSpan) this.depPEntityTimeSpan = this.addDepencency(pEntityTimeSpan)
        if (rEntityTimeSpan) this.depREntityTimeSpan = this.addDepencency(rEntityTimeSpan)

        // Entity Type
        if (pEntityType) this.depPEntityType = this.addDepencency(pEntityType)
        if (rEntityType) this.depREntityType = this.addDepencency(rEntityType)
    }

    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET
            class_label =       val->>'classLabel',
            entity_label =      val->>'entityLabel',
            full_text =         val->>'fullText',
            type_label =        val->>'typeLabel',
            fk_type =           (val->>'fkType')::int,
            time_span =         val->'timeSpan',
            first_second =      (val->>'firstSecond')::bigint,
            last_second =       (val->>'lastSecond')::bigint
        FROM ${tableAlias}
        WHERE pk_entity = "pkEntity"
        AND project = "fkProject"
        AND (
                entity_label,
                class_label,
                entity_label,
                full_text,
                type_label,
                fk_type,
                time_span,
                first_second,
                last_second
            )
            IS DISTINCT FROM
            (
                val->>'entityLabel',
                val->>'classLabel',
                val->>'entityLabel',
                val->>'fullText',
                val->>'typeLabel',
                (val->>'fkType')::int,
                val->'timeSpan',
                (val->>'firstSecond')::bigint,
                (val->>'lastSecond')::bigint
            )
        `

    }
    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const p: JoinedProviders = []
        // EntityLabel
        await this.joinProjectColumnTable(p, builder, [{r: 'entityLabel', p: 'entityLabel'}], this.depPEntityLabel)
        await this.joinRepoColumnTable(p, builder, [{r: 'entityLabel', p: 'entityLabel'}], this.depREntityLabel)

        // EntityClassLabel
        await this.joinProjectColumnTable(p, builder, [{r: 'classLabel', p: 'entityClassLabel'}], this.depPEntityClassLabel)
        await this.joinRepoColumnTable(p, builder, [{r: 'classLabel', p: 'entityClassLabel'}], this.depREntityClassLabel)

        // EntityFullText
        await this.joinProjectColumnTable(p, builder, [{r: 'fullText', p: 'fullText'}], this.depPEntityFullText)
        await this.joinRepoColumnTable(p, builder, [{r: 'fullText', p: 'fullText'}], this.depREntityFullText)

        // EntityTimeSpan
        await this.joinProjectColumnTable(p, builder, [
            {r: 'timeSpan', p: 'timeSpan'},
            {r: 'firstSecond', p: 'firstSecond'},
            {r: 'lastSecond', p: 'lastSecond'}
        ], this.depPEntityTimeSpan)
        await this.joinRepoColumnTable(p, builder, [
            {r: 'timeSpan', p: 'timeSpan'},
            {r: 'firstSecond', p: 'firstSecond'},
            {r: 'lastSecond', p: 'lastSecond'}
        ], this.depREntityTimeSpan)

        // EntityTimeSpan
        await this.joinProjectColumnTable(p, builder, [{r: 'fkType', p: {n: 'fkType', t: 'int'}}, {r: 'typeLabel', p: 'typeLabel'}], this.depPEntityType)
        await this.joinRepoColumnTable(p, builder, [{r: 'fkType', p: {n: 'fkType', t: 'int'}}, {r: 'typeLabel', p: 'typeLabel'}], this.depREntityType)

        const providers = p.filter(item => !!item) as JoinedProvider<
            PEntityId,
            EntityPreviewVal,
            Partial<EntityPreviewVal>
        >[]
        /**
         * join columns of entity preview
         */
        const joinTbl = builder.createTableName();
        const createJoinTbl = builder.createTableStmt(joinTbl)
        if (!createJoinTbl.length) throw new Error("at least one join table needed");

        const joinSql = `
        -- join columns of entity preview
        ${createJoinTbl} (
            SELECT
            t1."r_pkEntity",
            t1."r_fkProject",
            ${providers.map((x, i) => `t${i + 2}.custom`).join(' || ')} val
            FROM ${builder.batchTmpTable.tableDef.tableName} t1
            ${providers.map((x, i) => `
            LEFT JOIN ${x.aggregation.tableDef.tableName} t${i + 2}
                ON t1."r_pkEntity"=t${i + 2}."r_pkEntity"
                AND t1."r_fkProject"=t${i + 2}."r_fkProject"
            `).join('\n')}

        )`
        const joinedColumns = builder.registerTmpTable<PEntityId, EntityPreviewVal, never>(joinSql, [], joinTbl)


        await builder.tmpTableUpsertAggregations(this.index, joinedColumns.tableDef.tableName)
        builder.registerUpsertHook()

        await builder.printQueries()
        const count = await builder.executeQueries()
        return count
    }


    async joinProjectColumnTable(
        p: JoinedProviders,
        builder: AggregatorSqlBuilder<PEntityId, EntityPreviewVal>,
        properties: {
            r: string,
            p?: string | {n: string, t: 'int' | 'text'},
        }[],
        depIdx?: DependencyIndex<PEntityId, EntityPreviewVal, any, any>
    ) {
        if (depIdx) {
            const x = await builder.joinProviderThroughDepIdx({
                leftTable: builder.batchTmpTable.tableDef,
                joinWithDepIdx: depIdx,
                joinOnKeys: {
                    pkEntity: {leftCol: 'pkEntity'},
                    fkProject: {leftCol: 'fkProject'}
                },
                conditionTrueIf: {},
                createCustomObject: () => `jsonb_strip_nulls(jsonb_build_object(
                   ${properties.map(prop => {
                    if (!prop.p) return `'${prop.r}', t2.val`
                    else if (typeof prop.p === 'string') {
                        return `'${prop.r}', t2.val->>'${prop.p}'`
                    } else {
                        return `'${prop.r}', (t2.val->>'${prop.p.n}')::${prop.p.t}`
                    }
                }).join(',\n')}
                ))`,
            })
            p.push(x)
        }
    }
    async joinRepoColumnTable(
        p: JoinedProviders,
        builder: AggregatorSqlBuilder<PEntityId, EntityPreviewVal>,
        properties: {
            r: string,
            p?: string | {n: string, t: 'int' | 'text'},
        }[],
        depIdx?: DependencyIndex<PEntityId, EntityPreviewVal, any, any>
    ) {
        if (depIdx) {
            const x = await builder.joinProviderThroughDepIdx({
                leftTable: builder.batchTmpTable.tableDef,
                joinWithDepIdx: depIdx,
                joinOnKeys: {
                    pkEntity: {leftCol: 'pkEntity'},
                },
                joinOnCustom: ['"r_fkProject" = 0'],
                conditionTrueIf: {},
                createCustomObject: () => `jsonb_strip_nulls(jsonb_build_object(
                    ${properties.map(prop => {
                    if (!prop.p) return `'${prop.r}', t2.val`
                    else if (typeof prop.p === 'string') {
                        return `'${prop.r}', t2.val->>'${prop.p}'`
                    } else {
                        return `'${prop.r}', (t2.val->>'${prop.p.n}')::${prop.p.t}`
                    }
                }).join(',\n')}
                ))`,
            })
            p.push(x)
        }
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
// export class EntityPreview extends AggregatedDataService<RClassId, RClassLabelValue>{
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
