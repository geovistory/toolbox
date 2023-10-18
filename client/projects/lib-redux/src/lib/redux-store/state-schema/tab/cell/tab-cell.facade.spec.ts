import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { tabFeatureKey } from "../tab.feature.key";
import { TabState } from "../tab.models";
import { TabCellFacade } from './tab-cell.facade';
import { tabCellReducers } from './tab-cell.reducer';

fdescribe('TabCell Facade', () => {
  let facade: TabCellFacade;
  let store: Store<TabState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(tabFeatureKey, tabCellReducers),
      ],
      providers: [TabCellFacade]
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        CustomFeatureModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(TabCellFacade);
    store = TestBed.inject(Store);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.indexed$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item ', async () => {
    const a: TabCell = { pk_cell: 11, fk_row: 22, fk_column: 33 };
    facade.loadSucceeded([a], "")
    const res = await firstValueFrom(facade.getCell.byPk(11))
    expect(res).toEqual(a)
    const res2 = await firstValueFrom(facade.getCell.byColumnRow(33, 22))
    expect(res2).toEqual({ 11: a })
  });

})
