import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PeItDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassAndTypePk } from '../../create-or-add-entity/create-or-add-entity.component';
import { Information } from './entity-list.models';

type Payload = Information;
interface MetaData {
  pkProject?: number,
  pkEntity?: number,
  peItDetail?: PeItDetail,
  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
  pkClasses?: number[]
};
export type InformationAPIAction = FluxStandardAction<Payload, MetaData>;

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
