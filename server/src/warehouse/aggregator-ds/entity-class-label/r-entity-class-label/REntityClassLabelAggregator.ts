import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityClassLabelProviders} from './REntityClassLabelPoviders';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';

export class REntityClassLabelAggregator extends AbstractAggregator<REntityId> {

    // the resulting entityClassLabel
    entityClassLabel = '(no label)';

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: REntityClassLabelProviders,
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

        const entity = await this.providers.entity.get(this.id);

        if (entity) {

            // load previous providers in a cache
            // in the end (after create), this cahche will contain only deprecated providers
            // that can then be deleted from dependency indexes
            await this.providers.load()

            const classId: RClassId = {
                pkClass: entity.fkClass
            }

            const classLabel = await this.providers.rClassLabels.get(classId)

            if (classLabel) {
                this.labelMissing = false
                this.entityClassLabel = classLabel;
            }

        }
        return this
    }




}
