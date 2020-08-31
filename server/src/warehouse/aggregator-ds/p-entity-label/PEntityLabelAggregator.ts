import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {EntityLabelConfig, LabelPart} from '../../primary-ds/EntityLabelConfigService';
import {PClassId} from '../../primary-ds/PClassFieldsConfigService';
import {Edge, EntityFields} from '../../primary-ds/PEdgeService';
import {PEntityId} from '../../primary-ds/PEntityService';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../Warehouse';
import {PEntityLabelProviders} from './PEntityLabelPoviders';
import {keys} from 'lodash';

export interface ClassLabelConfig {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
    nrOfStatementsInLabel?: number
}


export class PEntityLabelAggregator extends AbstractAggregator<PEntityId> {

    // array of strings to create label
    labelArr: string[] = [];

    // the resulting entityLabel
    entityLabel = '(no label)';

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: PEntityLabelProviders,
        public id: PEntityId
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

        const entity = await this.providers.entity.get(this.id);

        if (entity) {

            // load previous providers in a cache
            // in the end (after create), this cahche will contain only deprecated providers
            // that can then be deleted from dependency indexes
            await this.providers.load()

            const fieldsWithEdges = await this.providers.edges.get(this.id)

            if (keys(fieldsWithEdges).length === 0) return this;

            const classId = {
                fkProject: entity.fkProject,
                pkClass: entity.fkClass
            }

            await this.createLabel(classId, fieldsWithEdges)
        }
        return this
    }


    async createLabel(classId: PClassId, entityFields?: EntityFields) {
        const labelParts = await this.getLabelParts(classId);

        const entityLabel = await this.loopOverLabelParts(classId.fkProject, labelParts, entityFields)

        if (entityLabel !== '') {
            this.labelMissing = false
            this.entityLabel = entityLabel;
        }
        return entityLabel
    }



    /**
     * gets the label parts for given project class.
     *
     * Logic:
     * 1. if there is a entity label config for that class, return it
     * 2. else if there are identity defining props for that class, create
     *    a label config on the fly and return it
     * 3. return empty array -> will lead to no label of the entity
     *
     * @param pClassId
     */
    private async getLabelParts(pClassId: PClassId) {
        const entityLabelConfig = await this.getEntityLabelConfig(pClassId);

        if (entityLabelConfig?.labelParts) {
            return entityLabelConfig.labelParts;
        }

        const identifyingProps = await this.providers.identifyingProperty.get({pkClass: pClassId.pkClass})

        if (identifyingProps) {
            return identifyingProps.map((item, i) => {
                const labelPart: LabelPart = {
                    field: {
                        fkProperty: item.fkProperty,
                        isOutgoing: true,
                        nrOfStatementsInLabel: 2
                    },
                    ordNum: i
                }
                return labelPart
            })
        }

        return [
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

    private async loopOverLabelParts(fkProject: number, labelParts: LabelPart[], entityFields?: EntityFields) {
        const promises: Promise<string>[] = []

        // iterate over label parts
        for (const labelPart of labelParts) {
            if (labelPart.field) {
                const edges = entityFields?.[labelPart.field.isOutgoing ? 'outgoing' : 'incoming']?.[labelPart.field.fkProperty];
                promises.push(this.loopOverEdges(fkProject, edges, labelPart?.field?.nrOfStatementsInLabel))
            }
        }

        const strings = await Promise.all(promises)
        return strings.join(', ')
    }

    /**
    * Creates strings array for given field-edges (edges must be of same field, i.e. property + direction)
    *
    * example result: ["fieldLabel:", "edgeTargetLabel1", "edgeTargetLabel2", ...]
    *
    * @param edges Array of edges
    * @param config `
    *      fkProject: project
    *      fkProperty: property of edges/field (needed to get fieldLabel)
    *      isOutgoing: direction of edges/field (needed to get fieldLabel)
    *      maxLabelNr max number of edgeTargetLabels
    * `
    */
    private async loopOverEdges(
        fkProject: number,
        edges?: Edge[],
        maxLabelNr = 1
    ) {
        const result: string[] = []


        // are there any edges?
        if (edges?.length) {

            // stop iteration at smaller number of limit or length of edges
            const stop = Math.min(maxLabelNr, edges.length);

            for (let i = 0; i < stop; i++) {
                const e = edges[i];

                let string;
                if (e.targetIsEntity) {
                    string = await this.providers.entityLabels.get({pkEntity: e.fkTarget, fkProject})
                } else {
                    string = e.targetLabel;
                }

                if (string) result.push(string);

            }
        }
        return result.join(', ');
    }


    /************************************************************************
     * Methods for registering values of this in other indexes
    ************************************************************************/


    // /**
    //  * Register the aggregated result and cleanup its dependencies (providers)
    //  */
    // async register() {

    //     /**
    //      * update the result index `EntityPreviewIdx`:
    //      * this adds update requests if needed
    //      */
    //     await this.main.agg.entityLabel.add(this.id, this.entityLabel)


    //     /**
    //     * cleanup dependency indexes:
    //     * remove providers from last cycle that are not needed anymore
    //     */
    //     await this.providers.removeProvidersFromIndexes()

    //     return this
    // }




    private async getEntityLabelConfig(classId: PClassId): Promise<EntityLabelConfig | undefined> {


        let res = await this.providers.entityLabelConfig.get(classId)

        if (res) return res;

        res = await this.providers.entityLabelConfig.get({...classId, fkProject: PK_DEFAULT_CONFIG_PROJECT})

        return res;
    }


}
