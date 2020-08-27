import {PClassLabelDependencies} from '../aggregator-ds/p-class-label/PClassLabelDependencies';
import {PEntityClassLabelDependencies} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelDependencies';
import {PEntityLabelDependencies} from '../aggregator-ds/p-entity-label/PEntityLabelDependencies';
import {PEntityTimeSpanDependencies} from '../aggregator-ds/p-entity-time-span/PEntityTimeSpanDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/p-entity-type/PEntityTypeDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {Warehouse} from '../Warehouse';


export class DependencyDataServices extends DataServiceBundle {
    pClassLabel: PClassLabelDependencies
    pEntityLabel: PEntityLabelDependencies
    pEntityType: PEntityTypeDependencies
    pEntityClassLabel: PEntityClassLabelDependencies
    pEntityTimeSpan: PEntityTimeSpanDependencies
    constructor(wh: Warehouse) {
        super()
        this.pEntityLabel = this.registerDataService(new PEntityLabelDependencies(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelDependencies(wh));
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelDependencies(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeDependencies(wh));
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanDependencies(wh));
    }
}
