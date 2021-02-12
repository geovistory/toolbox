
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { filter } from 'rxjs/operators';
import { IAppState, SchemaObject } from '../../root/models';
import { InfDimensionSlice, InfPersistentItemSlice } from '../models';
import { infRoot } from '../reducer-configs';
import { InfActionFactory } from '../_helpers/inf-action-factory';
import { ActionResultObservable, LoadActionMeta, SchemaActionsFactory, SucceedActionMeta } from '../_helpers/schema-actions-factory';



type Payload = InfPersistentItemSlice;

export interface LoadByPkMeta extends LoadActionMeta { pkEntity: number };
export type LoadTypesOfProjectAction = LoadActionMeta;
export interface LoadTypeOfProjectAction extends LoadActionMeta { pkEntity: number };
type LoadNestetedPeItResult = InfPersistentItem[]

export class InfPersistentItemActionFactory extends InfActionFactory<Payload, InfPersistentItem> {

  // Suffixes of load action types
  // static readonly NESTED_BY_PK = 'NESTED_BY_PK';
  static readonly MINIMAL_BY_PK = 'MINIMAL_BY_PK';
  static readonly TYPES_OF_PROJECT = 'TYPES_OF_PROJECT';
  static readonly TYPE_OF_PROJECT = 'TYPE_OF_PROJECT';

  loadMinimal: (pkProject: number, pkEntity: number) => ActionResultObservable<SchemaObject>;
  loadNestedObject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;

  typesOfProject: (pkProject: number) => ActionResultObservable<LoadActionMeta>;
  // typeOfProject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfPersistentItemActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'persistent_item'))

    // this.loadNestedObject = (pkProject: number, pkEntity: number) => {
    //   const addPending = U.uuid();
    //   const action: FluxStandardAction<Payload, LoadByPkMeta> = {
    //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.NESTED_BY_PK,
    //     meta: { addPending, pk: pkProject, pkEntity },
    //     payload: null,
    //   };
    //   this.ngRedux.dispatch(action)
    //   return {
    //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
    //     resolved$: this.ngRedux.select<SucceedActionMeta<LoadNestetedPeItResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
    //     key: addPending
    //   };
    // }
    this.loadMinimal = (pkProject: number, pkEntity: number) => {
      const addPending = U.uuid();
      const action: FluxStandardAction<Payload, LoadByPkMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
        meta: { addPending, pk: pkProject, pkEntity },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<SchemaObject>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    this.typesOfProject = (pkProject: number) => {
      const addPending = U.uuid();

      const action: FluxStandardAction<Payload, LoadTypesOfProjectAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
        meta: { addPending, pk: pkProject },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<LoadActionMeta>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    // this.typeOfProject = (pkProject: number, pkEntity: number) => {
    //   const addPending = U.uuid();

    //   const action: FluxStandardAction<Payload, LoadTypeOfProjectAction> = {
    //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPE_OF_PROJECT,
    //     meta: { addPending, pk: pkProject, pkEntity },
    //     payload: null,
    //   };
    //   this.ngRedux.dispatch(action)
    //   return {
    //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
    //     resolved$: this.ngRedux.select<SucceedActionMeta<LoadNestetedPeItResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
    //     key: addPending
    //   };
    // }

    return this;
  }

}
export type PaginatedStatements = number[]
export interface PaginatedStatementList {
  count: number,
  schemas: SchemaObject,
  paginatedStatements: PaginatedStatements
}
export interface LoadPaginatedStatementListMeta extends LoadActionMeta {
  pkSourceEntity: number // Pk of the source entity.
  pkProperty: number // Pk of the property.
  fkTargetClass: number // Pk of the target class.
  isOutgoing: boolean // If true, the source entity is domain, else range.
  limit: number // number of items per page.
  offset: number // offset.
  alternatives: boolean
}
export class InfTemporalEntityActionFactory extends InfActionFactory<Payload, InfTemporalEntity> {

  // Suffixes of load action types
  static readonly OWN_PROPERTIES = 'OWN_PROPERTIES';
  static readonly PAGINATED_LIST = 'PAGINATED_LIST';
  static readonly PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';

