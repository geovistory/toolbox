import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {PClassId, FieldsConfig, FieldsConfigService} from '../primary-ds/FieldsConfigService';
import {DfhClassLabelService} from '../primary-ds/DfhClassLabelService';
import {PEdgeService, StatementItemToIndexate} from '../primary-ds/PEdgeService';
import {EntityLabelConfig, EntityLabelConfigService} from '../primary-ds/EntityLabelConfigService';
import {ProjectEntity, PEntityId, PEntityService} from '../primary-ds/PEntityService';
import {FieldId, FieldLabelService} from '../primary-ds/FieldLabelService';
import {ProClassLabelService} from '../primary-ds/ProClassLabelService';
import {ProjectService} from '../primary-ds/ProjectService';
import {Warehouse} from '../Warehouse';
import {PClassService} from '../primary-ds/PClassService';
export class PrimaryDataServices extends DataServiceBundle {
    project: ProjectService;
    dfhClassLabel: DfhClassLabelService;
    proClassLabel: ProClassLabelService;
    fieldLabel: FieldLabelService;
    fieldsConfig: FieldsConfigService;
    entityLabelConfig: EntityLabelConfigService;
    pEdge: PEdgeService;
    pEntity: PEntityService;
    pClass: PClassService;
    constructor(private wh: Warehouse) {
        super()
        this.project = this.registerDataService(new ProjectService(this.wh));
        this.fieldsConfig = this.registerDataService(new FieldsConfigService(this.wh));
        this.dfhClassLabel = this.registerDataService(new DfhClassLabelService(this.wh));
        this.proClassLabel = this.registerDataService(new ProClassLabelService(this.wh));
        this.fieldLabel = this.registerDataService(new FieldLabelService(this.wh));
        this.entityLabelConfig = this.registerDataService(new EntityLabelConfigService(this.wh));
        this.pEdge = this.registerDataService(new PEdgeService(this.wh));
        this.pEntity = this.registerDataService(new PEntityService(this.wh));
        this.pClass = this.registerDataService(new PClassService(this.wh));
    }


    async createFieldsConfig(keyModel: PClassId, val: FieldsConfig) {
        return this.fieldsConfig.index.addToIdx(keyModel, val)
    }
    async createFieldLabel(keyModel: FieldId, val: string) {
        return this.fieldLabel.index.addToIdx(keyModel, val)
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
