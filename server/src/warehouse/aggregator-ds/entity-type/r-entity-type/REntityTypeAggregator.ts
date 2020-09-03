import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityTypeProviders} from './REntityTypePoviders';

export interface ClassLabelConfig {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
    nrOfStatementsInLabel?: number
}


export class REntityTypeAggregator extends AbstractAggregator<REntityId> {

    // the resulting entityTypeLabel
    entityTypeLabel?: string;
    fkEntityType?: number;

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: REntityTypeProviders,
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
        if (entity) {

            if (!entity.fkClass) return this

            const classId = {
                pkClass: entity.fkClass
            }

            // Find the dfh_pk_property of the 'has type'-subproperty going out of this class
            const fkHasTypeSubproperty = await this.providers.dfhClassHasTypeProp.get(classId);

            if (fkHasTypeSubproperty) {
                // Get the 'directed-statements' a.k.a. 'edges' of the entity
                const fieldsWithEdges = await this.providers.rEdges.get(this.id)

                const hasTypeStmts = fieldsWithEdges?.outgoing?.[fkHasTypeSubproperty];

                if (hasTypeStmts?.length) {

                    // this gives the info for war.entity_preview (fk_type)
                    this.fkEntityType = hasTypeStmts[0].fkTarget // fk_object_info

                    // this gives the info for war.entity_preview (type_label)
                    const typeEntityId: REntityId = {
                        pkEntity: this.fkEntityType
                    }

                    const l = await this.providers.rEntityLabel.get(typeEntityId)


                    if (l) {
                        this.entityTypeLabel = l.entityLabel
                        this.labelMissing = false
                    }

                }
            }

        }
        return this
    }

}
