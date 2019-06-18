import { Injectable } from '@angular/core';
import { StandardActionsFactory, LoadActionMeta, ActionResultObservable, SucceedActionMeta } from 'app/core/store/actions';
import { InfPersistentItem, InfEntityAssociation, InfRole, InfTemporalEntity, InfAppellation, InfPlace, InfTimePrimitive, InfTextProperty, InfLanguage, DatDigital } from '../sdk';
import { NgRedux } from '@angular-redux/store';
import { IAppState, U } from 'app/core';
import { InfPersistentItemSlice } from './inf.models';
import { FluxStandardAction } from 'flux-standard-action';
import { infRoot } from './inf.config';
import { InfActionFactory } from './inf-action-factory';

type Payload = InfPersistentItemSlice;

export interface LoadByPkAction extends LoadActionMeta { pkEntity: number };

export class InfPersistentItemActionFactory extends InfActionFactory<Payload, InfPersistentItem> {

  // Suffixes of load action types
  static readonly NESTED_BY_PK = 'NESTED_BY_PK';

  loadNestedObject: (pkProject: number, pkEntity: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfPersistentItemActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'persistent_item'))

    this.loadNestedObject = (pkProject: number, pkEntity: number) => {
      const action: FluxStandardAction<Payload, LoadByPkAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.NESTED_BY_PK,
        meta: { addPending: U.uuid(), pk: pkProject, pkEntity },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }
    return this;
  }
}
export class InfTemporalEntityActionFactory extends InfActionFactory<Payload, InfTemporalEntity> {

  // Suffixes of load action types
  static readonly NESTED_BY_PK = 'NESTED_BY_PK';

  loadNestedObject: (pkProject: number, pkEntity: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfTemporalEntityActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'))

    this.loadNestedObject = (pkProject: number, pkEntity: number) => {
      const action: FluxStandardAction<Payload, LoadByPkAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.NESTED_BY_PK,
        meta: { addPending: U.uuid(), pk: pkProject, pkEntity },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }
    return this;
  }
}
export interface FindEAByParams extends LoadActionMeta {
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
  entity_associations: InfEntityAssociation[],
  digitals: DatDigital[],
}
export class InfEntityAssoctiationActionFactory extends InfActionFactory<Payload, InfEntityAssociation> {
  // export class EntityAssoctiationActionFactory extends StandardActionsFactory<Payload, InfEntityAssociation> {

  // Suffixes of load action types
  static readonly BY_PARAMS = 'BY_PARAMS';
  static readonly CONTENT_TREE = 'CONTENT_TREE';
  static readonly SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';

  findByParams: (
    ofProject: boolean,
    pkProject: number,
    pkEntity: number,
    pkInfoRange: number,
    pkInfoDomain: number,
    pkProperty: number,
  ) => void;

  contentTree: (pkProject: number, pkExpressionEntity: number) => void;
  sourcesAndDigitalsOfEntity: (ofProject: boolean, pkProject: number, pkEntity: number) => ActionResultObservable<SourcesAndDigitalsOfEntityResult>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfEntityAssoctiationActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'entity_association'))

    this.findByParams = (
      ofProject: boolean,
      pkProject: number,
      pkEntity: number,
      pkInfoRange: number,
      pkInfoDomain: number,
      pkProperty: number,
    ) => {
      const action: FluxStandardAction<Payload, FindEAByParams> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfEntityAssoctiationActionFactory.BY_PARAMS,
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

    /**
     * Loads the hierarchy of an F2 Expression's content
     */
    this.contentTree = (pkProject, pkExpressionEntity) => {
      const action: FluxStandardAction<Payload, ContentTreeMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfEntityAssoctiationActionFactory.CONTENT_TREE,
        meta: {
          addPending: U.uuid(),
          pk: pkProject,
          pkExpressionEntity
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }

    /**
    * Get an nested object with everything needed to display the
    * links made from an entity towards sources and digitals.
    */
    this.sourcesAndDigitalsOfEntity = (ofProject: boolean, pkProject: number, pkEntity: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, SourcesAndDigitalsOfEntity> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfEntityAssoctiationActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
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
        resolved$: this.ngRedux.select<SucceedActionMeta<SourcesAndDigitalsOfEntityResult>>(['resolved', addPending]),
        key: addPending
      };
    }


    return this;
  }
}

export interface LoadOutgoingAlternativeRoles extends LoadActionMeta { pkTemporalEntity: number, pkProperty: number };
export interface LoadIngoingAlternativeRoles extends LoadActionMeta { pkEntity: number, pkProperty: number };

export class InfRoleActionFactory extends InfActionFactory<Payload, InfRole> {

  // Suffixes of load action types
  static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
  static readonly ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';

  loadOutgoingAlternatives: (pkTemporalEntity, pkProperty, pkProject) => ActionResultObservable<InfRole>;
  loadIngoingAlternatives: (pkEntity, pkProperty, pkProjec) => ActionResultObservable<InfRole>;

  contentTree: (pkProject: number, pkExpressionEntity: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): InfRoleActionFactory {
    Object.assign(this, this.createInfActions(infRoot, 'role'))

    this.loadOutgoingAlternatives = (pkTemporalEntity: number, pkProperty: number, pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadOutgoingAlternativeRoles> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfRoleActionFactory.ALTERNATIVES_OUTGOING,
        meta: {
          addPending,
          pk: pkProject,
          pkTemporalEntity,
          pkProperty,
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<InfRole>>(['resolved', addPending]),
        key: addPending
      };
    }

    this.loadIngoingAlternatives = (pkEntity: number, pkProperty: number, pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadIngoingAlternativeRoles> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfRoleActionFactory.ALTERNATIVES_INGOING,
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
        resolved$: this.ngRedux.select<SucceedActionMeta<InfRole>>(['resolved', addPending]),
        key: addPending
      };
    }

    return this;
  }
}




@Injectable()
export class InfActions {

  persistent_item = new InfPersistentItemActionFactory(this.ngRedux).createActions();;
  entity_association = new InfEntityAssoctiationActionFactory(this.ngRedux).createActions()
  temporal_entity = new InfTemporalEntityActionFactory(this.ngRedux).createActions()
  role = new InfRoleActionFactory(this.ngRedux).createActions()

  // TODO: pimp those up to real Inf Actions!
  language = new StandardActionsFactory<Payload, InfLanguage>(this.ngRedux).createCrudActions(infRoot, 'language')
  appellation = new StandardActionsFactory<Payload, InfAppellation>(this.ngRedux).createCrudActions(infRoot, 'appellation')
  place = new StandardActionsFactory<Payload, InfPlace>(this.ngRedux).createCrudActions(infRoot, 'place')
  time_primitive = new StandardActionsFactory<Payload, InfTimePrimitive>(this.ngRedux).createCrudActions(infRoot, 'time_primitive')
  text_property = new StandardActionsFactory<Payload, InfTextProperty>(this.ngRedux).createCrudActions(infRoot, 'text_property')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
