import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {PEntityId} from '../../../primary-ds/entity/PEntityService';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';

export class PEntityClassLabelAggregator extends AbstractAggregator<PEntityId> {

    // the resulting entityClassLabel
    entityClassLabel = '(no label)';

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: PEntityClassLabelProviders,
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

            const classId = {
                fkProject: entity.fkProject,
                pkClass: entity.fkClass
            }

            const classLabel = await this.providers.classLabels.get(classId)

            if (classLabel) {
                this.labelMissing = false
                this.entityClassLabel = classLabel;
            }

        }
        return this
    }




}
