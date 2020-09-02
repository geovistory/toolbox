// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {PClassLabelService} from '../aggregator-ds/p-class-label/PClassLabelService';
import {PEntityLabelService} from '../aggregator-ds/p-entity-label/PEntityLabelService';
import {PEntityTypeService} from '../aggregator-ds/p-entity-type/PEntityTypeService';
import {Warehouse} from '../Warehouse';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityClassLabelService} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelService';
import {PEntityFullTextService} from '../aggregator-ds/p-entity-full-text/PEntityFullTextService';
import {PClassFieldLabelService} from '../aggregator-ds/p-class-field-label/PClassFieldLabelService';
import {PEntityTimeSpanService} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanService';
import {IdentifyingPropertyService} from '../aggregator-ds/identifying-property/IdentifyingPropertyService';
export class AggregatedDataServices extends DataServiceBundle {
    // Model aggregators
    identifyingProperty: IdentifyingPropertyService;

    // Project aggegators
    pClassLabel: PClassLabelService
    pClassFieldLabel: PClassFieldLabelService
    pEntityLabel: PEntityLabelService;
    pEntityType: PEntityTypeService;
    pEntityClassLabel: PEntityClassLabelService;
    pEntityFullText: PEntityFullTextService;
    pEntityTimeSpan: PEntityTimeSpanService;

    // Repo aggregators

    constructor(wh: Warehouse) {
        super()
        // Model aggregators
        this.identifyingProperty = this.registerDataService(new IdentifyingPropertyService(wh));

        // Project aggegators

        this.pEntityLabel = this.registerDataService(new PEntityLabelService(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeService(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelService(wh))
        this.pClassFieldLabel = this.registerDataService(new PClassFieldLabelService(wh))
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelService(wh))
        this.pEntityFullText = this.registerDataService(new PEntityFullTextService(wh))
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanService(wh))

        // Repo aggregators

    }


    async start() {
        // Model aggregators
        await this.identifyingProperty.updater.startCylcling()

        // Project aggegators
        await this.pClassLabel.updater.startCylcling()
        await this.pClassFieldLabel.updater.startCylcling()
        await this.pEntityClassLabel.updater.startCylcling()
        await this.pEntityLabel.updater.startCylcling()
        await this.pEntityType.updater.startCylcling()
        await this.pEntityFullText.updater.startCylcling()
        await this.pEntityTimeSpan.updater.startCylcling()

        // Repo aggregators

    }
}
