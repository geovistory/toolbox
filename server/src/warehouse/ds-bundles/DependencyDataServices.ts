import {combineLatest, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {PClassFieldLabelDependencies} from '../aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelDependencies';
import {RClassFieldLabelDependencies} from '../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelDependencies';
import {PClassLabelDependencies} from '../aggregator-ds/class-label/p-class-label/PClassLabelDependencies';
import {RClassLabelDependencies} from '../aggregator-ds/class-label/r-class-label/RClassLabelDependencies';
import {PEntityClassLabelDependencies} from '../aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelDependencies';
import {REntityClassLabelDependencies} from '../aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelDependencies';
import {PEntityFullTextDependencies} from '../aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextDependencies';
import {REntityFullTextDependencies} from '../aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextDependencies';
import {PEntityLabelDependencies} from '../aggregator-ds/entity-label/p-entity-label/PEntityLabelDependencies';
import {REntityLabelDependencies} from '../aggregator-ds/entity-label/r-entity-label/REntityLabelDependencies';
import {PEntityTimeSpanDependencies} from '../aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanDependencies';
import {REntityTimeSpanDependencies} from '../aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/entity-type/p-entity-type/PEntityTypeDependencies';
import {REntityTypeDependencies} from '../aggregator-ds/entity-type/r-entity-type/REntityTypeDependencies';
import {IdentifyingPropertyDependencies} from '../aggregator-ds/identifying-property/IdentifyingPropertyDependencies';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {Dependencies} from '../base/classes/Dependencies';
import {Warehouse} from '../Warehouse';


export class DependencyDataServices extends DataServiceBundle<Dependencies> {
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
    rEntityLabel: REntityLabelDependencies
    rEntityType: REntityTypeDependencies

    rEntityClassLabel: REntityClassLabelDependencies
    rEntityFullText: REntityFullTextDependencies
    rEntityTimeSpan: REntityTimeSpanDependencies

    ready$: Observable<boolean>

    constructor(wh: Warehouse) {
        super()
        this.identifyingProperty = this.registerDataService(new IdentifyingPropertyDependencies(wh));

        this.pClassLabel = this.registerDataService(new PClassLabelDependencies(wh));
        this.pClassFieldLabel = this.registerDataService(new PClassFieldLabelDependencies(wh));
        this.pEntityLabel = this.registerDataService(new PEntityLabelDependencies(wh));
        this.pEntityClassLabel = this.registerDataService(new PEntityClassLabelDependencies(wh));
        this.pEntityType = this.registerDataService(new PEntityTypeDependencies(wh));
        this.pEntityFullText = this.registerDataService(new PEntityFullTextDependencies(wh));
        this.pEntityTimeSpan = this.registerDataService(new PEntityTimeSpanDependencies(wh));

        this.rClassLabel = this.registerDataService(new RClassLabelDependencies(wh));
        this.rEntityClassLabel = this.registerDataService(new REntityClassLabelDependencies(wh));
        this.rEntityLabel = this.registerDataService(new REntityLabelDependencies(wh));
        this.rEntityType = this.registerDataService(new REntityTypeDependencies(wh));
        this.rEntityFullText = this.registerDataService(new REntityFullTextDependencies(wh));
        this.rClassFieldLabel = this.registerDataService(new RClassFieldLabelDependencies(wh));
        this.rEntityTimeSpan = this.registerDataService(new REntityTimeSpanDependencies(wh));

        const readies$ = []
        for (const reg1 of this.registered) {
            for (const reg2 of reg1.registered) {
                readies$.push(reg2.ready$)
            }
        }
        this.ready$ = combineLatest(readies$).pipe(mapTo(true))
    }
    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }
}
