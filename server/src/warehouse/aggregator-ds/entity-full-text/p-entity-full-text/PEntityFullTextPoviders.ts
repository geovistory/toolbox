import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {PClassId, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService';
import {PClassFieldLabelId, PClassFieldLabelVal} from '../../class-field-label/p-class-field-label/PClassFieldLabelService';
import {PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {PEntityFullTextService, PEntityFullTextVal} from './PEntityFullTextService';

export class PEntityFullTextProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityFullTextVal, PEntityId, PEntity>;
    pEdges: Provider<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityFullTextVal, PEntityId, EntityLabelVal>;
    rEntityLabel: Provider<PEntityId, PEntityFullTextVal, REntityId, EntityLabelVal>;
    pClassLabel: Provider<PEntityId, PEntityFullTextVal, PClassId, PClassLabelVal>;
    pClassFields: Provider<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>;
    pClassFieldLabel: Provider<PEntityId, PEntityFullTextVal, PClassFieldLabelId, PClassFieldLabelVal>;

    constructor(
        dep: PEntityFullTextService,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.depPEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.depPEntityLabel, receiverKey);
        this.rEntityLabel = this.registerProvider(dep.depREntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.depPEdge, receiverKey)
        this.pClassLabel = this.registerProvider(dep.depPClassLabel, receiverKey)
        this.pClassFields = this.registerProvider(dep.depPClassFields, receiverKey)
        this.pClassFieldLabel = this.registerProvider(dep.depPClassFieldLabel, receiverKey)
    }

}

