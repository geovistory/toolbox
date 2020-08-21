import {DataServiceBundle} from '../base/classes/DataServiceBundle';
import {ClassId, FieldsConfig, FieldsConfigService} from '../primary-ds/FieldsConfigService';
import {DfhClassLabelService} from '../primary-ds/DfhClassLabelService';
import {EdgeService, StatementItemToIndexate} from '../primary-ds/EdgeService';
import {EntityLabelConfig, EntityLabelConfigService} from '../primary-ds/EntityLabelConfigService';
import {Entity, EntityId, EntityService} from '../primary-ds/EntityService';
import {FieldId, FieldLabelService} from '../primary-ds/FieldLabelService';
import {ProClassLabelService} from '../primary-ds/ProClassLabelService';
import {ProjectService} from '../primary-ds/ProjectService';
import {Warehouse} from '../Warehouse';
export class PrimaryDataServices extends DataServiceBundle {
    project: ProjectService;
    dfhClassLabel: DfhClassLabelService;
    proClassLabel: ProClassLabelService;
    fieldLabel: FieldLabelService;
    fieldsConfig: FieldsConfigService;
    entityLabelConfig: EntityLabelConfigService;
    edge: EdgeService;
    entity: EntityService;
    constructor(private main: Warehouse) {
        super()
        this.project = this.registerDataService(new ProjectService(this.main));
        this.fieldsConfig = this.registerDataService(new FieldsConfigService(this.main));
        this.dfhClassLabel = this.registerDataService(new DfhClassLabelService(this.main));
        this.proClassLabel = this.registerDataService(new ProClassLabelService(this.main));
        this.fieldLabel = this.registerDataService(new FieldLabelService(this.main));
        this.entityLabelConfig = this.registerDataService(new EntityLabelConfigService(this.main));
        this.edge = this.registerDataService(new EdgeService(this.main));
        this.entity = this.registerDataService(new EntityService(this.main));

    }


    async createFieldsConfig(keyModel: ClassId, val: FieldsConfig) {
        return this.fieldsConfig.index.addToIdx(keyModel, val)
    }
    async createFieldLabel(keyModel: FieldId, val: string) {
        return this.fieldLabel.index.addToIdx(keyModel, val)
    }
    async createEntityLabelConfig(keyModel: ClassId, val: EntityLabelConfig) {
        return this.entityLabelConfig.index.addToIdx(keyModel, val)
    }
    async createEntity(keyModel: EntityId, val: Entity) {
        return this.entity.index.addToIdx(keyModel, val)
    }
    async indexateEdges(items: StatementItemToIndexate[]) {
        return this.edge.indexateItems(items)
    }


}
