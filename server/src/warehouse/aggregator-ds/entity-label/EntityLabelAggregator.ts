import { AbstractAggregator } from '../../base/classes/AbstractAggregator';
import { ClassId } from '../../primary-ds/FieldsConfigService';
import { Edge, FieldsPerEntity } from '../../primary-ds/EdgeService';
import { EntityLabelConfig } from '../../primary-ds/EntityLabelConfigService';
import { Entity, EntityId } from '../../primary-ds/EntityService';
import { PK_DEFAULT_CONFIG_PROJECT } from '../../Warehouse';
import { EntityLabelProviders } from './EntityLabelPoviders';

export interface ClassLabelConfig {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
    nrOfStatementsInLabel?: number
}


export class EntityLabelAggregator extends AbstractAggregator<EntityId> {

    // array of strings to create label
    labelArr: string[] = [];

    // the resulting entityLabel
    entityLabel = '(no label)';

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: EntityLabelProviders,
        public id: EntityId
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

            const classId = {
                fkProject: entity.fkProject,
                pkClass: entity.fkClass
            }

            await this.createLabel(entity, classId, fieldsWithEdges)
        }
        return this
    }


    async createLabel(entity: Entity, classId: ClassId, entityFieldsWithEdges?: FieldsPerEntity) {
        // get label config
        const entityLabelConfig = await this.getEntityLabelConfig(classId)
        const labelParts = entityLabelConfig?.labelParts ?? [];

        const promises: Promise<{
            strings: string[];
            labelProviders: number[];
        }>[] = []

        // iterate over fields of label config first
        for (const labelPart of labelParts) {
            if (labelPart.field) {
                const edges = entityFieldsWithEdges?.[labelPart.field.isOutgoing ? 'outgoing' : 'incoming']?.[labelPart.field.fkProperty];
                promises.push(this.createEntityLabelArray(entity, edges, labelPart?.field?.nrOfStatementsInLabel))
            }
        }

        const res = await Promise.all(promises)
        this.labelArr = []
        res.forEach(x => {
            this.labelArr.push(...x.strings)
        })

        // create string
        if (this.labelArr.length > 0) {
            this.labelMissing = false
            this.entityLabel = `${this.labelArr.join(', ')}`;
        }
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
    private async createEntityLabelArray(
        entity: Entity,
        edges?: Edge[],
        maxLabelNr = 1
    ) {
        const result: {
            strings: string[],
            // the id of entities providing the label
            labelProviders: number[]
        } = {
            strings: [],
            labelProviders: []
        }

        // are there any edges?
        if (edges?.length) {

            // stop iteration at smaller number of limit or length of edges
            const stop = Math.min(maxLabelNr, edges.length);

            for (let i = 0; i < stop; i++) {
                const e = edges[i];

                let string;
                if (e.targetIsEntity) {
                    string = await this.providers.entityLabels.get({ pkEntity: e.fkTarget, fkProject: entity.fkProject })
                    result.labelProviders.push(e.fkTarget);
                } else {
                    string = e.targetLabel;
                }

                if (string) result.strings.push(string);

            }
        }
        return result;
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




    private async getEntityLabelConfig(classId: ClassId): Promise<EntityLabelConfig | undefined> {


        let res = await this.providers.entityLabelConfig.get(classId)

        if (res) return res;

        res = await this.providers.entityLabelConfig.get({ ...classId, fkProject: PK_DEFAULT_CONFIG_PROJECT })

        return res;
    }


}
