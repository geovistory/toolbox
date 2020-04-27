import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { EntityDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information } from './entity-list.models';
import { ClassAndTypePk } from 'app/modules/base/components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';

type Payload = Information;
interface MetaData {
  // pkProject?: number,
  // pkEntity?: number,
  // peItDetail?: PeItDetail,
  // classAndTypePk?: ClassAndTypePk;
  // pkUiContext?: number;
  // pkClasses?: number[]
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
