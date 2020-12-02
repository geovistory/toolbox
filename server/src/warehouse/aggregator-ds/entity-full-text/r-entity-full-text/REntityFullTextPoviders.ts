import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService';
import {PClassId, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService';
import {RClassFieldId, RClassFieldVal} from '../../class-field-label/r-class-field-label/RClassFieldLabelService';
import {RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {REntityFullTextVal, REntityFullTextService} from './REntityFullTextService';

export class REntityFullTextProviders extends Providers<REntityId> {
    rEntity: Provider<REntityId, REntityFullTextVal, REntityId, REntity>;
    rEdges: Provider<REntityId, REntityFullTextVal, REntityId, EntityFields>;
    rEntityLabel: Provider<REntityId, REntityFullTextVal, REntityId, EntityLabelVal>;
    rClassLabel: Provider<REntityId, REntityFullTextVal, RClassId, RClassLabelValue>;
    rClassFieldLabel: Provider<REntityId, REntityFullTextVal, RClassFieldId, RClassFieldVal>;

    pClassFields: Provider<REntityId, REntityFullTextVal, PClassId, ProClassFieldVal>;

    constructor(
        dep: REntityFullTextService,
        protected receiverKey: REntityId
    ) {
        super()
        this.rEntity = this.registerProvider(dep.depREntity, receiverKey)
        this.rEntityLabel = this.registerProvider(dep.depREntityLabel, receiverKey);
        this.rEdges = this.registerProvider(dep.depREdge, receiverKey)
        this.rClassLabel = this.registerProvider(dep.depRClassLabel, receiverKey)
        this.rClassFieldLabel = this.registerProvider(dep.depRClassFieldLabel, receiverKey)

        this.pClassFields = this.registerProvider(dep.depPClassFields, receiverKey)
    }

}

