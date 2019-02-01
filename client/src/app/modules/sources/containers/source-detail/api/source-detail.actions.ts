import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SourceDetail } from './source-detail.models';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { ProjectCrm, PeItDetail } from 'app/core';

type Payload = SourceDetail;
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

  tabTitle?: string
};
export type SourceDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SourceDetailAPIActions {
  static readonly STATE_UPDATED = 'SourceDetail::STATE_UPDATED';

  static readonly LOAD_SOURCE_DETAILS = 'SourceDetail::LOAD_SOURCE_DETAILS';
  static readonly LOAD_SOURCE_DETAILS_FAILED = 'SourceDetail::LOAD_SOURCE_DETAILS_FAILED';
  static readonly LOAD_SOURCE_DETAILS_SUCCEEDED = 'SourceDetail::LOAD_SOURCE_DETAILS_SUCCEEDED';

  static readonly REMOVE_SOURCE = 'SourceDetail::REMOVE_SOURCE';
  static readonly REMOVE_SOURCE_SUCCEEDED = 'SourceDetail::REMOVE_SOURCE_SUCCEEDED';
  static readonly REMOVE_SOURCE_FAILED = 'SourceDetail::REMOVE_SOURCE_FAILED';

  static readonly START_REMOVE = 'SourceDetail::START_REMOVE';
  static readonly CANCEL_REMOVE = 'SourceDetail::CANCEL_REMOVE';
  static readonly REMOVED = 'SourceDetail::REMOVED';

  static readonly START_CREATE = 'SourceDetail::START_CREATE';
  static readonly STOP_CREATE = 'SourceDetail::STOP_CREATE';
  static readonly SOURCE_UPDATED = 'SourceDetail::SOURCE_UPDATED';

  static readonly SET_TAB_TITLE = 'EntityDetail::SET_TAB_TITLE';

  static readonly DESTROY = 'SourceDetail::DESTROY';


  @dispatch() loadSourceDetails = (pkEntity: number, pkProject: number, crm: ProjectCrm): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.LOAD_SOURCE_DETAILS,
    meta: { pkEntity, pkProject, crm },
    payload: null
  })


  loadSourceDetailsSucceeded = (sourceDetail: PeItDetail): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.LOAD_SOURCE_DETAILS_SUCCEEDED,
    meta: { sourceDetail },
    payload: null
  })

  loadSourceDetailsFailed = (): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.LOAD_SOURCE_DETAILS_FAILED,
    meta: {},
    payload: null
  })


  // @dispatch() loadSectionDetails = (pkSource: number, pkEntity: number, pkProject: number, crm: ProjectCrm): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.LOAD_SECTION_DETAILS,
  //   meta: { pkSource, pkEntity, pkProject, crm },
  //   payload: null
  // })


  // loadSectionDetailsSucceeded = (sectionDetail: PeItDetail): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED,
  //   meta: { sectionDetail },
  //   payload: null
  // })

  // loadSectionDetailsFailed = (): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.LOAD_SECTION_DETAILS_FAILED,
  //   meta: {},
  //   payload: null
  // })

  /**
* Shows create form
* - updates store: set 'create' true
*/
  @dispatch() startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

  /**
  * Hides create form
  * - updates store: set 'create' false
  */
  @dispatch() stopCreate = (): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })

  // /**
  // * Hides create section form
  // * - updates store: set 'create' false
  // */
  // @dispatch() stopCreateSection = (): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.STOP_CREATE_SECTION,
  //   meta: null,
  //   payload: null
  // })


  /**********************************************
 * Method remove Source from Project
 **********************************************/

  @dispatch() removeSource = (pkEntity: number, pkProject: number): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.REMOVE_SOURCE,
    meta: { pkEntity, pkProject },
    payload: null
  })

  removeSourceSucceded = (): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.REMOVE_SOURCE_SUCCEEDED,
    meta: null,
    payload: null
  })

  removeSourceFailed = (error): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.REMOVE_SOURCE_FAILED,
    meta: null,
    payload: null,
    error
  })

  /**********************************************
* Method remove Section from Project
**********************************************/

  // @dispatch() removeSection = (pkEntity: number, pkProject: number): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.REMOVE_SECTION,
  //   meta: { pkEntity, pkProject },
  //   payload: null
  // })

  // removeSectionSucceded = (): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.REMOVE_SECTION_SUCCEEDED,
  //   meta: null,
  //   payload: null
  // })

  // removeSectionFailed = (error): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.REMOVE_SECTION_FAILED,
  //   meta: null,
  //   payload: null,
  //   error
  // })

  // @dispatch()  stateUpdated = (payload: ISourceDetailState): SourceDetailAPIAction => ({
  //   type: SourceDetailAPIActions.STATE_UPDATED,
  //   meta: null,
  //   payload
  // })

  //   /**
  //   * Opens a source for viewing and editing
  //   * - creates a SourceDetailState
  //   * - update store: 'edit'
  //   */
  //   @dispatch() open = (edit: ISourceDetailState): SourceDetailAPIAction => ({
  //     type: SourceDetailAPIActions.OPEN,
  //     meta: null,
  //     payload: {
  //       edit
  //     }
  //   })

  //   /**
  // * Closes a source
  // * - update store: delete 'edit'
  // */
  //   @dispatch() close = (): SourceDetailAPIAction => ({
  //     type: SourceDetailAPIActions.CLOSE,
  //     meta: null,
  //     payload: null
  //   })


  //   /**
  //    * Leads to the 'are you sure?' question
  //    * - update store: set 'remove' = add a clone of entry
  //    */
  //   @dispatch() startRemove = (remove: ISourceSearchHitState): SourceDetailAPIAction => ({
  //     type: SourceDetailAPIActions.START_REMOVE,
  //     meta: null,
  //     payload: {
  //       remove
  //     }
  //   })

  //   /**
  //   * Back to list
  //   * - update store: delete 'remove'
  //   */
  //   @dispatch() cancelRemove = (): SourceDetailAPIAction => ({
  //     type: SourceDetailAPIActions.CANCEL_REMOVE,
  //     meta: null,
  //     payload: null
  //   })


  //   /**
  //   * Back to list
  //   * - update store: delete 'remove'
  //   */
  //   @dispatch() removed = (): SourceDetailAPIAction => ({
  //     type: SourceDetailAPIActions.REMOVED,
  //     meta: null,
  //     payload: null
  //   })




  //   /**
  //   *  Updates store: updates 'edit', 'view', sets 'edit', 'edit' false
  //   */
  //   @dispatch() sourceUpdated = (digitObj: InfDigitalObject): SourceDetailAPIAction => ({
  //     type: SourceDetailAPIActions.SOURCE_UPDATED,
  //     meta: null,
  //     payload: {
  //       edit: {
  //         view: digitObj
  //       }
  //     }
  //   })

 /*********************************************************************
  *  Set the tab title
  *********************************************************************/

 @dispatch() setTabTitle = (tabTitle: string): SourceDetailAPIAction => ({
  type: SourceDetailAPIActions.SET_TAB_TITLE,
  meta: { tabTitle },
  payload: null
})

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): SourceDetailAPIAction => ({
    type: SourceDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })

}
