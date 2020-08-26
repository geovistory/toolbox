import {PEntityLabelDependencies} from '../aggregator-ds/p-entity-label/PEntityLabelDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/p-entity-type/PEntityTypeDependencies';
import {Warehouse} from '../Warehouse';
import {PClassLabelDependencies} from '../aggregator-ds/p-class-label/PClassLabelDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityClassLabelDependencies} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelDependencies';


export class DependencyDataServices extends DataServiceBundle {
    pClassLabel: PClassLabelDependencies
    pEntityLabel: PEntityLabelDependencies
    pEntityType: PEntityTypeDependencies
    pEntityClassLabel: PEntityClassLabelDependencies
    constructor(wh: Warehouse) {
        super()
        this.pEntityLabel = this.registerDataService(new PEntityLabelDependencies(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelDependencies(wh));
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelDependencies(wh));
    }
}
