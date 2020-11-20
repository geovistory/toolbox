import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {PEntityId} from '../../../primary-ds/entity/PEntityService';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';
import {PEntityClassLabelVal} from './PEntityClassLabelService';

export class PEntityClassLabelAggregator extends AbstractAggregator<PEntityClassLabelVal> {

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

        const entity = await this.providers.pEntity.get(this.id);

        if (entity) {


            const classId = {
                fkProject: entity.fkProject,
                pkClass: entity.fkClass
            }

            const classLabel = await this.providers.pClassLabels.get(classId)

            if (classLabel?.label) {
                this.labelMissing = false
                this.entityClassLabel = classLabel.label;
            }

        }
        return this.finalize()
    }


    finalize(): PEntityClassLabelVal {
        return {
            entityClassLabel: this.entityClassLabel
        }
    }

}
