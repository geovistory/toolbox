import {PEntityLabelDependencies} from '../aggregator-ds/p-entity-label/PEntityLabelDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/p-entity-type/PEntityTypeDependencies';
import {Warehouse} from '../Warehouse';
import {PClassLabelDependencies} from '../aggregator-ds/p-class-label/PClassLabelDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PEntityClassLabelDependencies} from '../aggregator-ds/p-entity-class-label/PEntityClassLabelDependencies';
import {PEntityFullTextDependencies} from '../aggregator-ds/p-entity-full-text/PEntityFullTextDependencies';
import {PPropertyLabelDependencies} from '../aggregator-ds/p-property-label/PPropertyLabelDependencies';


export class DependencyDataServices extends DataServiceBundle {
    pClassLabel: PClassLabelDependencies
    pPropertyLabel: PPropertyLabelDependencies
    pEntityLabel: PEntityLabelDependencies
    pEntityType: PEntityTypeDependencies
    pEntityClassLabel: PEntityClassLabelDependencies
    pEntityFullText: PEntityFullTextDependencies
    constructor(wh: Warehouse) {
        super()
        this.pEntityLabel = this.registerDataService(new PEntityLabelDependencies(wh));
        this.pClassLabel = this.registerDataService(new PClassLabelDependencies(wh));
        this.pPropertyLabel = this.registerDataService(new PPropertyLabelDependencies(wh));
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelDependencies(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeDependencies(wh));
        this.pEntityFullText = this.registerDataService(new PEntityFullTextDependencies(wh));
    }
}
