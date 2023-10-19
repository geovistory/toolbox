import { Injectable } from '@angular/core';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { tabCellActions } from './tab-cell.actions';
import { getCell, indexState } from './tab-cell.selectors';

@Injectable({
  providedIn: 'root'
})
export class TabCellFacade extends CrudFacade<TabCell> {

  indexed$ = this.store.select(indexState);

  constructor(protected store: Store<IAppState>) {
    super(store, tabCellActions)
  }

  getCell = {
    byPk: (pkCell: number) => this.store.select(getCell.byPk(pkCell)),
    byColumnRow: (col: number, row: number) => this.store.select(getCell.byColumnRow(col, row)),
  };
}
