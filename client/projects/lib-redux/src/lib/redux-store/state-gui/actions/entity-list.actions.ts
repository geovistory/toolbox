import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information } from '../models';

type Payload = Information;
export type InformationAPIAction = FluxStandardAction<Payload, {}>;

@Injectable()
export class InformationAPIActions {



  static readonly DESTROY = 'Information::DESTROY';


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): InformationAPIAction => ({
    type: InformationAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
