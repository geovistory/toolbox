import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {PEntityId} from '../../primary-ds/PEntityService';
import {PEntityTypeProviders} from './PEntityTypePoviders';

export interface ClassLabelConfig {
    fkProperty: number,
    isOutgoing: boolean,
    ordNum: number
    nrOfStatementsInLabel?: number
}


export class PEntityTypeAggregator extends AbstractAggregator<PEntityId> {

    // the resulting entityTypeLabel
    entityTypeLabel?: string;
    fkEntityType?: number;

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: PEntityTypeProviders,
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

        const entity = await this.providers.pEntity.get(this.id);

        if (entity) {

            // load previous providers in a cache
            // in the end (after create), this cahche will contain only deprecated providers
            // that can then be deleted from dependency indexes
            await this.providers.load()

            const classId = {
                fkProject: entity.fkProject,
                pkClass: entity.fkClass
            }

            // Find the dfh_pk_property of the 'has type'-subproperty going out of this class
            const fkHasTypeSubproperty = 1110;

            // Get the 'directed-statements' a.k.a. 'edges' of the entity
            const fieldsWithEdges = await this.providers.pEdges.get(this.id)

            const hasTypeStmts = fieldsWithEdges?.outgoing?.[fkHasTypeSubproperty];

            if (hasTypeStmts?.length) {

                // this gives the info for war.entity_preview (fk_type)
                this.fkEntityType = hasTypeStmts[0].fkTarget // fk_object_info

                // this gives the info for war.entity_preview (type_label)
                const typeEntityId: PEntityId = {
                    fkProject: entity.fkProject,
                    pkEntity: this.fkEntityType
                }

                const entityTypeLabel = await this.providers.pEntityLabel.get(typeEntityId)

                // TODO: find repo entity label if this is undefined

                if (entityTypeLabel) {
                    this.entityTypeLabel = entityTypeLabel
                }

            }

        }
        return this
    }

}
