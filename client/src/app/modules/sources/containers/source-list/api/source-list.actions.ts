import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SourceList } from './source-list.models';
import { ProjectCrm, PeItDetail } from 'app/core';
import { ClassAndTypePk } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.component';

type Payload = SourceList;
interface MetaData {
  pkEntity?: number;
  pkSource?: number;
  pkProject?: number;
  crm?: ProjectCrm;

  sourceDetail?: PeItDetail;
  sectionDetail?: PeItDetail;

  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
  pkAllowedClasses?: number[];
};
export type SourceListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SourceListAPIActions {

  static readonly INITIALIZE_LIST = 'SourceList::INITIALIZE_LIST';

  static readonly DESTROY = 'SourceList::DESTROY';


  /*********************************************************************
  *  Actions to manage the list
  *********************************************************************/

  @dispatch() initializeList = (pkAllowedClasses: number[]): SourceListAPIAction => ({
    type: SourceListAPIActions.INITIALIZE_LIST,
    meta: { pkAllowedClasses },
    payload: null
  })




  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): SourceListAPIAction => ({
    type: SourceListAPIActions.DESTROY,
    meta: null,
    payload: null
  })

}
