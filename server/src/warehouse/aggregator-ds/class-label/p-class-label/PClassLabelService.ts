import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {PClassService} from '../../../primary-ds/class/PClassService';
import {PClassId, pClassIdKeyDef} from '../../../primary-ds/ProClassFieldsConfigService';
import {Warehouse} from '../../../Warehouse';
import {PClassLabelAggregator} from './PClassLabelAggregator';
import {PClassLabelProviders} from './PClassLabelProviders';
import {Injectable, Inject, forwardRef} from 'injection-js';

export interface PClassLabelVal {label?: string}
@Injectable()
export class PClassLabelService extends AggregatedDataService<PClassId, PClassLabelVal>{
    creatorDS: PClassService
    aggregator = PClassLabelAggregator;
    providers = PClassLabelProviders;
    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            pClassIdKeyDef
        )
        this.registerCreatorDS(wh.prim.pClass);


    }
    getDependencies() {
        return this.wh.dep.pClassLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        INSERT INTO war.class_preview (fk_class, fk_project, label)
        SELECT "pkClass", "fkProject", val->>'label'
        FROM ${tableAlias}
        ON CONFLICT (fk_class, fk_project) DO UPDATE
        SET label = EXCLUDED.label
        WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
    }

}
