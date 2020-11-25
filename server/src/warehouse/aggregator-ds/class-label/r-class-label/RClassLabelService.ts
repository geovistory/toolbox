import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {rClassIdToString, stringToRClassId} from '../../../base/functions';
import {RClassService} from '../../../primary-ds/class/RClassService';
import {RClassId, rClassIdKeyDefs} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {Warehouse, PK_ENGLISH, PK_DEFAULT_CONFIG_PROJECT} from '../../../Warehouse';
import {RClassLabelAggregator} from './RClassLabelAggregator';
import {RClassLabelProviders} from './RClassLabelProviders';
import {PoolClient} from 'pg';
import {brkOnErr, logSql} from '../../../../utils/helpers';

export type RClassLabelValue = {label?: string}
export class RClassLabelService extends AggregatedDataService<RClassId, RClassLabelValue>{
    creatorDS: RClassService
    aggregator = RClassLabelAggregator;
    providers = RClassLabelProviders;
    constructor(public wh: Warehouse) {
        super(
            wh,
            rClassIdToString,
            stringToRClassId,
            rClassIdKeyDefs
        )
        this.registerCreatorDS(wh.prim.rClass);

    }
    getDependencies() {
        return this.wh.dep.rClassLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        INSERT INTO war.class_preview (fk_class, fk_project, label)
        SELECT "pkClass", 0, val->>'label'
        FROM ${tableAlias}
        ON CONFLICT (fk_class, fk_project) DO UPDATE
        SET label = EXCLUDED.label
        WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
    }

    async aggregateBatch2(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any[] = [], addParam = (val: any) => {
            params.push(val);
            return '$' + params.length;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const addParams = (vals: any[]) => {
        //     return vals.map((val) => addParam(val)).join(',');
        // };
        // default language (en)
        const defaultLang = PK_ENGLISH;

        const dep = this.getDependencies()
        const proClassLabel = dep.proClassLabel.providerDS.index;
        const dfhClassLabel = dep.dfhClassLabel.providerDS.index;

        let changes = 0
        const sql = `
        WITH tw1 AS (
            SELECT * From ${this.tempTable}
            LIMIT ${addParam(limit)} OFFSET ${addParam(offset)}
        ),

        /** STEP 1 */

        -- aggregate from geovistory
        tw2 AS (
            SELECT
                        --receiver keys
                        ${this.index.keyDefs.map(k => `t1."${k.name}" as "r_${k.name}"`)},
                        --provider keys
                        t1. "pkClass"       "p_fkClass",
                        375669              "p_fkProject",
                        18889               "p_fkLanguage",
                        --val
                        jsonb_build_object('label',t2.val->>'label') val,
                        --condition
                        (t2.val->>'label' IS NOT NULL) condition
            FROM        tw1 t1
            LEFT JOIN   ${proClassLabel.schemaTable} t2
            ON
                    t2."fkClass" = t1."pkClass"
            AND     t2."fkLanguage" = ${addParam(defaultLang)}
            AND     t2."fkProject" = ${addParam(PK_DEFAULT_CONFIG_PROJECT)}
            AND     tmsp_deleted IS NULL
        ),
        -- insert or update aggregation results
        tw3 AS (
            INSERT INTO ${this.index.schemaTable} (${this.index.keyCols},val)
            SELECT
                    --receiver keys
                    ${this.index.keyDefs.map(k => `"r_${k.name}"`)},
                    --val
                    val
            FROM    tw2
            WHERE   condition = true
            ON CONFLICT (${this.index.keyCols})
            DO UPDATE
                    SET val = EXCLUDED.val
            WHERE
                    EXCLUDED.val IS DISTINCT FROM ${this.index.schemaTable}.val
            RETURNING *
        ),
        -- insert od update dependencies
        tw4 AS (
            INSERT INTO
            ${dep.proClassLabel.schemaTable}
            (${dep.proClassLabel.keyCols}, tmsp_last_aggregation)
            SELECT
                    --dep index keys
                    ${dep.proClassLabel.providerKeyCols},
                    ${dep.proClassLabel.receiverKeyCols},
                    --tmsp_last_aggregation
                    ${addParam(currentTimestamp)}
            FROM tw2
            ON CONFLICT (${dep.proClassLabel.keyCols})
            DO UPDATE
            SET tmsp_last_aggregation = EXCLUDED.tmsp_last_aggregation
        ),

        /** STEP 2 */

        -- aggregate from ontome
        tw5 AS (
            SELECT
                        --receiver keys
                        ${this.index.keyDefs.map(k => `t1."r_${k.name}"`)},
                        --provider keys
                        t1."r_pkClass"      "p_pkClass",
                        ${`'en'`}           "p_language",
                        --val
                        jsonb_build_object('label',t2.val->>'label') val,
                        --condition
                        (t2.val->>'label' IS NOT NULL) condition
            FROM        tw2 t1
            LEFT JOIN   ${dfhClassLabel.schemaTable} t2
            ON
                        t1.condition = false
            AND
                        t2."pkClass" = t1."r_pkClass"
            AND         t2."language" = ${addParam('en')}
            AND         tmsp_deleted IS NULL
        ),
        -- insert or update aggregation results
        tw6 AS (
            INSERT INTO ${this.index.schemaTable} (${this.index.keyCols},val)
            SELECT
                    --receiver keys
                    ${this.index.keyDefs.map(k => `"r_${k.name}"`)},
                    --val
                    val
            FROM    tw5
            WHERE   condition = true
            ON CONFLICT (${this.index.keyCols})
            DO UPDATE
                    SET val = EXCLUDED.val
            WHERE
                    EXCLUDED.val IS DISTINCT FROM ${this.index.schemaTable}.val
            RETURNING *
        ),
        -- insert od update dependencies
        tw7 AS (
            INSERT INTO
            ${dep.dfhClassLabel.schemaTable}
            (${dep.dfhClassLabel.keyCols}, tmsp_last_aggregation)
            SELECT
                    --dep index keys
                    ${dep.dfhClassLabel.providerKeyCols},
                    ${dep.dfhClassLabel.receiverKeyCols},
                    --tmsp_last_aggregation
                    ${addParam(currentTimestamp)}
            FROM tw5
            ON CONFLICT (${dep.dfhClassLabel.keyCols})
            DO UPDATE
            SET tmsp_last_aggregation = EXCLUDED.tmsp_last_aggregation
        ),

        /** hook */
        twEP2 AS (
            INSERT INTO
            war.class_preview (fk_class, fk_project, label)
            SELECT
            DISTINCT ON (fk_class)
            fk_class, fk_project, label
            FROM
                (
                SELECT
                    "pkClass" fk_class,
                    0 fk_project,
                    val ->> 'label' "label"
                FROM
                    tw3
                UNION ALL
                SELECT
                    "pkClass" fk_class,
                    0 fk_project,
                    val ->> 'label' "label"
                FROM
                    tw6
                ) sub
                ON CONFLICT (fk_class, fk_project) DO UPDATE
                SET label = EXCLUDED.label
                WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label
        ),

        -- count nr of changes
        tw8 AS (
            SELECT count(*)::int FROM tw3
            UNION ALL
            SELECT count(*)::int FROM tw6
        )
        SELECT sum(count) as changes
        FROM tw8;
        `
        logSql(sql, params)
        const result = await brkOnErr(client.query<{changes: number;}>(
            sql, params));
        changes = result.rows?.[0].changes ?? 0;
        return changes
    }
}
