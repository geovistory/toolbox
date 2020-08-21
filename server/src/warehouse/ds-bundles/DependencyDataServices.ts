import {EntityLabelDependencies} from '../aggregator-ds/entity-label/EntityLabelDependencies';
import {Warehouse} from '../Warehouse';
import {ClassLabelDependencies} from '../aggregator-ds/class-label/ClassLabelDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';


export class DependencyDataServices extends DataServiceBundle {
    entityLabel: EntityLabelDependencies
    classLabel: ClassLabelDependencies
    constructor(main: Warehouse) {
        super()
        this.entityLabel = this.registerDataService(new EntityLabelDependencies(main));
        this.classLabel = this.registerDataService(new ClassLabelDependencies(main));
    }
}
