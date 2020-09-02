import {PClassLabelDependencies} from '../aggregator-ds/class-label/p-class-label/PClassLabelDependencies';
import {PEntityClassLabelDependencies} from '../aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelDependencies';
import {PEntityLabelDependencies} from '../aggregator-ds/p-entity-label/PEntityLabelDependencies';
import {PEntityTimeSpanDependencies} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/p-entity-type/PEntityTypeDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityFullTextDependencies} from '../aggregator-ds/p-entity-full-text/PEntityFullTextDependencies';
import {PClassFieldLabelDependencies} from '../aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelDependencies';
import {Warehouse} from '../Warehouse';
import {IdentifyingPropertyDependencies} from '../aggregator-ds/identifying-property/IdentifyingPropertyDependencies';
import {RClassLabelDependencies} from '../aggregator-ds/class-label/r-class-label/RClassLabelDependencies';
import {REntityClassLabelDependencies} from '../aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelDependencies';
import {RClassFieldLabelDependencies} from '../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelDependencies';


export class DependencyDataServices extends DataServiceBundle {
    identifyingProperty: IdentifyingPropertyDependencies

    pClassLabel: PClassLabelDependencies
    pClassFieldLabel: PClassFieldLabelDependencies
    pEntityLabel: PEntityLabelDependencies
    pEntityType: PEntityTypeDependencies
    pEntityClassLabel: PEntityClassLabelDependencies
    pEntityFullText: PEntityFullTextDependencies
    pEntityTimeSpan: PEntityTimeSpanDependencies

    rClassLabel: RClassLabelDependencies
    rClassFieldLabel: RClassFieldLabelDependencies
    rEntityClassLabel: REntityClassLabelDependencies

    constructor(wh: Warehouse) {
        super()
        this.identifyingProperty = this.registerDataService(new IdentifyingPropertyDependencies(wh));

        this.pEntityLabel = this.registerDataService(new PEntityLabelDependencies(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelDependencies(wh));
        this.pClassFieldLabel = this.registerDataService(new PClassFieldLabelDependencies(wh));
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelDependencies(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeDependencies(wh));
        this.pEntityFullText = this.registerDataService(new PEntityFullTextDependencies(wh));
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanDependencies(wh));

        this.rClassLabel = this.registerDataService(new RClassLabelDependencies(wh));
        this.rEntityClassLabel = this.registerDataService(new REntityClassLabelDependencies(wh));
        this.rClassFieldLabel = this.registerDataService(new RClassFieldLabelDependencies(wh));
    }
}
