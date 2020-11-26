import '@abraham/reflection';
import {ReflectiveInjector} from 'injection-js';
import {APP_CONFIG, Warehouse, WarehouseConfig} from './Warehouse';
import {DfhClassLabelService} from './primary-ds/DfhClassLabelService';
import {DfhPropertyLabelService} from './primary-ds/DfhPropertyLabelService';
import {DfhClassHasTypePropertyService} from './primary-ds/DfhClassHasTypePropertyService';
import {DfhOutgoingPropertyService} from './primary-ds/DfhOutgoingPropertyService';
import {ProProjectService} from './primary-ds/ProProjectService';
import {ProClassLabelService} from './primary-ds/ProClassLabelService';
import {ProPropertyLabelService} from './primary-ds/ProPropertyLabelService';
import {ProEntityLabelConfigService} from './primary-ds/ProEntityLabelConfigService';
import {PClassService} from './primary-ds/class/PClassService';
import {PPropertyService} from './primary-ds/property/PPropertyService';
import {ProClassFieldsConfigService} from './primary-ds/ProClassFieldsConfigService';
import {PEdgeService} from './primary-ds/edge/PEdgeService';
import {PEntityService} from './primary-ds/entity/PEntityService';
import {RClassService} from './primary-ds/class/RClassService';
import {RPropertyService} from './primary-ds/property/RPropertyService';
import {REntityService} from './primary-ds/entity/REntityService';
import {REdgeService} from './primary-ds/edge/REdgeService';
import {PClassLabelDependencies} from './aggregator-ds/class-label/p-class-label/PClassLabelDependencies';
import {PClassFieldLabelDependencies} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelDependencies';
import {PEntityLabelDependencies} from './aggregator-ds/entity-label/p-entity-label/PEntityLabelDependencies';
import {PEntityTypeDependencies} from './aggregator-ds/entity-type/p-entity-type/PEntityTypeDependencies';
import {PEntityClassLabelDependencies} from './aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelDependencies';
import {PEntityFullTextDependencies} from './aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextDependencies';
import {PEntityTimeSpanDependencies} from './aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanDependencies';
import {RClassLabelDependencies} from './aggregator-ds/class-label/r-class-label/RClassLabelDependencies';
import {RClassFieldLabelDependencies} from './aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelDependencies';
import {REntityLabelDependencies} from './aggregator-ds/entity-label/r-entity-label/REntityLabelDependencies';
import {REntityTypeDependencies} from './aggregator-ds/entity-type/r-entity-type/REntityTypeDependencies';
import {REntityClassLabelDependencies} from './aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelDependencies';
import {REntityFullTextDependencies} from './aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextDependencies';
import {REntityTimeSpanDependencies} from './aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanDependencies';
import {IdentifyingPropertyService} from './aggregator-ds/identifying-property/IdentifyingPropertyService';
import {PClassLabelService} from './aggregator-ds/class-label/p-class-label/PClassLabelService';
import {PClassFieldLabelService} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {PEntityLabelService} from './aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {PEntityTypeService} from './aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {PEntityClassLabelService} from './aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {PEntityFullTextService} from './aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {PEntityTimeSpanService} from './aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {RClassLabelService} from './aggregator-ds/class-label/r-class-label/RClassLabelService';
import {RClassFieldLabelService} from './aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {REntityLabelService} from './aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {REntityTypeService} from './aggregator-ds/entity-type/r-entity-type/REntityTypeService';
import {REntityClassLabelService} from './aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {REntityFullTextService} from './aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {REntityTimeSpanService} from './aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';


export function createWarehouse(config: WarehouseConfig): Warehouse {
  const injector = ReflectiveInjector.resolveAndCreate([
    Warehouse,
    // bundles
    DependencyDataServices,
    AggregatedDataServices,
    PrimaryDataServices,

    // primary
    DfhClassLabelService,
    DfhPropertyLabelService,
    DfhClassHasTypePropertyService,
    DfhOutgoingPropertyService,

    ProProjectService,
    ProClassLabelService,
    ProPropertyLabelService,
    ProEntityLabelConfigService,

    PClassService,
    PPropertyService,

    ProClassFieldsConfigService,

    PEdgeService,
    PEntityService,

    RClassService,
    RPropertyService,

    REntityService,
    REdgeService,

    // agg
    IdentifyingPropertyService,

    // Project aggegators
    PClassLabelService,
    PClassFieldLabelService,
    PEntityLabelService,
    PEntityTypeService,
    PEntityClassLabelService,
    PEntityFullTextService,
    PEntityTimeSpanService,

    // Repo aggregators
    RClassLabelService,
    RClassFieldLabelService,
    REntityLabelService,
    REntityTypeService,
    REntityClassLabelService,
    REntityFullTextService,
    REntityTimeSpanService,

    // dep
    PClassLabelDependencies,
    PClassFieldLabelDependencies,
    PEntityLabelDependencies,
    PEntityTypeDependencies,
    PEntityClassLabelDependencies,
    PEntityFullTextDependencies,
    PEntityTimeSpanDependencies,

    RClassLabelDependencies,
    RClassFieldLabelDependencies,
    REntityLabelDependencies,
    REntityTypeDependencies,

    REntityClassLabelDependencies,
    REntityFullTextDependencies,
    REntityTimeSpanDependencies,

    {provide: APP_CONFIG, useValue: config}
  ]);
  return injector.get(Warehouse)
}
