// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {PClassLabelService} from '../aggregator-ds/p-class-label/PClassLabelService';
import {PEntityLabelService} from '../aggregator-ds/p-entity-label/PEntityLabelService';
import {Warehouse} from '../Warehouse';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityClassLabelService} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelService';
export class AggregatedDataServices extends DataServiceBundle {
    pClassLabel: PClassLabelService
    pEntityLabel: PEntityLabelService;
    pEntityClassLabel: PEntityClassLabelService;

    constructor(wh: Warehouse) {
        super()
        this.pEntityLabel = this.registerDataService(new PEntityLabelService(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelService(wh))
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelService(wh))
    }


    async start() {
        await this.pClassLabel.updater.startCylcling()
        await this.pEntityClassLabel.updater.startCylcling()
        await this.pEntityLabel.updater.startCylcling()
    }
}
