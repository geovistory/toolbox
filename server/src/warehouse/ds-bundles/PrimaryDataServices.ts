import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {DfhClassHasTypePropertyService} from '../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelService} from '../primary-ds/DfhClassLabelService';
import {DfhPropertyLabelService} from '../primary-ds/DfhPropertyLabelService';
import {EntityLabelConfig, EntityLabelConfigService} from '../primary-ds/EntityLabelConfigService';
import {PClassFieldsConfigService, PClassId} from '../primary-ds/PClassFieldsConfigService';
import {PClassService} from '../primary-ds/PClassService';
import {PEdgeService, StatementItemToIndexate} from '../primary-ds/PEdgeService';
import {PEntityId, PEntityService, ProjectEntity} from '../primary-ds/PEntityService';
import {PPropertyService} from '../primary-ds/PPropertyService';
import {ProClassLabelService} from '../primary-ds/ProClassLabelService';
import {ProjectService} from '../primary-ds/ProjectService';
import {Warehouse} from '../Warehouse';
import {ProPropertyLabelService} from '../primary-ds/ProPropertyLabelService';
export class PrimaryDataServices extends DataServiceBundle {
    project: ProjectService;

    dfhClassHasTypeProperty: DfhClassHasTypePropertyService;
    dfhClassLabel: DfhClassLabelService;
    dfhPropertyLabel: DfhPropertyLabelService;

    proClassLabel: ProClassLabelService;
    proPropertyLabel: ProPropertyLabelService;

    pClass: PClassService;
    pProperty: PPropertyService;

    pClassFieldsConfig: PClassFieldsConfigService;
    entityLabelConfig: EntityLabelConfigService;

    pEdge: PEdgeService;
    pEntity: PEntityService;

    constructor(private wh: Warehouse) {
        super()
        this.project = this.registerDataService(new ProjectService(this.wh));

        this.dfhClassHasTypeProperty = this.registerDataService(new DfhClassHasTypePropertyService(this.wh));
        this.dfhClassLabel = this.registerDataService(new DfhClassLabelService(this.wh));
        this.dfhPropertyLabel = this.registerDataService(new DfhPropertyLabelService(this.wh));

        this.proClassLabel = this.registerDataService(new ProClassLabelService(this.wh));
        this.proPropertyLabel = this.registerDataService(new ProPropertyLabelService(this.wh));

        this.pClass = this.registerDataService(new PClassService(this.wh));
        this.pProperty = this.registerDataService(new PPropertyService(this.wh));

        this.pClassFieldsConfig = this.registerDataService(new PClassFieldsConfigService(this.wh));
        this.entityLabelConfig = this.registerDataService(new EntityLabelConfigService(this.wh));

        this.pEdge = this.registerDataService(new PEdgeService(this.wh));
        this.pEntity = this.registerDataService(new PEntityService(this.wh));
    }

    async createEntityLabelConfig(keyModel: PClassId, val: EntityLabelConfig) {
        return this.entityLabelConfig.index.addToIdx(keyModel, val)
    }
    async createEntity(keyModel: PEntityId, val: ProjectEntity) {
        return this.pEntity.index.addToIdx(keyModel, val)
    }
    async indexateEdges(items: StatementItemToIndexate[]) {
        return this.pEdge.indexateItems(items)
    }


}