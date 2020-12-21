import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityClassLabelProviders} from './REntityClassLabelPoviders';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {REntityClassLabelVal} from './REntityClassLabelService';

export class REntityClassLabelAggregator extends AbstractAggregator<REntityClassLabelVal> {

    // the resulting entityClassLabel
    entityClassLabel?: string = '(no label)';

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

            const classId: RClassId = {
                pkClass: entity.fkClass
            }

            const classLabel = await this.providers.rClassLabels.get(classId)

            if (classLabel?.label) {
                this.entityClassLabel = classLabel.label;
            }

        }
        return this.finalize()
    }

    finalize(): REntityClassLabelVal {
        return {
            entityClassLabel: this.entityClassLabel
        }
    }


}
