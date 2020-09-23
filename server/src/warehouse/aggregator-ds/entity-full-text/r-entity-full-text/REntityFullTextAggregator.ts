import {flatten} from 'ramda';
import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {Edge, EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../Warehouse';
import {RClassFieldId} from '../../class-field-label/r-class-field-label/RClassFieldLabelService';
import {REntityFullTextProviders} from './REntityFullTextPoviders';
import {isHiddenOutgoingProperty, isHiddenIngoingProperty} from '../entity-full-text.commons';

export interface ClassLabelConfig {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
    nrOfStatementsInLabel?: number
}


export class REntityFullTextAggregator extends AbstractAggregator<REntityId> {

    // Defines the maximum number of statements per field
    // taken into consideration for the fulltext
    // Prevents from having enormous fulltext e.g. of Groups with thousands
    // of memeberships.
    readonly MAX_STMTS_PER_FIELD = 10;


    fullTextArr: string[] = [];
    fullText = '';

    constructor(
        public providers: REntityFullTextProviders,
        public id: REntityId
    ) {
        super()
    }


    /************************************************************************
     * Methods for creating entity label
     ************************************************************************/

    /**
     *  Create entity label
     *
     *  Gets values from Indexes and chaches dependencies in itself.
     */
    async create() {
        // load previous providers in a cache
        // in the end (after create), this cahche will contain only deprecated providers
        // that can then be deleted from dependency indexes
        await this.providers.load()

        const entity = await this.providers.rEntity.get(this.id);
        if (!entity) return this;

        // get entity fields of that entity
        const edges = await this.providers.rEdges.get(this.id)
        if (!edges) return this;
        // if no edges, return

        // get fields of that class
        const rClassId: RClassId = {pkClass: entity.fkClass}
        // look for config of efault config project
        const classFields = await this.providers.pClassFields.get({pkClass: rClassId.pkClass, fkProject: PK_DEFAULT_CONFIG_PROJECT})

        // create fulltext
        const fullText = await this.loopOverFields(edges, classFields, entity.fkClass)

        // get class label
        let classLabel = await this.providers.rClassLabel.get(rClassId)

        classLabel = classLabel ?? `[${entity.fkClass}]`;
        this.fullText = `${classLabel} – ${fullText}`;
        return this
    }


    /**
     * This function loops over all fields. Per field:
     * 1. it adds string elements to the full text of the entity
     * 2. it adds all the edges (statements) to the entity
     *
     * The order of the iteration is defined so:
     * - it first loops over fields of the class fields configuration in the given order of these fields
     * - if edges are left, it loops over the remaining edges, grouped by field, in an arbitrary order
     *
     * @param entityFields
     */
    async loopOverFields(entityFields: EntityFields, classFields: ProClassFieldVal = [], fkClass: number) {

        const loopedCache: {[key: string]: boolean;} = {};

        // loop over the fields of this class config first
        const promises: Promise<string[]>[] = []

        for (const cF of classFields) {
            const k = fieldKey(cF.fkProperty, cF.isOutgoing);

            if (!loopedCache[k]) {
                // get the edges of that field
                const edges = entityFields?.[cF.isOutgoing ? 'outgoing' : 'incoming']?.[cF.fkProperty];

                // add edges to resulting entity
                promises.push(this.loopOverEdges(edges, fkClass, cF.fkProperty, cF.isOutgoing));
            }

            // mark field as covered
            loopedCache[k] = true;
        }

        // loop over the remaining fields of the entity (not covered by class config)
        const isOutgoing = true;
        for (const fkProperty in entityFields.outgoing) {

            if (!loopedCache[fieldKey(fkProperty, isOutgoing)] && !isHiddenOutgoingProperty(fkProperty)) {
                const edges = entityFields.outgoing[fkProperty];
                promises.push(this.loopOverEdges(edges, fkClass, parseInt(fkProperty, 10), isOutgoing));
            }

        }
        const isIncoming = false;
        for (const fkProperty in entityFields.incoming) {

            if (!loopedCache[fieldKey(fkProperty, isIncoming)] && !isHiddenIngoingProperty(fkProperty)) {
                const edges = entityFields.incoming[fkProperty];
                promises.push(this.loopOverEdges(edges, fkClass, parseInt(fkProperty, 10), isIncoming));
            }
        }

        const res = await Promise.all(promises)
        return flatten(res).join(', ');
    }



    /**
    * Creates strings array for given field-edges (edges must be of same field, i.e. property + direction)
    *
    * example result: ["fieldLabel:", "edgeTargetLabel1", "edgeTargetLabel2", ...]
    *
    * @param edges Array of edges
    * @param config `
    *      fkProject: project
    *      fkClass: class of the entity
    *      fkProperty: property of edges/field (needed to get fieldLabel)
    *      isOutgoing: direction of edges/field (needed to get fieldLabel)
    *      addFieldLabel: if true, fieldLabel is added as first element of array
    *      singleQuotesForEdgeLabels: if true creates "'edgeTargetLabel1'" else "edgeTargetLabel1"
    *      maxLabelNr max number of edgeTargetLabels
    * `
    */
    private async loopOverEdges(
        edges: Edge[],
        fkClass: number,
        fkProperty: number,
        isOutgoing: boolean
    ) {
        const result: string[] = [];


        const fieldId: RClassFieldId = {fkClass, fkProperty, isOutgoing}

        // are there any edges?
        if (edges?.length) {

            // stop iteration at smaller number of limit or length of edges
            const stop = Math.min(this.MAX_STMTS_PER_FIELD, edges.length);

            for (let i = 0; i < stop; i++) {
                const e = edges[i];
                let fieldLabel = '';

                if (i === 0) {
                    // Get the fieldLabel (the label for property in correct direction)
                    let l = await this.providers.rClassFieldLabel.get(fieldId)
                    l = l ?? `[c${fkClass},p${fkProperty},${isOutgoing ? 'out' : 'in'},repo]`
                    fieldLabel = (`${l}: `);
                }

                let targetLabel;
                if (e.targetIsEntity) {
                    // Fetch repo variant of related entity label
                    const rEntLabel = await this.providers.rEntityLabel.get({pkEntity: e.fkTarget})
                    targetLabel = rEntLabel?.entityLabel ?? `[e${e.fkTarget}]`

                    // const targetEntityId: REntityId = {fkProject, pkEntity: e.fkTarget}
                    // const fkTargetClass = (await this.providers.rEntity.get(targetEntityId))?.fkClass

                    // const targetClassLabel = (fkTargetClass ?
                    //     await this.providers.pClassLabel.get({fkProject, pkClass: fkTargetClass}) :
                    //     false) ?? `[c${fkTargetClass}]`;

                    // targetLabel = `${targetClassLabel} – ${targetLabel}`


                } else {
                    targetLabel = e.targetLabel;
                }

                result.push(`${fieldLabel}'${targetLabel}'`);

            }
        }
        return result;
    }


}

function fieldKey(fkProperty: number | string, isOutgoing: boolean) {
    return fkProperty + '_' + isOutgoing;
}