  loadNestedObject: (pkProject: number, pkEntity: number) => ActionResultObservable<InfTemporalEntity[]>;
  loadPaginatedList: (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => ActionResultObservable<PaginatedStatementList>;
  loadPaginatedAlternativeList: (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => ActionResultObservable<PaginatedStatementList>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfTemporalEntityActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'))

    this.loadNestedObject = (pkProject: number, pkEntity: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadByPkMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
        meta: { addPending, pk: pkProject, pkEntity },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<InfTemporalEntity[]>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    this.loadPaginatedList = (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadPaginatedStatementListMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_LIST,
        meta: {
          addPending,
          pk: pkProject,
          pkSourceEntity,
          fkTargetClass,
          pkProperty,
          isOutgoing,
          limit,
          offset,
          alternatives: false
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<PaginatedStatementList>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }
    this.loadPaginatedAlternativeList = (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadPaginatedStatementListMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST,
        meta: {
          addPending,
          pk: pkProject,
          pkSourceEntity,
          pkProperty,
          fkTargetClass,
          isOutgoing,
          limit,
          offset,
          alternatives: true
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<PaginatedStatementList>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }
    return this;
  }
}
export interface FindStatementByParams extends LoadActionMeta {
  ofProject: boolean,
  pkEntity: number,
  pkInfoRange: number,
  pkInfoDomain: number,
  pkProperty: number,
}
export interface ContentTreeMeta extends LoadActionMeta {
  pkExpressionEntity: number,
}
export interface SourcesAndDigitalsOfEntity extends LoadActionMeta {
  ofProject: boolean,
  pkEntity: number,
}
export interface SourcesAndDigitalsOfEntityResult {
  statements: InfStatement[],
  digitals: DatDigital[],
}


export interface LoadOutgoingAlternativeStatements extends LoadActionMeta { pkTemporalEntity: number, pkProperty: number };
export interface LoadIngoingAlternativeStatements extends LoadActionMeta { pkEntity: number, pkProperty: number };
export interface AddToProjectWithTeEntActionMeta { pkStatements: number[], pk: number, addPending: string };

export class InfStatementActionFactory extends InfActionFactory<Payload, InfStatement> {

  // Suffixes of load action types
  // static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
  static readonly ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';
  // static readonly ADD_TO_PROJECT_WITH_TE_EN = 'ADD_TO_PROJECT_WITH_TE_EN';
  static readonly PAGINATED_LIST = 'PAGINATED_LIST';
  static readonly CONTENT_TREE = 'CONTENT_TREE';
  static readonly SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
  static readonly BY_PARAMS = 'BY_PARAMS';

  loadIngoingAlternatives: (pkEntity, pkProperty, pkProjec) => ActionResultObservable<InfStatement>;
  loadPaginatedList: (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => ActionResultObservable<PaginatedStatementList>;

  // contentTree: (pkProject: number, pkExpressionEntity: number) => void;
  sourcesAndDigitalsOfEntity: (ofProject: boolean, pkProject: number, pkEntity: number) => ActionResultObservable<SourcesAndDigitalsOfEntityResult>;
  findByParams: (
    ofProject: boolean,
    pkProject: number,
    pkEntity: number,
    pkInfoRange: number,
    pkInfoDomain: number,
    pkProperty: number,
  ) => void;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfStatementActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'statement'))

    this.findByParams = (
      ofProject: boolean,
      pkProject: number,
      pkEntity: number,
      pkInfoRange: number,
      pkInfoDomain: number,
      pkProperty: number,
    ) => {
      const action: FluxStandardAction<Payload, FindStatementByParams> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.BY_PARAMS,
        meta: {
          addPending: U.uuid(),
          pk: pkProject,
          ofProject,
          pkEntity,
          pkInfoRange,
          pkInfoDomain,
          pkProperty,
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }


    this.loadIngoingAlternatives = (pkEntity: number, pkProperty: number, pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadIngoingAlternativeStatements> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.ALTERNATIVES_INGOING,
        meta: {
          addPending,
          pk: pkProject,
          pkEntity,
          pkProperty,
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<InfStatement>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    this.loadPaginatedList = (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadPaginatedStatementListMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.PAGINATED_LIST,
        meta: {
          addPending,
          pk: pkProject,
          pkSourceEntity,
          fkTargetClass,
          pkProperty,
          isOutgoing,
          limit,
          offset,
          alternatives: false
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<PaginatedStatementList>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    /**
    * Get an nested object with everything needed to display the
    * links made from an entity towards sources and digitals.
    */
    this.sourcesAndDigitalsOfEntity = (ofProject: boolean, pkProject: number, pkEntity: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, SourcesAndDigitalsOfEntity> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
        meta: {
          addPending,
          ofProject,
          pk: pkProject,
          pkEntity
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<SourcesAndDigitalsOfEntityResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}

export interface LoadAlternativeTextProperties extends LoadActionMeta { fkEntity: number, fkClassField: number };

export class InfTextPropertyActionFactory extends InfActionFactory<Payload, InfTextProperty> {

  // Suffixes of load action types
  static readonly ALTERNATIVES = 'ALTERNATIVES';

  loadAlternatives: (fkEntity, fkClassField, fkProject) => ActionResultObservable<InfTextProperty>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfTextPropertyActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'text_property'))

    this.loadAlternatives = (fkEntity: number, fkClassField: number, pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadAlternativeTextProperties> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTextPropertyActionFactory.ALTERNATIVES,
        meta: {
          addPending,
          pk: pkProject,
          fkEntity,
          fkClassField,
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<InfTextProperty>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}



@Injectable()
export class InfActions {

  persistent_item = new InfPersistentItemActionFactory(this.ngRedux).createActions();
  temporal_entity = new InfTemporalEntityActionFactory(this.ngRedux).createActions()
  statement = new InfStatementActionFactory(this.ngRedux).createActions()

  // TODO: pimp those up to real Inf Actions!
  language = new SchemaActionsFactory<Payload, InfLanguage>(this.ngRedux).createCrudActions(infRoot, 'language')
  appellation = new SchemaActionsFactory<Payload, InfAppellation>(this.ngRedux).createCrudActions(infRoot, 'appellation')
  lang_string = new SchemaActionsFactory<Payload, InfLangString>(this.ngRedux).createCrudActions(infRoot, 'lang_string')
  dimension = new SchemaActionsFactory<InfDimensionSlice, InfDimension>(this.ngRedux).createCrudActions(infRoot, 'dimension')
  place = new SchemaActionsFactory<Payload, InfPlace>(this.ngRedux).createCrudActions(infRoot, 'place')
  time_primitive = new SchemaActionsFactory<Payload, InfTimePrimitive>(this.ngRedux).createCrudActions(infRoot, 'time_primitive')
  text_property = new InfTextPropertyActionFactory(this.ngRedux).createActions()

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
