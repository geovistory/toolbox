import {combineLatest, Observable} from 'rxjs';
import {filter, mapTo, map} from 'rxjs/operators';
import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {PClassService} from '../primary-ds/class/PClassService';
import {RClassService} from '../primary-ds/class/RClassService';
import {DfhClassHasTypePropertyService} from '../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelService} from '../primary-ds/DfhClassLabelService';
import {DfhOutgoingPropertyService} from '../primary-ds/DfhOutgoingPropertyService';
import {DfhPropertyLabelService} from '../primary-ds/DfhPropertyLabelService';
import {StatementItemToIndexate} from "../primary-ds/edge/edge.commons";
import {PEdgeService} from '../primary-ds/edge/PEdgeService';
import {REdgeService} from '../primary-ds/edge/REdgeService';
import {PEntity, PEntityId, PEntityService} from '../primary-ds/entity/PEntityService';
import {REntityService} from '../primary-ds/entity/REntityService';
import {PClassId, ProClassFieldsConfigService} from '../primary-ds/ProClassFieldsConfigService';
import {ProClassLabelService} from '../primary-ds/ProClassLabelService';
import {EntityLabelConfigVal, ProEntityLabelConfigService} from '../primary-ds/ProEntityLabelConfigService';
import {PPropertyService} from '../primary-ds/property/PPropertyService';
import {RPropertyService} from '../primary-ds/property/RPropertyService';
import {ProProjectService} from '../primary-ds/ProProjectService';
import {ProPropertyLabelService} from '../primary-ds/ProPropertyLabelService';
import {Warehouse} from '../Warehouse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class PrimaryDataServices extends DataServiceBundle<PrimaryDataService<any, any>> {

    dfhClassLabel: DfhClassLabelService;
    dfhPropertyLabel: DfhPropertyLabelService;
    dfhClassHasTypeProperty: DfhClassHasTypePropertyService;
    dfhOutgoingProperty: DfhOutgoingPropertyService;

    proProject: ProProjectService;
    proClassLabel: ProClassLabelService;
    proPropertyLabel: ProPropertyLabelService;
    proEntityLabelConfig: ProEntityLabelConfigService;

    pClass: PClassService;
    pProperty: PPropertyService;

    pClassFieldsConfig: ProClassFieldsConfigService;

    pEdge: PEdgeService;
    pEntity: PEntityService;

    rClass: RClassService;
    rProperty: RPropertyService;

    rEntity: REntityService;
    rEdge: REdgeService;

    ready$: Observable<boolean>

    constructor(private wh: Warehouse) {
        super()

        this.dfhClassLabel = this.registerDataService(new DfhClassLabelService(this.wh));
        this.dfhPropertyLabel = this.registerDataService(new DfhPropertyLabelService(this.wh));
        this.dfhClassHasTypeProperty = this.registerDataService(new DfhClassHasTypePropertyService(this.wh));
        this.dfhOutgoingProperty = this.registerDataService(new DfhOutgoingPropertyService(this.wh));

        // this.proProject = this.registerDataService(new ProProjectService(this.wh));
        this.proClassLabel = this.registerDataService(new ProClassLabelService(this.wh));
        this.proPropertyLabel = this.registerDataService(new ProPropertyLabelService(this.wh));

        // this.pClass = this.registerDataService(new PClassService(this.wh));
        // this.pProperty = this.registerDataService(new PPropertyService(this.wh));

        this.pClassFieldsConfig = this.registerDataService(new ProClassFieldsConfigService(this.wh));
        this.proEntityLabelConfig = this.registerDataService(new ProEntityLabelConfigService(this.wh));

        this.pEdge = this.registerDataService(new PEdgeService(this.wh));
        this.pEntity = this.registerDataService(new PEntityService(this.wh));

        this.rEntity = this.registerDataService(new REntityService(this.wh));
        this.rEdge = this.registerDataService(new REdgeService(this.wh));

        this.rClass = this.registerDataService(new RClassService(this.wh));
        this.rProperty = this.registerDataService(new RPropertyService(this.wh));

        this.ready$ = combineLatest(
            this.registered.map(ds => ds.index.ready$.pipe(filter(r => r === true)))
        ).pipe(
            map(a => {
                return a
            }),
            mapTo(true))

    }

    async createEntityLabelConfig(keyModel: PClassId, val: EntityLabelConfigVal) {
        return this.proEntityLabelConfig.index.addToIdx(keyModel, val)
    }
    async createEntity(keyModel: PEntityId, val: PEntity) {
        return this.pEntity.index.addToIdx(keyModel, val)
    }
    async indexateEdges(items: StatementItemToIndexate[]) {
        return this.pEdge.indexateItems(items)
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
