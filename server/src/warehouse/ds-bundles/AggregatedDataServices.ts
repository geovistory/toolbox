// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {PEntityClassLabelService} from '../aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {IdentifyingPropertyService} from '../aggregator-ds/identifying-property/IdentifyingPropertyService';
import {PClassFieldLabelService} from '../aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {PClassLabelService} from '../aggregator-ds/class-label/p-class-label/PClassLabelService';
import {PEntityFullTextService} from '../aggregator-ds/p-entity-full-text/PEntityFullTextService';
import {PEntityLabelService} from '../aggregator-ds/p-entity-label/PEntityLabelService';
import {PEntityTimeSpanService} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanService';
import {PEntityTypeService} from '../aggregator-ds/p-entity-type/PEntityTypeService';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {Warehouse} from '../Warehouse';
import {RClassLabelService} from '../aggregator-ds/class-label/r-class-label/RClassLabelService';
import {REntityClassLabelService} from '../aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {RClassFieldLabelService} from '../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
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
    rClassLabel: RClassLabelService
    rClassFieldLabel: RClassFieldLabelService
    rEntityClassLabel: REntityClassLabelService


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
        this.rClassLabel = this.registerDataService(new RClassLabelService(wh))
        this.rClassFieldLabel = this.registerDataService(new RClassFieldLabelService(wh))
        this.rEntityClassLabel = this.registerDataService(new REntityClassLabelService(wh))

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
        await this.rClassLabel.updater.startCylcling()

    }
}
