/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {Provider, ReflectiveInjector, Type} from 'injection-js';
import {PClassFieldLabelDependencies} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelDependencies';
import {PClassFieldLabelService} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {RClassFieldLabelDependencies} from './aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelDependencies';
import {RClassFieldLabelService} from './aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {PClassLabelDependencies} from './aggregator-ds/class-label/p-class-label/PClassLabelDependencies';
import {PClassLabelService} from './aggregator-ds/class-label/p-class-label/PClassLabelService';
import {RClassLabelService} from './aggregator-ds/class-label/r-class-label/RClassLabelService';
import {PEntityClassLabelDependencies} from './aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelDependencies';
import {PEntityClassLabelService} from './aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {REntityClassLabelDependencies} from './aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelDependencies';
import {REntityClassLabelService} from './aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {PEntityFullTextDependencies} from './aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextDependencies';
import {PEntityFullTextService} from './aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {REntityFullTextDependencies} from './aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextDependencies';
import {REntityFullTextService} from './aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {PEntityLabelDependencies} from './aggregator-ds/entity-label/p-entity-label/PEntityLabelDependencies';
import {PEntityLabelService} from './aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from './aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {PEntityTimeSpanDependencies} from './aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanDependencies';
import {PEntityTimeSpanService} from './aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {REntityTimeSpanDependencies} from './aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanDependencies';
import {REntityTimeSpanService} from './aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {PEntityTypeDependencies} from './aggregator-ds/entity-type/p-entity-type/PEntityTypeDependencies';
import {PEntityTypeService} from './aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {REntityTypeDependencies} from './aggregator-ds/entity-type/r-entity-type/REntityTypeDependencies';
import {REntityTypeService} from './aggregator-ds/entity-type/r-entity-type/REntityTypeService';
import {IdentifyingPropertyDependencies} from './aggregator-ds/identifying-property/IdentifyingPropertyDependencies';
import {IdentifyingPropertyService} from './aggregator-ds/identifying-property/IdentifyingPropertyService';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {PClassService} from './primary-ds/class/PClassService';
import {RClassService} from './primary-ds/class/RClassService';
import {DfhClassHasTypePropertyService} from './primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelService} from './primary-ds/DfhClassLabelService';
import {DfhOutgoingPropertyService} from './primary-ds/DfhOutgoingPropertyService';
import {DfhPropertyLabelService} from './primary-ds/DfhPropertyLabelService';
import {PEdgeService} from './primary-ds/edge/PEdgeService';
import {REdgeService} from './primary-ds/edge/REdgeService';
import {PEntityService} from './primary-ds/entity/PEntityService';
import {REntityService} from './primary-ds/entity/REntityService';
import {ProClassFieldsConfigService} from './primary-ds/ProClassFieldsConfigService';
import {ProClassLabelService} from './primary-ds/ProClassLabelService';
import {ProEntityLabelConfigService} from './primary-ds/ProEntityLabelConfigService';
import {PPropertyService} from './primary-ds/property/PPropertyService';
import {RPropertyService} from './primary-ds/property/RPropertyService';
import {ProProjectService} from './primary-ds/ProProjectService';
import {ProPropertyLabelService} from './primary-ds/ProPropertyLabelService';
import {APP_CONFIG, Warehouse, WarehouseConfig} from './Warehouse';

export interface WarehouseStubs {
  primaryDataServiceBundle: Type<any>;
  primaryDataServices: Provider[];
  aggDataServiceBundle: Type<any>;
  aggDataServices: Provider[];
  depDataServiceBundle: Type<any>;
  depDataServices: Provider[];
}

/**
 *
 * @param config configuration of the warehouse
 * @param stubs stubs allow to substitute dependencies for testing purposes
 */
export function createWarehouse(
  config: WarehouseConfig,
  stubs?: WarehouseStubs
): Warehouse {

  // prepare injection of PrimaryDataServices (Bundle)
  let primaryDataServiceBundle: Provider = PrimaryDataServices;
  if (stubs?.primaryDataServiceBundle) {
    primaryDataServiceBundle = {provide: PrimaryDataServices, useClass: stubs?.primaryDataServiceBundle}
  }
  // prepare injection of PrimaryDataService classes
  const primaryDataServices = stubs?.primaryDataServices ?? defaultPrimaryDataServices

  // prepare injection of AggregatedDataServices (Bundle)
  let aggDataServiceBundle: Provider = AggregatedDataServices;
  if (stubs?.aggDataServiceBundle) {
    aggDataServiceBundle = {provide: AggregatedDataServices, useClass: stubs?.aggDataServiceBundle}
  }
  // prepare injection of AggregatedDataService classes
  const aggDataServices = stubs?.aggDataServices ?? defaultAggregatedDataServices

  // prepare injection of DependencyDataServices (Bundle)
  let depDataServiceBundle: Provider = DependencyDataServices;
  if (stubs?.depDataServiceBundle) {
    depDataServiceBundle = {provide: DependencyDataServices, useClass: stubs?.depDataServiceBundle}
  }
  // prepare injection of DependencyDataService classes
  const depDataServices = stubs?.depDataServices ?? defaultDependencyDataServices



  const injector = ReflectiveInjector.resolveAndCreate([
    Warehouse,
    // bundles
    primaryDataServiceBundle,
    aggDataServiceBundle,
    depDataServiceBundle,
    // primary
    primaryDataServices,
    // agg
    aggDataServices,
    // dep
    depDataServices,


    {provide: APP_CONFIG, useValue: config}
  ]);
  return injector.get(Warehouse)
}

const defaultPrimaryDataServices = [
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
];

const defaultAggregatedDataServices = [IdentifyingPropertyService,

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
  REntityTimeSpanService,];

const defaultDependencyDataServices = [IdentifyingPropertyDependencies,

  PClassLabelDependencies,
  PClassFieldLabelDependencies,
  PEntityLabelDependencies,
  PEntityTypeDependencies,
  PEntityClassLabelDependencies,
  PEntityFullTextDependencies,
  PEntityTimeSpanDependencies,

  // RClassLabelDependencies,
  RClassFieldLabelDependencies,
  // REntityLabelDependencies,
  REntityTypeDependencies,

  REntityClassLabelDependencies,
  REntityFullTextDependencies,
  REntityTimeSpanDependencies,];
