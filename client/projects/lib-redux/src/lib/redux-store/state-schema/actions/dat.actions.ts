import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatChunk, DatColumn, DatDigital, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb3';
import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models/model';
import { ChunkSlice, ClassColumnMappingSlice, ColumnSlice, DigitalSlice, NamespaceSlice, TextPropertySlice } from '../models/dat.models';
import { datRoot } from '../reducer-configs/dat.config';
import { ActionResultObservable, LoadActionMeta, LoadVersionAction, SchemaActionsFactory, SucceedActionMeta } from '../_helpers/schema-actions-factory';


export class DigitalActionsFactory extends SchemaActionsFactory<DigitalSlice, DatDigital> {

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

export interface LoadChunksOfDigitalAction extends LoadActionMeta { pkDigital: number }

export class ChunkActionsFactory extends SchemaActionsFactory<ChunkSlice, DatChunk> {

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

export interface LoadColumnsOfTableAction extends LoadActionMeta { pkDigital: number }

export class ColumnActionsFactory extends SchemaActionsFactory<ColumnSlice, DatColumn> {

  // Suffixes of load action types
  static readonly COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';

  /**
   * Load a version. if entityVersion omitted, latest version is returned.
   */
  loadColumnsOfTable: (pkDigital: number, pk: number) => ActionResultObservable<DatColumn>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ColumnActionsFactory {
    Object.assign(this, this.createCrudActions(datRoot, 'column'))

    this.loadColumnsOfTable = (pkDigital: number, pk: number) => {
      const addPending = U.uuid()

      const action: FluxStandardAction<ColumnSlice, LoadColumnsOfTableAction> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
        meta: { addPending, pkDigital, pk },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DatColumn>>(['resolved', addPending]),
        key: addPending
      };
    }
    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DatActions {

  digital = new DigitalActionsFactory(this.ngRedux).createActions();

  chunk = new ChunkActionsFactory(this.ngRedux).createActions()

  column = new ColumnActionsFactory(this.ngRedux).createActions()

  class_column_mapping = new SchemaActionsFactory<ClassColumnMappingSlice, DatClassColumnMapping>(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping')

  namespace = new SchemaActionsFactory<NamespaceSlice, DatNamespace>(this.ngRedux).createCrudActions(datRoot, 'namespace')

  text_property = new SchemaActionsFactory<TextPropertySlice, DatTextProperty>(this.ngRedux).createCrudActions(datRoot, 'text_property')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}