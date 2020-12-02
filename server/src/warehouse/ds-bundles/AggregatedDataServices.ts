// import { EntityPreviewService } from '../data-services/aggregated/EntityPreviewService';
import {Injectable} from 'injection-js';
import {PClassFieldLabelService} from '../aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {RClassFieldLabelService} from '../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {PClassLabelService} from '../aggregator-ds/class-label/p-class-label/PClassLabelService';
import {RClassLabelService} from '../aggregator-ds/class-label/r-class-label/RClassLabelService';
import {PEntityClassLabelService} from '../aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {REntityClassLabelService} from '../aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {PEntityFullTextService} from '../aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {REntityFullTextService} from '../aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {PEntityLabelService} from '../aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {PEntityTimeSpanService} from '../aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {REntityTimeSpanService} from '../aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {PEntityTypeService} from '../aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {REntityTypeService} from '../aggregator-ds/entity-type/r-entity-type/REntityTypeService';
import {IdentifyingPropertyService} from '../aggregator-ds/identifying-property/IdentifyingPropertyService';
import {AggregatedDataServicesBase} from '../base/classes/AggregatedDataServicesBase';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AggregatedDataServices extends AggregatedDataServicesBase {
    constructor(
        // Model aggregators
        public identifyingProperty: IdentifyingPropertyService,

        // Project aggegators
        public pClassLabel: PClassLabelService,
        public pClassFieldLabel: PClassFieldLabelService,
        public pEntityClassLabel: PEntityClassLabelService,
        public pEntityLabel: PEntityLabelService,
        public pEntityType: PEntityTypeService,
        public pEntityFullText: PEntityFullTextService,
        public pEntityTimeSpan: PEntityTimeSpanService,

        // Repo aggregators
        public rClassLabel: RClassLabelService,
        public rClassFieldLabel: RClassFieldLabelService,
        public rEntityClassLabel: REntityClassLabelService,
        public rEntityLabel: REntityLabelService,
        public rEntityType: REntityTypeService,
        public rEntityFullText: REntityFullTextService,
        public rEntityTimeSpan: REntityTimeSpanService,
    ) {
        super(identifyingProperty,
            pClassLabel,
            pClassFieldLabel,
            pEntityClassLabel,
            pEntityLabel,
            pEntityType,
            pEntityFullText,
            pEntityTimeSpan,
            rClassLabel,
            rClassFieldLabel,
            rEntityClassLabel,
            rEntityLabel,
            rEntityType,
            rEntityFullText,
            rEntityTimeSpan)
    }
}




// @Injectable()
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export class AggregatedDataServices extends DataServiceBundle<AggregatedDataService<any, any>> {


//     ready$: Observable<boolean>

//     constructor(
//         // Model aggregators
//         public identifyingProperty: IdentifyingPropertyService,

//         // Project aggegators
//         public pClassLabel: PClassLabelService,
//         public pClassFieldLabel: PClassFieldLabelService,
//         public pEntityClassLabel: PEntityClassLabelService,
//         public pEntityLabel: PEntityLabelService,
//         public pEntityType: PEntityTypeService,
//         public pEntityFullText: PEntityFullTextService,
//         public pEntityTimeSpan: PEntityTimeSpanService,

//         // Repo aggregators
//         public rClassLabel: RClassLabelService,
//         public rClassFieldLabel: RClassFieldLabelService,
//         public rEntityClassLabel: REntityClassLabelService,
//         public rEntityLabel: REntityLabelService,
//         public rEntityType: REntityTypeService,
//         public rEntityFullText: REntityFullTextService,
//         public rEntityTimeSpan: REntityTimeSpanService,
//     ) {
//         super()
//         // // Model aggregators




//         this.registerDataService(this.identifyingProperty); // rEntityLabel

//         // // Project aggegators
//         //  this.registerDataService(this.pClassLabel)
//         //  this.registerDataService(this.pClassFieldLabel)
//         //  this.registerDataService(this.pEntityLabel);
//         //  this.registerDataService(this.pEntityType);
//         //  this.registerDataService(this.pEntityClassLabel)
//         //  this.registerDataService(this.pEntityFullText)
//         //  this.registerDataService(this.pEntityTimeSpan)

//         // // // Repo aggregators
//         // this.registerDataService(this.rClassLabel) // rClassLabel
//         //  this.registerDataService(this.rClassFieldLabel)
//         this.registerDataService(this.rEntityLabel); // rEntityLabel
//         //  this.registerDataService(this.rEntityType);
//         //  this.registerDataService(this.rEntityClassLabel)
//         //  this.registerDataService(this.rEntityFullText)
//         //  this.registerDataService(this.rEntityTimeSpan)

//         this.ready$ = combineLatest(
//             this.registered.map(ds => ds.ready$.pipe(filter(r => r === true))),
//         ).pipe(mapTo(true))
//     }


//     async startCycling() {
//         // Model aggregators
//         await this.identifyingProperty.startUpdate() // rEntityLabel

//         // Project aggegators
//         // await this.pClassLabel.startUpdate()
//         // await this.pClassFieldLabel.startUpdate()
//         // await this.pEntityClassLabel.startUpdate()
//         // await this.pEntityLabel.startUpdate()
//         // await this.pEntityType.startUpdate()
//         // await this.pEntityFullText.startUpdate()
//         // await this.pEntityTimeSpan.startUpdate()

//         // Repo aggregators
//         // await this.rClassLabel.startUpdate() // rClassLabel
//         // await this.rClassFieldLabel.startUpdate()
//         // await this.rEntityClassLabel.startUpdate()
//         await this.rEntityLabel.startUpdate() // rEntityLabel
//         // await this.rEntityType.startUpdate()
//         // await this.rEntityFullText.startUpdate()
//         // await this.rEntityTimeSpan.startUpdate()
//     }

// }
