// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {PEntityClassLabelService} from '../aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {IdentifyingPropertyService} from '../aggregator-ds/identifying-property/IdentifyingPropertyService';
import {PClassFieldLabelService} from '../aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {PClassLabelService} from '../aggregator-ds/class-label/p-class-label/PClassLabelService';
import {PEntityFullTextService} from '../aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {PEntityLabelService} from '../aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {PEntityTimeSpanService} from '../aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {PEntityTypeService} from '../aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {Warehouse} from '../Warehouse';
import {RClassLabelService} from '../aggregator-ds/class-label/r-class-label/RClassLabelService';
import {REntityClassLabelService} from '../aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {RClassFieldLabelService} from '../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {REntityLabelService} from '../aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {REntityTimeSpanService} from '../aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {REntityTypeService} from '../aggregator-ds/entity-type/r-entity-type/REntityTypeService';
import {REntityFullTextService} from '../aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {AggregatedDataService} from '../base/classes/AggregatedDataService';
import {combineLatest, Observable} from 'rxjs';
import {filter, mapTo} from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AggregatedDataServices extends DataServiceBundle<AggregatedDataService<any,any>> {
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
    rEntityLabel: REntityLabelService;
    rEntityType: REntityTypeService;
    rEntityClassLabel: REntityClassLabelService
    rEntityFullText: REntityFullTextService;
    rEntityTimeSpan: REntityTimeSpanService;

    ready$: Observable<boolean>

    constructor(wh: Warehouse) {
        super()
        // // Model aggregators
        this.identifyingProperty = this.registerDataService(new IdentifyingPropertyService(wh));

        // // Project aggegators
        // this.pClassLabel = this.registerDataService(new PClassLabelService(wh))
        // this.pClassFieldLabel = this.registerDataService(new PClassFieldLabelService(wh))
        // this.pEntityLabel = this.registerDataService(new PEntityLabelService(wh));
        // this.pEntityType = this.registerDataService(new PEntityTypeService(wh));
        // this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelService(wh))
        // this.pEntityFullText = this.registerDataService(new PEntityFullTextService(wh))
        // this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanService(wh))

        // // Repo aggregators
        this.rClassLabel = this.registerDataService(new RClassLabelService(wh))
        // this.rClassFieldLabel = this.registerDataService(new RClassFieldLabelService(wh))
        // this.rEntityLabel = this.registerDataService(new REntityLabelService(wh));
        // this.rEntityType = this.registerDataService(new REntityTypeService(wh));
        // this.rEntityClassLabel = this.registerDataService(new REntityClassLabelService(wh))
        // this.rEntityFullText = this.registerDataService(new REntityFullTextService(wh))
        // this.rEntityTimeSpan = this.registerDataService(new REntityTimeSpanService(wh))

        this.ready$ = combineLatest(
            this.registered.map(ds => ds.index.ready$.pipe(filter(r => r === true))),
        ).pipe(mapTo(true))
    }


    async startCycling() {
        // // Model aggregators
        // await this.identifyingProperty.updater.startCylcling()

        // // Project aggegators
        // await this.pClassLabel.updater.startCylcling()
        // await this.pClassFieldLabel.updater.startCylcling()
        // await this.pEntityClassLabel.updater.startCylcling()
        // await this.pEntityLabel.updater.startCylcling()
        // await this.pEntityType.updater.startCylcling()
        // await this.pEntityFullText.updater.startCylcling()
        // await this.pEntityTimeSpan.updater.startCylcling()

        // // Repo aggregators
        await this.rClassLabel.startUpdate()
        // await this.rClassFieldLabel.updater.startCylcling()
        // await this.rEntityClassLabel.updater.startCylcling()
        // await this.rEntityLabel.updater.startCylcling()
        // await this.rEntityType.updater.startCylcling()
        // await this.rEntityFullText.updater.startCylcling()
        // await this.rEntityTimeSpan.updater.startCylcling()
    }
    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }

}
