import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatClassColumnMapping, DatColumn, DatDigital, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models/model';
import { DigitalSlice } from '../models/dat.models';
import { datRoot } from '../reducer-configs/dat.config';
import { LoadActionMeta, LoadVersionAction, SchemaActionsFactory, SucceedActionMeta } from '../_helpers/schema-actions-factory';


export class DigitalActionsFactory extends SchemaActionsFactory<DatDigital> {

  // Suffixes of load action types
  static readonly LOAD_VERSION = 'LOAD_VERSION';

  constructor(
    public ngRedux: NgRedux<IAppState>,
  ) { super(ngRedux, datRoot, 'digital') }

  loadVersion(pkEntity: number, entityVersion?: number) {
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
}

export interface LoadChunksOfDigitalAction extends LoadActionMeta { pkDigital: number }


export interface LoadColumnsOfTableAction extends LoadActionMeta { pkDigital: number }

// export class ColumnActionsFactory extends SchemaActionsFactory<DatColumn> {

//   // Suffixes of load action types
//   static readonly COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';


//   constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux, datRoot, 'column') }

//   loadColumnsOfTable(pkDigital: number, pk: number) {
//     const addPending = U.uuid()

//     const action: FluxStandardAction<ColumnSlice, LoadColumnsOfTableAction> = {
//       type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
//       meta: { addPending, pkDigital, pk },
//       payload: null,
//     };
//     this.ngRedux.dispatch(action)
//     return {
//       pending$: this.ngRedux.select<boolean>(['pending', addPending]),
//       resolved$: this.ngRedux.select<SucceedActionMeta<DatColumn>>(['resolved', addPending]),
//       key: addPending
//     };
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class DatActions {

  digital = new DigitalActionsFactory(this.ngRedux)

  chunk = new SchemaActionsFactory<DatNamespace>(this.ngRedux, datRoot, 'chunk')

  column = new SchemaActionsFactory<DatColumn>(this.ngRedux, datRoot, 'column') // new ColumnActionsFactory(this.ngRedux)

  class_column_mapping = new SchemaActionsFactory<DatClassColumnMapping>(this.ngRedux, datRoot, 'class_column_mapping')

  namespace = new SchemaActionsFactory<DatNamespace>(this.ngRedux, datRoot, 'namespace')

  text_property = new SchemaActionsFactory<DatTextProperty>(this.ngRedux, datRoot, 'text_property')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
