import {Injectable, Inject, forwardRef} from 'injection-js';
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

@Injectable()
export class DependencyDataServices extends DataServiceBundle<Dependencies> {


    ready$: Observable<boolean>

    constructor(
        public identifyingProperty: IdentifyingPropertyDependencies,

        public pClassLabel: PClassLabelDependencies,
        public pClassFieldLabel: PClassFieldLabelDependencies,
        public pEntityLabel: PEntityLabelDependencies,
        public pEntityType: PEntityTypeDependencies,
        public pEntityClassLabel: PEntityClassLabelDependencies,
        public pEntityFullText: PEntityFullTextDependencies,
        public pEntityTimeSpan: PEntityTimeSpanDependencies,

        public rClassLabel: RClassLabelDependencies,
        public rClassFieldLabel: RClassFieldLabelDependencies,
        public rEntityLabel: REntityLabelDependencies,
        public rEntityType: REntityTypeDependencies,

        public rEntityClassLabel: REntityClassLabelDependencies,
        public rEntityFullText: REntityFullTextDependencies,
        public rEntityTimeSpan: REntityTimeSpanDependencies,
    ) {
        super()
        this.registerDataService(this.identifyingProperty); // rEntityLabel

        //  this.registerDataService(this.pClassLabel);
        //  this.registerDataService(this.pClassFieldLabel);
        //  this.registerDataService(this.pEntityLabel);
        //  this.registerDataService(this.pEntityClassLabel);
        //  this.registerDataService(this.pEntityType);
        //  this.registerDataService(this.pEntityFullText);
        //  this.registerDataService(this.pEntityTimeSpan);

        //  this.registerDataService(this.rClassLabel);
        //  this.registerDataService(this.rEntityClassLabel);
        this.registerDataService(this.rEntityLabel); // rEntityLabel
        //  this.registerDataService(this.rEntityType);
        //  this.registerDataService(this.rEntityFullText);
        //  this.registerDataService(this.rClassFieldLabel);
        //  this.registerDataService(this.rEntityTimeSpan);

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
