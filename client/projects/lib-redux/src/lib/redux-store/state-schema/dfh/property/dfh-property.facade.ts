import { Injectable } from '@angular/core';
import { DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { dfhPropertyActions } from './dfh-property.actions';
import { getDfhProperty, indexState } from './dfh-property.selectors';

@Injectable()
export class DfhPropertyFacade extends CrudFacade<DfhProperty> {

  dfhProperty$ = this.store.select(indexState);

  constructor(protected store: Store<IAppState>) {
    super(store, dfhPropertyActions)
  }
  getDfhProperty = {
    byPropDomainRange: (prop: number, domainClass: number, rangeClass: number) => this.store.select(getDfhProperty.byPropDomainRange(prop, domainClass, rangeClass)),
    byDomain: (domainClass: number) => this.store.select(getDfhProperty.byDomain(domainClass)),
    byRange: (rangeClass: number) => this.store.select(getDfhProperty.byRange(rangeClass)),
    byProperty: (prop: number) => this.store.select(getDfhProperty.byProperty(prop)),
    byHasTypeSubproperty: (isHasTypeSubProp: boolean) => this.store.select(getDfhProperty.byHasTypeSubproperty(isHasTypeSubProp)),
  }

}
