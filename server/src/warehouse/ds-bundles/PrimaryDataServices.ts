import {Injectable, Inject, forwardRef} from 'injection-js';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, mapTo} from 'rxjs/operators';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {PClassService} from '../primary-ds/class/PClassService';
import {RClassService} from '../primary-ds/class/RClassService';
import {DfhClassHasTypePropertyService} from '../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelService} from '../primary-ds/DfhClassLabelService';
import {DfhOutgoingPropertyService} from '../primary-ds/DfhOutgoingPropertyService';
import {DfhPropertyLabelService} from '../primary-ds/DfhPropertyLabelService';
import {PEdgeService} from '../primary-ds/edge/PEdgeService';
import {REdgeService} from '../primary-ds/edge/REdgeService';
import {PEntityService} from '../primary-ds/entity/PEntityService';
import {REntityService} from '../primary-ds/entity/REntityService';
import {ProClassFieldsConfigService} from '../primary-ds/ProClassFieldsConfigService';
import {ProClassLabelService} from '../primary-ds/ProClassLabelService';
import {ProEntityLabelConfigService} from '../primary-ds/ProEntityLabelConfigService';
import {PPropertyService} from '../primary-ds/property/PPropertyService';
import {RPropertyService} from '../primary-ds/property/RPropertyService';
import {ProProjectService} from '../primary-ds/ProProjectService';
import {ProPropertyLabelService} from '../primary-ds/ProPropertyLabelService';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class PrimaryDataServices extends DataServiceBundle<PrimaryDataService<any, any>> {


    ready$: Observable<boolean>

    constructor(

        @Inject(forwardRef(() => DfhClassLabelService))
        public dfhClassLabel: DfhClassLabelService,

        @Inject(forwardRef(() => DfhPropertyLabelService))
        public dfhPropertyLabel: DfhPropertyLabelService,

        @Inject(forwardRef(() => DfhClassHasTypePropertyService))
        public dfhClassHasTypeProperty: DfhClassHasTypePropertyService,

        @Inject(forwardRef(() => DfhOutgoingPropertyService))
        public dfhOutgoingProperty: DfhOutgoingPropertyService,


        @Inject(forwardRef(() => ProProjectService))
        public proProject: ProProjectService,

        @Inject(forwardRef(() => ProClassLabelService))
        public proClassLabel: ProClassLabelService,

        @Inject(forwardRef(() => ProPropertyLabelService))
        public proPropertyLabel: ProPropertyLabelService,

        @Inject(forwardRef(() => ProEntityLabelConfigService))
        public proEntityLabelConfig: ProEntityLabelConfigService,


        @Inject(forwardRef(() => PClassService))
        public pClass: PClassService,

        @Inject(forwardRef(() => PPropertyService))
        public pProperty: PPropertyService,


        @Inject(forwardRef(() => ProClassFieldsConfigService))
        public pClassFieldsConfig: ProClassFieldsConfigService,


        @Inject(forwardRef(() => PEdgeService))
        public pEdge: PEdgeService,

        @Inject(forwardRef(() => PEntityService))
        public pEntity: PEntityService,


        @Inject(forwardRef(() => RClassService))
        public rClass: RClassService,

        @Inject(forwardRef(() => RPropertyService))
        public rProperty: RPropertyService,


        @Inject(forwardRef(() => REntityService))
        public rEntity: REntityService,

        @Inject(forwardRef(() => REdgeService))
        public rEdge: REdgeService,
    ) {
        super()

        this.registerDataService(this.dfhClassLabel); // rClassLabel
        // this.registerDataService(this.dfhPropertyLabel);
        // this.registerDataService(this.dfhClassHasTypeProperty);
        this.registerDataService(this.dfhOutgoingProperty); // rEntityLabel

        // this.registerDataService(this.proProject);
        this.registerDataService(this.proClassLabel); // rClassLabel
        // this.registerDataService(this.proPropertyLabel);

        // this.registerDataService(this.pClass);
        // this.registerDataService(this.pProperty);

        // this.registerDataService(this.pClassFieldsConfig);
        this.registerDataService(this.proEntityLabelConfig); // rEntityLabel

        // this.registerDataService(this.pEdge);
        // this.registerDataService(this.pEntity);

        this.registerDataService(this.rEntity); // rEntityLabel
        this.registerDataService(this.rEdge); // rEntityLabel

        this.registerDataService(this.rClass); // rClassLabel
        // this.registerDataService(this.rProperty);

        this.ready$ = combineLatest(
            this.registered.map(ds => ds.index.ready$.pipe(filter(r => r === true)))
        ).pipe(
            map(a => {
                return a
            }),
            mapTo(true))

    }

    async initAllIndexes() {
        for (const ds of this.registered) {
            await ds.initIdx()
        }
        // await Promise.all(this.registered.map(x => x.initIdx()));
    }
    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }

    async everythingInitialized(): Promise<boolean> {
        const doneDates = await Promise.all(this.registered.map(ds => ds.getLastUpdateDone()))
        if (doneDates.includes(undefined)) return false
        return true
    }
}
