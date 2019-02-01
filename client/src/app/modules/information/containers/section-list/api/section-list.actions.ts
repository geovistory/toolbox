import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SectionList } from './section-list.models';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { EntityAssociationList } from 'app/core/state/models/entity-association-list';
import { ProjectCrm, EntityPreviewList } from 'app/core';

type Payload = SectionList;
interface MetaData {
  pkSections?: number[];
  entityAssociationDetail?: EntityAssociationDetail;
  pkUiContext?: number;
  pkProject?: number;
  fkRangeEntity?: number;
  fkDomainEntity?: number;
  fkProperty?: number;
  crm?: ProjectCrm;
};
export type SectionListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SectionListAPIActions {
  static readonly LOAD = 'SectionList::LOAD';
  static readonly LOAD_SUCCEEDED = 'SectionList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'SectionList::LOAD_FAILED';


  static readonly START_CREATE = 'SectionList::START_CREATE';
  static readonly STOP_CREATE = 'SectionList::STOP_CREATE';
  static readonly CREATED = 'SectionList::CREATED';

  static readonly DESTROY = 'SectionList::DESTROY';

  @dispatch()
  load = (pkProject: number, fkDomainEntity: number, fkProperty: number, fkRangeEntity: number): SectionListAPIAction => ({
    type: SectionListAPIActions.LOAD,
    meta: { pkProject, fkRangeEntity, fkProperty, fkDomainEntity },
    payload: null,
  });

  loadSucceeded = (pkSections: number[]): SectionListAPIAction => ({
    type: SectionListAPIActions.LOAD_SUCCEEDED,
    meta: {
      pkSections
    },
    payload: null
  })

  loadFailed = (error): SectionListAPIAction => ({
    type: SectionListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /***************************************************************
   * Manage the create or add screen
   ***************************************************************/

  @dispatch()
  startCreate = (entityAssociationDetail: EntityAssociationDetail): SectionListAPIAction => ({
    type: SectionListAPIActions.START_CREATE,
    meta: { entityAssociationDetail },
    payload: null
  })

  @dispatch()
  stopCreate = (): SectionListAPIAction => ({
    type: SectionListAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })

  @dispatch()
  created = (): SectionListAPIAction => ({
    type: SectionListAPIActions.CREATED,
    meta: null,
    payload: null
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): SectionListAPIAction => ({
    type: SectionListAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
