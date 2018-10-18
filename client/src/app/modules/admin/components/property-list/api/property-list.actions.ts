import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { PropertyListI } from './property-list.models';
import { DfhProperty } from 'app/core/sdk/models/DfhProperty';

type Payload = PropertyListI;
interface MetaData {
  properties?: DfhProperty[],
  property?: DfhProperty;
};
export type PropertyListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PropertyListAPIActions {
  static readonly LOAD = 'PropertyList::LOAD';
  static readonly LOAD_STARTED = 'PropertyList::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'PropertyList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'PropertyList::LOAD_FAILED';

  static readonly UPDATE_PROPERTY = 'PropertyList::UPDATE_PROPERTY';
  static readonly UPDATE_PROPERTY_SUCCEEDED = 'PropertyList::UPDATE_PROPERTY_SUCCEEDED';
  static readonly UPDATE_PROPERTY_FAILED = 'PropertyList::UPDATE_PROPERTY_FAILED';


  static readonly DESTROY = 'PropertyList::DESTROY';

  @dispatch()
  load = (): PropertyListAPIAction => ({
    type: PropertyListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): PropertyListAPIAction => ({
    type: PropertyListAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (properties: DfhProperty[]): PropertyListAPIAction => ({
    type: PropertyListAPIActions.LOAD_SUCCEEDED,
    meta: { properties },
    payload: null
  })

  loadFailed = (error): PropertyListAPIAction => ({
    type: PropertyListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })


  @dispatch()
  updateProperty = (property: DfhProperty): PropertyListAPIAction => ({
    type: PropertyListAPIActions.UPDATE_PROPERTY,
    meta: { property },
    payload: null,
  });

  updatePropertySucceeded = (property: DfhProperty): PropertyListAPIAction => ({
    type: PropertyListAPIActions.UPDATE_PROPERTY_SUCCEEDED,
    meta: { property },
    payload: null
  })

  updatePropertyFailed = (error): PropertyListAPIAction => ({
    type: PropertyListAPIActions.UPDATE_PROPERTY_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): PropertyListAPIAction => ({
    type: PropertyListAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
