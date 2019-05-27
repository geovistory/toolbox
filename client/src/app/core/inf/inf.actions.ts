import { Injectable } from '@angular/core';
import { StandardActionsFactory, LoadActionMeta } from 'app/core/store/actions';
import { InfPersistentItem, InfEntityAssociation, InfRole, InfTemporalEntity, InfAppellation } from '../sdk';
import { NgRedux } from '@angular-redux/store';
import { IAppState, U } from 'app/core';
import { PersistentItemSlice } from './inf.models';
import { FluxStandardAction } from 'flux-standard-action';
import { infRoot } from './inf.config';
import { InfActionFactory } from './inf-action-factory';

type Payload = PersistentItemSlice;

export interface LoadByPkAction extends LoadActionMeta { pkEntity: number };

export class PeItActionFactory extends StandardActionsFactory<Payload, InfPersistentItem> {

  // Suffixes of load action types
  static readonly NESTED_BY_PK = 'NESTED_BY_PK';

  loadNestedObject: (pkProject: number, pkEntity: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): PeItActionFactory {
    Object.assign(this, this.createCrudActions(infRoot, 'persistent_item'))

    this.loadNestedObject = (pkProject: number, pkEntity: number) => {
      const action: FluxStandardAction<Payload, LoadByPkAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + PeItActionFactory.NESTED_BY_PK,
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

export class EntityAssoctiationActionFactory extends InfActionFactory<Payload, InfEntityAssociation> {
  // export class EntityAssoctiationActionFactory extends StandardActionsFactory<Payload, InfEntityAssociation> {

  // Suffixes of load action types
  static readonly BY_PARAMS = 'BY_PARAMS';
  static readonly CONTENT_TREE = 'CONTENT_TREE';

  findByParams: (
    ofProject: boolean,
    pkProject: number,
    pkEntity: number,
    pkInfoRange: number,
    pkInfoDomain: number,
    pkProperty: number,
  ) => void;

  contentTree: (pkProject: number, pkExpressionEntity: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): EntityAssoctiationActionFactory {
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
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + EntityAssoctiationActionFactory.BY_PARAMS,
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
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + EntityAssoctiationActionFactory.CONTENT_TREE,
        meta: {
          addPending: U.uuid(),
          pk: pkProject,
          pkExpressionEntity
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
    }

    return this;
  }
}




@Injectable()
export class InfActions {

  persistent_item = new PeItActionFactory(this.ngRedux).createActions();;
  entity_association = new EntityAssoctiationActionFactory(this.ngRedux).createActions()
  temporal_entity = new StandardActionsFactory<Payload, InfTemporalEntity>(this.ngRedux).createCrudActions(infRoot, 'temporal_entity')
  role = new StandardActionsFactory<Payload, InfRole>(this.ngRedux).createCrudActions(infRoot, 'role')
  appellation = new StandardActionsFactory<Payload, InfAppellation>(this.ngRedux).createCrudActions(infRoot, 'appellation')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
