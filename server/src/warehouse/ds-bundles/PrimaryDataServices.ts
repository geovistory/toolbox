import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {DfhClassHasTypePropertyService} from '../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelService} from '../primary-ds/DfhClassLabelService';
import {DfhPropertyLabelService} from '../primary-ds/DfhPropertyLabelService';
import {EntityLabelConfig, ProEntityLabelConfigService} from '../primary-ds/ProEntityLabelConfigService';
import {PClassFieldsConfigService, PClassId} from '../primary-ds/PClassFieldsConfigService';
import {PClassService} from '../primary-ds/class/PClassService';
import {PEdgeService} from '../primary-ds/edge/PEdgeService';
import {StatementItemToIndexate} from "../primary-ds/edge/edge.commons";
import {PEntityId, PEntityService, PEntity} from '../primary-ds/entity/PEntityService';
import {PPropertyService} from '../primary-ds/property/PPropertyService';
import {ProClassLabelService} from '../primary-ds/ProClassLabelService';
import {ProProjectService} from '../primary-ds/ProProjectService';
import {Warehouse} from '../Warehouse';
import {ProPropertyLabelService} from '../primary-ds/ProPropertyLabelService';
import {DfhOutgoingPropertyService} from '../primary-ds/DfhOutgoingPropertyService';
import {REntityService} from '../primary-ds/entity/REntityService';
import {REdgeService} from '../primary-ds/edge/REdgeService';
import {RClassService} from '../primary-ds/class/RClassService';
import {RPropertyService} from '../primary-ds/property/RPropertyService';
export class PrimaryDataServices extends DataServiceBundle {

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

    pClassFieldsConfig: PClassFieldsConfigService;

    pEdge: PEdgeService;
    pEntity: PEntityService;

    rClass: RClassService;
    rProperty: RPropertyService;

    rEntity: REntityService;
    rEdge: REdgeService;

    constructor(private wh: Warehouse) {
        super()

        this.dfhClassLabel = this.registerDataService(new DfhClassLabelService(this.wh));
        this.dfhPropertyLabel = this.registerDataService(new DfhPropertyLabelService(this.wh));
        this.dfhClassHasTypeProperty = this.registerDataService(new DfhClassHasTypePropertyService(this.wh));
        this.dfhOutgoingProperty = this.registerDataService(new DfhOutgoingPropertyService(this.wh));

        this.proProject = this.registerDataService(new ProProjectService(this.wh));
        this.proClassLabel = this.registerDataService(new ProClassLabelService(this.wh));
        this.proPropertyLabel = this.registerDataService(new ProPropertyLabelService(this.wh));

        this.pClass = this.registerDataService(new PClassService(this.wh));
        this.pProperty = this.registerDataService(new PPropertyService(this.wh));

        this.pClassFieldsConfig = this.registerDataService(new PClassFieldsConfigService(this.wh));
        this.proEntityLabelConfig = this.registerDataService(new ProEntityLabelConfigService(this.wh));

        this.pEdge = this.registerDataService(new PEdgeService(this.wh));
        this.pEntity = this.registerDataService(new PEntityService(this.wh));

        this.rEntity = this.registerDataService(new REntityService(this.wh));
        this.rEdge = this.registerDataService(new REdgeService(this.wh));

        this.rClass = this.registerDataService(new RClassService(this.wh));
        this.rProperty = this.registerDataService(new RPropertyService(this.wh));

    }

    async createEntityLabelConfig(keyModel: PClassId, val: EntityLabelConfig) {
        return this.proEntityLabelConfig.index.addToIdx(keyModel, val)
    }
    async createEntity(keyModel: PEntityId, val: PEntity) {
        return this.pEntity.index.addToIdx(keyModel, val)
    }
    async indexateEdges(items: StatementItemToIndexate[]) {
        return this.pEdge.indexateItems(items)
    }


}
