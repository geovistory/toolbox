// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {ClassLabelService} from '../aggregator-ds/class-label/ClassLabelService';
import {EntityLabelService} from '../aggregator-ds/entity-label/EntityLabelService';
import {Warehouse} from '../Warehouse';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
export class AggregatedDataServices extends DataServiceBundle {
    classLabel: ClassLabelService
    entityLabel: EntityLabelService;

    constructor(main: Warehouse) {
        super()
        this.entityLabel = this.registerDataService(new EntityLabelService(main));
        this.classLabel = this.registerDataService(new ClassLabelService(main))
    }


    async start() {
        await this.entityLabel.updater.startCylcling()
        await this.classLabel.updater.startCylcling()
    }
}
