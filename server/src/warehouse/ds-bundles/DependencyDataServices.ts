import {PClassLabelDependencies} from '../aggregator-ds/p-class-label/PClassLabelDependencies';
import {PEntityClassLabelDependencies} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelDependencies';
import {PEntityLabelDependencies} from '../aggregator-ds/p-entity-label/PEntityLabelDependencies';
import {PEntityTimeSpanDependencies} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/p-entity-type/PEntityTypeDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityFullTextDependencies} from '../aggregator-ds/p-entity-full-text/PEntityFullTextDependencies';
import {PClassFieldLabelDependencies} from '../aggregator-ds/p-class-field-label/PClassFieldLabelDependencies';
import {Warehouse} from '../Warehouse';
import {IdentifyingPropertyDependencies} from '../aggregator-ds/identifying-property/IdentifyingPropertyDependencies';


export class DependencyDataServices extends DataServiceBundle {
    identifyingProperty: IdentifyingPropertyDependencies

    pClassLabel: PClassLabelDependencies
    pPropertyLabel: PClassFieldLabelDependencies
    pEntityLabel: PEntityLabelDependencies
    pEntityType: PEntityTypeDependencies
    pEntityClassLabel: PEntityClassLabelDependencies
    pEntityFullText: PEntityFullTextDependencies
    pEntityTimeSpan: PEntityTimeSpanDependencies
    constructor(wh: Warehouse) {
        super()
        this.identifyingProperty = this.registerDataService(new IdentifyingPropertyDependencies(wh));

        this.pEntityLabel = this.registerDataService(new PEntityLabelDependencies(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelDependencies(wh));
        this.pPropertyLabel = this.registerDataService(new PClassFieldLabelDependencies(wh));
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelDependencies(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeDependencies(wh));
        this.pEntityFullText = this.registerDataService(new PEntityFullTextDependencies(wh));
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanDependencies(wh));
    }
}
