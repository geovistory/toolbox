import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, DatDigital, U } from 'app/core';
import { StandardActionsFactory, LoadActionMeta, SucceedActionMeta, ActionResultObservable } from 'app/core/store/actions';
import { datRoot } from './dat.config';
import { DigitalSlice, NamespaceSlice, ChunkSlice } from './dat.models';
import { DatNamespace, DatChunk } from '../sdk';
import { FluxStandardAction } from '../../../../node_modules/flux-standard-action';
import { ActionResolverService } from '../store/action-resolver.service';

export interface LoadVersionAction extends LoadActionMeta { pkEntity: number, entityVersion: number };

export class DigitalActionsFactory extends StandardActionsFactory<DigitalSlice, DatDigital> {

  // Suffixes of load action types
  static readonly LOAD_VERSION = 'LOAD_VERSION';

  /**
   * Load a version. if entityVersion omitted, latest version is returned.
   */
  loadVersion: (pkEntity: number, entityVersion?: number) => ActionResultObservable<DatDigital>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DigitalActionsFactory {
    Object.assign(this, this.createCrudActions(datRoot, 'digital'))

    this.loadVersion = (pkEntity: number, entityVersion?: number) => {
      const addPending = U.uuid()

      const action: FluxStandardAction<DigitalSlice, LoadVersionAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
        meta: { addPending, pkEntity, entityVersion },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DatDigital>>(['resolved', addPending]),
        key: addPending
      };
    }
    return this;
  }
}

export interface LoadChunksOfDigitalAction extends LoadActionMeta { pkDigital: number };

export class ChunkActionsFactory extends StandardActionsFactory<ChunkSlice, DatChunk> {

  // Suffixes of load action types
  static readonly CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';

  /**
   * Load a version. if entityVersion omitted, latest version is returned.
   */
  loadChunksOfDigital: (pkDigital: number, pk: number) => ActionResultObservable<DatChunk>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ChunkActionsFactory {
    Object.assign(this, this.createCrudActions(datRoot, 'chunk'))

    this.loadChunksOfDigital = (pkDigital: number, pk: number) => {
      const addPending = U.uuid()

      const action: FluxStandardAction<ChunkSlice, LoadChunksOfDigitalAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
        meta: { addPending, pkDigital, pk },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DatChunk>>(['resolved', addPending]),
        key: addPending
      };
    }
    return this;
  }
}

@Injectable()
export class DatActions {

  digital = new DigitalActionsFactory(this.ngRedux).createActions();

  chunk = new ChunkActionsFactory(this.ngRedux).createActions()

  namespace = new StandardActionsFactory<NamespaceSlice, DatNamespace>(this.ngRedux).createCrudActions(datRoot, 'namespace')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
