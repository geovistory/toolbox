import {forwardRef, Inject, Injectable} from 'injection-js';
import {Observable} from 'rxjs';
import {PClassFieldLabelDependencies} from '../aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelDependencies';
import {RClassFieldLabelDependencies} from '../aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelDependencies';
import {PClassLabelDependencies} from '../aggregator-ds/class-label/p-class-label/PClassLabelDependencies';
import {PEntityClassLabelDependencies} from '../aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelDependencies';
import {REntityClassLabelDependencies} from '../aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelDependencies';
import {PEntityFullTextDependencies} from '../aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextDependencies';
import {REntityFullTextDependencies} from '../aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextDependencies';
import {PEntityLabelDependencies} from '../aggregator-ds/entity-label/p-entity-label/PEntityLabelDependencies';
import {PEntityTimeSpanDependencies} from '../aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanDependencies';
import {REntityTimeSpanDependencies} from '../aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanDependencies';
import {PEntityTypeDependencies} from '../aggregator-ds/entity-type/p-entity-type/PEntityTypeDependencies';
import {REntityTypeDependencies} from '../aggregator-ds/entity-type/r-entity-type/REntityTypeDependencies';
import {IdentifyingPropertyDependencies} from '../aggregator-ds/identifying-property/IdentifyingPropertyDependencies';
import {DependencyDataServicesBase} from '../base/classes/DependencyDataServicesBase';


@Injectable()
export class DependencyDataServices extends DependencyDataServicesBase {


    ready$: Observable<boolean>

    constructor(
        @Inject(forwardRef(()=>IdentifyingPropertyDependencies)) public identifyingProperty: IdentifyingPropertyDependencies,

        @Inject(forwardRef(()=>PClassLabelDependencies)) public pClassLabel: PClassLabelDependencies,
        @Inject(forwardRef(()=>PClassFieldLabelDependencies)) public pClassFieldLabel: PClassFieldLabelDependencies,
        @Inject(forwardRef(()=>PEntityLabelDependencies)) public pEntityLabel: PEntityLabelDependencies,
        @Inject(forwardRef(()=>PEntityTypeDependencies)) public pEntityType: PEntityTypeDependencies,
        @Inject(forwardRef(()=>PEntityClassLabelDependencies)) public pEntityClassLabel: PEntityClassLabelDependencies,
        @Inject(forwardRef(()=>PEntityFullTextDependencies)) public pEntityFullText: PEntityFullTextDependencies,
        @Inject(forwardRef(()=>PEntityTimeSpanDependencies)) public pEntityTimeSpan: PEntityTimeSpanDependencies,

        // @Inject(forwardRef(()=>RClassLabelDependencies)) public rClassLabel: RClassLabelDependencies,
        @Inject(forwardRef(()=>RClassFieldLabelDependencies)) public rClassFieldLabel: RClassFieldLabelDependencies,
        // @Inject(forwardRef(()=>REntityLabelDependencies)) public rEntityLabel: REntityLabelDependencies,
        @Inject(forwardRef(()=>REntityTypeDependencies)) public rEntityType: REntityTypeDependencies,

        @Inject(forwardRef(()=>REntityClassLabelDependencies)) public rEntityClassLabel: REntityClassLabelDependencies,
        @Inject(forwardRef(()=>REntityFullTextDependencies)) public rEntityFullText: REntityFullTextDependencies,
        @Inject(forwardRef(()=>REntityTimeSpanDependencies)) public rEntityTimeSpan: REntityTimeSpanDependencies,
    ) {
        super(
            identifyingProperty,
            pClassLabel,
            pClassFieldLabel,
            pEntityLabel,
            pEntityType,
            pEntityClassLabel,
            pEntityFullText,
            pEntityTimeSpan,
            rClassFieldLabel,
            rEntityType,
            rEntityClassLabel,
            rEntityFullText,
            rEntityTimeSpan)
    }

}
