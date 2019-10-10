import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Repros } from './repros.models';

type Payload = Repros;
interface MetaData {
  itemsArray?: any[]
};
export type ReprosAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ReprosAPIActions {
  static readonly INIT = 'Repros::INIT';

  static readonly LOAD = 'Repros::LOAD';
  static readonly LOAD_SUCCEEDED = 'Repros::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'Repros::LOAD_FAILED';

  static readonly TOGGLE_TEXT = 'Repros::TOGGLE_TEXT';


  static readonly DESTROY = 'Repros::DESTROY';

  /*********************************************************************
  *  Method to init the state
  *********************************************************************/
  @dispatch() init = (): ReprosAPIAction => ({
    type: ReprosAPIActions.INIT,
    meta: null,
    payload: null,
  });


  /*********************************************************************
  *  Method to toggle the visibility of elements
  *********************************************************************/
  @dispatch() load = (): ReprosAPIAction => ({
    type: ReprosAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): ReprosAPIAction => ({
    type: ReprosAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): ReprosAPIAction => ({
    type: ReprosAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to toggle the visibility of elements
  *********************************************************************/
  @dispatch() toggleText = (): ReprosAPIAction => ({
    type: ReprosAPIActions.TOGGLE_TEXT,
    meta: null,
    payload: null,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): ReprosAPIAction => ({
    type: ReprosAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
