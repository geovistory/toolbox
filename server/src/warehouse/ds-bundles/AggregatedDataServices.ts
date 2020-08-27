// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {PClassLabelService} from '../aggregator-ds/p-class-label/PClassLabelService';
import {PEntityLabelService} from '../aggregator-ds/p-entity-label/PEntityLabelService';
import {PEntityTypeService} from '../aggregator-ds/p-entity-type/PEntityTypeService';
import {Warehouse} from '../Warehouse';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityClassLabelService} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelService';
import {PEntityFullTextService} from '../aggregator-ds/p-entity-full-text/PEntityFullTextService';
import {PPropertyLabelService} from '../aggregator-ds/p-property-label/PPropertyLabelService';
import {PEntityTimeSpanService} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanService';
export class AggregatedDataServices extends DataServiceBundle {
    pClassLabel: PClassLabelService
    pPropertyLabel: PPropertyLabelService
    pEntityLabel: PEntityLabelService;
    pEntityType: PEntityTypeService;
    pEntityClassLabel: PEntityClassLabelService;
    pEntityFullText: PEntityFullTextService;
    pEntityTimeSpan: PEntityTimeSpanService;

    constructor(wh: Warehouse) {
        super()
        this.pEntityLabel = this.registerDataService(new PEntityLabelService(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeService(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelService(wh))
        this.pPropertyLabel = this.registerDataService(new PPropertyLabelService(wh))
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelService(wh))
        this.pEntityFullText = this.registerDataService(new PEntityFullTextService(wh))
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanService(wh))
    }


    async start() {
        await this.pClassLabel.updater.startCylcling()
        await this.pEntityClassLabel.updater.startCylcling()
        await this.pEntityLabel.updater.startCylcling()
        await this.pEntityType.updater.startCylcling()
        await this.pEntityFullText.updater.startCylcling()
        await this.pEntityTimeSpan.updater.startCylcling()
    }
}
