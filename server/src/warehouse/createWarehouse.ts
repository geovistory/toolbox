/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {Provider, ReflectiveInjector} from 'injection-js';
// import {PClassFieldLabelDependencies} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelDependencies';
import {PClassFieldLabelService} from './aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {RClassFieldLabelService} from './aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {PClassLabelService} from './aggregator-ds/class-label/p-class-label/PClassLabelService';
import {RClassLabelService} from './aggregator-ds/class-label/r-class-label/RClassLabelService';
import {PEntityClassLabelService} from './aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {REntityClassLabelService} from './aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {PEntityFullTextService} from './aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {REntityFullTextService} from './aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {PEntityLabelService} from './aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from './aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {EntityPreviewService} from './aggregator-ds/entity-preview/EntityPreviewService';
import {PEntityTimeSpanService} from './aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {REntityTimeSpanService} from './aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {PEntityTypeService} from './aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {REntityTypeService} from './aggregator-ds/entity-type/r-entity-type/REntityTypeService';
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
import {AGG_DS, APP_CONFIG, PRIMARY_DS, Warehouse, WarehouseConfig} from './Warehouse';
import {PStatementService} from './primary-ds/statement/PStatementService';
import {PFieldChangeService} from './primary-ds/PFieldChangeService';

export interface WarehouseStubs {
  primaryDataServices: Provider[];
  aggDataServices: Provider[];
}


/**
 *
 * @param config configuration of the warehouse
 * @param stubs stubs allow to substitute dependencies for testing purposes
 */
export function createWarehouse(
  config: WarehouseConfig,
  stubs?: WarehouseStubs
): ReflectiveInjector {

  // prepare injection of PrimaryDataService classes
  const primaryDataServices = stubs?.primaryDataServices ?? defaultPrimaryDataServices

  // prepare injection of AggregatedDataService classes
  const aggDataServices = stubs?.aggDataServices ?? defaultAggregatedDataServices

  const injector = ReflectiveInjector.resolveAndCreate([
    primaryDataServices,
    aggDataServices,
    {provide: APP_CONFIG, useValue: config},
    {provide: PRIMARY_DS, useValue: primaryDataServices},
    {provide: AGG_DS, useValue: aggDataServices},
    Warehouse,

  ]);
  return injector
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
  PStatementService,
  PFieldChangeService,

  RClassService,
  RPropertyService,

  REntityService,
  REdgeService,

];

const defaultAggregatedDataServices = [
  // IdentifyingPropertyService,

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


  // Resulting aggregators
  EntityPreviewService
];
