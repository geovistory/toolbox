import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SectionDetail } from './section-detail.models';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { ProjectCrm, PeItDetail, EntityPreview } from 'app/core';

type Payload = SectionDetail;
interface MetaData {
  pkSource?: number;
  pkSection?: number;
  pkProject?: number;
  pkSourceClass?: number;
  crm?: ProjectCrm;

  sectionDetail?: PeItDetail;
  sourcePreview?: EntityPreview;

  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
  pkAllowedClasses?: number[];

  tabTitle?: string;
};
export type SectionDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SectionDetailAPIActions {
  static readonly STATE_UPDATED = 'SectionDetail::STATE_UPDATED';

  static readonly LOAD_SECTION_DETAILS = 'SectionDetail::LOAD_SECTION_DETAILS';
  static readonly LOAD_SECTION_DETAILS_FAILED = 'SectionDetail::LOAD_SECTION_DETAILS_FAILED';
  static readonly LOAD_SECTION_DETAILS_SUCCEEDED = 'SectionDetail::LOAD_SECTION_DETAILS_SUCCEEDED';

  static readonly LOAD_SOURCE_PREVIEW = 'SectionDetail::LOAD_SOURCE_PREVIEW';
  static readonly LOAD_SOURCE_PREVIEW_FAILED = 'SectionDetail::LOAD_SOURCE_PREVIEW_FAILED';
  static readonly LOAD_SOURCE_PREVIEW_SUCCEEDED = 'SectionDetail::LOAD_SOURCE_PREVIEW_SUCCEEDED';

  static readonly REMOVE_SECTION = 'SectionDetail::REMOVE_SECTION';
  static readonly REMOVE_SECTION_SUCCEEDED = 'SectionDetail::REMOVE_SECTION_SUCCEEDED';
  static readonly REMOVE_SECTION_FAILED = 'SectionDetail::REMOVE_SECTION_FAILED';

  static readonly CLOSE = 'SectionDetail::CLOSE';

  static readonly START_REMOVE = 'SectionDetail::START_REMOVE';
  static readonly CANCEL_REMOVE = 'SectionDetail::CANCEL_REMOVE';
  static readonly REMOVED = 'SectionDetail::REMOVED';

  static readonly START_CREATE = 'SectionDetail::START_CREATE';
  static readonly STOP_CREATE = 'SectionDetail::STOP_CREATE';
  static readonly SOURCE_UPDATED = 'SectionDetail::SOURCE_UPDATED';

  static readonly STOP_CREATE_SECTION = 'SectionDetail::STOP_CREATE_SECTION';

  static readonly SET_TAB_TITLE = 'EntityDetail::SET_TAB_TITLE';

  static readonly DESTROY = 'SectionDetail::DESTROY';



  @dispatch() loadSourcePreview = (pkSection: number, pkProject: number): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SOURCE_PREVIEW,
    meta: { pkSection, pkProject },
    payload: null
  })


  loadSourcePreviewSucceeded = (sourcePreview: EntityPreview): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SOURCE_PREVIEW_SUCCEEDED,
    meta: { sourcePreview },
    payload: null
  })

  loadSourcePreviewFailed = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SOURCE_PREVIEW_FAILED,
    meta: {},
    payload: null
  })



  @dispatch() loadSectionDetails = (pkSection: number, pkSource: number, pkProject: number, crm: ProjectCrm): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SECTION_DETAILS,
    meta: { pkSection, pkSource, pkProject, crm },
    payload: null
  })


  loadSectionDetailsSucceeded = (sectionDetail: PeItDetail): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED,
    meta: { sectionDetail },
    payload: null
  })

  loadSectionDetailsFailed = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SECTION_DETAILS_FAILED,
    meta: {},
    payload: null
  })

  /**
* Shows create form
* - updates store: set 'create' true
*/
  @dispatch() startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

  /**
  * Hides create form
  * - updates store: set 'create' false
  */
  @dispatch() stopCreate = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })

  /**
  * Hides create section form
  * - updates store: set 'create' false
  */
  @dispatch() stopCreateSection = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.STOP_CREATE_SECTION,
    meta: null,
    payload: null
  })


  /**********************************************
  * Method remove Section from Project
  **********************************************/

  @dispatch() removeSection = (pkSection: number, pkSectionClass: number, pkSource: number, pkProject: number): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.REMOVE_SECTION,
    meta: { pkSection, pkSourceClass: pkSectionClass, pkSource, pkProject },
    payload: null
  })

  removeSectionSucceded = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.REMOVE_SECTION_SUCCEEDED,
    meta: null,
    payload: null
  })

  removeSectionFailed = (error): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.REMOVE_SECTION_FAILED,
    meta: null,
    payload: null,
    error
  })

  /*********************************************************************
   *  Set the tab title
   *********************************************************************/

  @dispatch() setTabTitle = (tabTitle: string): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })

}
