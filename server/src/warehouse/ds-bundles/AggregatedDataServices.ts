// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {PClassLabelService} from '../aggregator-ds/p-class-label/PClassLabelService';
import {PEntityLabelService} from '../aggregator-ds/p-entity-label/PEntityLabelService';
import {PEntityTypeService} from '../aggregator-ds/p-entity-type/PEntityTypeService';
import {Warehouse} from '../Warehouse';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityClassLabelService} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelService';
import {PEntityTimeSpanService} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanService';
export class AggregatedDataServices extends DataServiceBundle {
    pClassLabel: PClassLabelService
    pEntityLabel: PEntityLabelService;
    pEntityType: PEntityTypeService;
    pEntityClassLabel: PEntityClassLabelService;
    pEntityTimeSpan: PEntityTimeSpanService;

    constructor(wh: Warehouse) {
        super()
        this.pEntityLabel = this.registerDataService(new PEntityLabelService(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeService(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelService(wh))
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelService(wh))
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanService(wh))
    }


    async start() {
        await this.pClassLabel.updater.startCylcling()
        await this.pEntityClassLabel.updater.startCylcling()
        await this.pEntityLabel.updater.startCylcling()
        await this.pEntityType.updater.startCylcling()
        await this.pEntityTimeSpan.updater.startCylcling()
    }
}
