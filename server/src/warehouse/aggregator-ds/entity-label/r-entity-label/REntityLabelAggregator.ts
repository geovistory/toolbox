import {isEmpty} from 'ramda';
import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {Edge, EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {EntityLabelConfigVal, LabelPart} from '../../../primary-ds/ProEntityLabelConfigService';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../Warehouse';
import {REntityLabelProviders} from './REntityLabelPoviders';
import {EntityLabelVal} from '../entity-label.commons';

export interface ClassLabelConfig {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
    nrOfStatementsInLabel?: number
}


export class REntityLabelAggregator extends AbstractAggregator<EntityLabelVal> {

    // array of strings to create label
    labelArr: string[] = [];

    // the resulting entityLabel
    entityLabel = '(no label)';

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: REntityLabelProviders,
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

        const entity = await this.providers.rEntity.get(this.id);

        if (entity) {

            const fieldsWithEdges = await this.providers.rEdges.get(this.id)

            if (isEmpty(fieldsWithEdges) || (isEmpty(fieldsWithEdges?.outgoing) && isEmpty(fieldsWithEdges?.incoming))) {
                return this.finalize();
            }

            const classId: RClassId = {
                pkClass: entity.fkClass
            }

            await this.createLabel(classId, fieldsWithEdges)
        }
        return this.finalize()
    }

    finalize(): EntityLabelVal {
        return {
            labelMissing: this.labelMissing,
            entityLabel: this.entityLabel
        }
    }

    async createLabel(classId: RClassId, entityFields?: EntityFields) {
        const labelParts = await this.getLabelParts(classId);

        const entityLabel = await this.loopOverLabelParts(labelParts, entityFields)

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
    private async getLabelParts(pClassId: RClassId) {
        // in case of Appellation in a langage use this config hard coded
        // to prevent infinit loops
        if (pClassId.pkClass === 365) {
            return [
                {
                    ordNum: 1,
                    field: {
                        fkProperty: 1113,
                        isOutgoing: true,
                        nrOfStatementsInLabel: 1
                    }
                }
            ]
        }


        const entityLabelConfig = await this.getEntityLabelConfig(pClassId);

        if (entityLabelConfig?.labelParts) {
            return entityLabelConfig.labelParts;
        }

        const identifyingProps = await this.providers.identifyingProperty.get({pkClass: pClassId.pkClass})

        if (identifyingProps?.length) {
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

    private async loopOverLabelParts(labelParts: LabelPart[], entityFields?: EntityFields) {
        const promises: Promise<string>[] = []

        // iterate over label parts
        for (const labelPart of labelParts) {
            if (labelPart.field) {
                const edges = entityFields?.[labelPart.field.isOutgoing ? 'outgoing' : 'incoming']?.[labelPart.field.fkProperty];
                promises.push(this.loopOverEdges(edges, labelPart?.field?.nrOfStatementsInLabel))
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
    *      fkProperty: property of edges/field (needed to get fieldLabel)
    *      isOutgoing: direction of edges/field (needed to get fieldLabel)
    *      maxLabelNr max number of edgeTargetLabels
    * `
    */
    private async loopOverEdges(
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
                    const label = await this.providers.rEntityLabels.get({pkEntity: e.fkTarget})
                    string = label?.entityLabel;
                } else {
                    string = e.targetLabel;
                }

                if (string) result.push(string);

            }
        }
        return result.join(', ');
    }


    private async getEntityLabelConfig(classId: RClassId): Promise<EntityLabelConfigVal | undefined> {

        const res = await this.providers.entityLabelConfig.get({pkClass: classId.pkClass, fkProject: PK_DEFAULT_CONFIG_PROJECT})

        return res;
    }


}
