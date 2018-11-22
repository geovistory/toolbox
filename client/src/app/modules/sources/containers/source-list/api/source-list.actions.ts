import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SourceList } from './source-list.models';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { ProjectCrm, PeItDetail } from 'app/core';

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
  static readonly STATE_UPDATED = 'SourceList::STATE_UPDATED';

  static readonly INITIALIZE_LIST = 'SourceList::INITIALIZE_LIST';

  static readonly LOAD_SOURCE_DETAILS = 'SourceList::LOAD_SOURCE_DETAILS';
  static readonly LOAD_SOURCE_DETAILS_FAILED = 'SourceList::LOAD_SOURCE_DETAILS_FAILED';
  static readonly LOAD_SOURCE_DETAILS_SUCCEEDED = 'SourceList::LOAD_SOURCE_DETAILS_SUCCEEDED';

  static readonly LOAD_SECTION_DETAILS = 'SourceList::LOAD_SECTION_DETAILS';
  static readonly LOAD_SECTION_DETAILS_FAILED = 'SourceList::LOAD_SECTION_DETAILS_FAILED';
  static readonly LOAD_SECTION_DETAILS_SUCCEEDED = 'SourceList::LOAD_SECTION_DETAILS_SUCCEEDED';

  static readonly REMOVE_SOURCE = 'SourceList::REMOVE_SOURCE';
  static readonly REMOVE_SOURCE_SUCCEEDED = 'SourceList::REMOVE_SOURCE_SUCCEEDED';
  static readonly REMOVE_SOURCE_FAILED = 'SourceList::REMOVE_SOURCE_FAILED';


  static readonly REMOVE_SECTION = 'SourceList::REMOVE_SECTION';
  static readonly REMOVE_SECTION_SUCCEEDED = 'SourceList::REMOVE_SECTION_SUCCEEDED';
  static readonly REMOVE_SECTION_FAILED = 'SourceList::REMOVE_SECTION_FAILED';

  static readonly CLOSE = 'SourceList::CLOSE';

  static readonly START_REMOVE = 'SourceList::START_REMOVE';
  static readonly CANCEL_REMOVE = 'SourceList::CANCEL_REMOVE';
  static readonly REMOVED = 'SourceList::REMOVED';

  static readonly START_CREATE = 'SourceList::START_CREATE';
  static readonly STOP_CREATE = 'SourceList::STOP_CREATE';
  static readonly SOURCE_UPDATED = 'SourceList::SOURCE_UPDATED';

  static readonly STOP_CREATE_SECTION = 'SourceList::STOP_CREATE_SECTION';


  static readonly DESTROY = 'SourceList::DESTROY';



  /**
   * Updates the list of search hits in store
   */
  @dispatch() initializeList = (pkAllowedClasses: number[]): SourceListAPIAction => ({
    type: SourceListAPIActions.INITIALIZE_LIST,
    meta: { pkAllowedClasses },
    payload: null
  })



  @dispatch() loadSourceDetails = (pkEntity: number, pkProject: number, crm: ProjectCrm): SourceListAPIAction => ({
    type: SourceListAPIActions.LOAD_SOURCE_DETAILS,
    meta: { pkEntity, pkProject, crm },
    payload: null
  })


  loadSourceDetailsSucceeded = (sourceDetail: PeItDetail): SourceListAPIAction => ({
    type: SourceListAPIActions.LOAD_SOURCE_DETAILS_SUCCEEDED,
    meta: { sourceDetail },
    payload: null
  })

  loadSourceDetailsFailed = (): SourceListAPIAction => ({
    type: SourceListAPIActions.LOAD_SOURCE_DETAILS_FAILED,
    meta: {},
    payload: null
  })


  @dispatch() loadSectionDetails = (pkSource: number, pkEntity: number, pkProject: number, crm: ProjectCrm): SourceListAPIAction => ({
    type: SourceListAPIActions.LOAD_SECTION_DETAILS,
    meta: { pkSource, pkEntity, pkProject, crm },
    payload: null
  })


  loadSectionDetailsSucceeded = (sectionDetail: PeItDetail): SourceListAPIAction => ({
    type: SourceListAPIActions.LOAD_SECTION_DETAILS_SUCCEEDED,
    meta: { sectionDetail },
    payload: null
  })

  loadSectionDetailsFailed = (): SourceListAPIAction => ({
    type: SourceListAPIActions.LOAD_SECTION_DETAILS_FAILED,
    meta: {},
    payload: null
  })

  /**
* Shows create form
* - updates store: set 'create' true
*/
  @dispatch() startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): SourceListAPIAction => ({
    type: SourceListAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

  /**
  * Hides create form
  * - updates store: set 'create' false
  */
  @dispatch() stopCreate = (): SourceListAPIAction => ({
    type: SourceListAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })

  /**
  * Hides create section form
  * - updates store: set 'create' false
  */
  @dispatch() stopCreateSection = (): SourceListAPIAction => ({
    type: SourceListAPIActions.STOP_CREATE_SECTION,
    meta: null,
    payload: null
  })


  /**********************************************
 * Method remove Source from Project
 **********************************************/

  @dispatch() removeSource = (pkEntity: number, pkProject: number): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVE_SOURCE,
    meta: { pkEntity, pkProject },
    payload: null
  })

  removeSourceSucceded = (): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVE_SOURCE_SUCCEEDED,
    meta: null,
    payload: null
  })

  removeSourceFailed = (error): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVE_SOURCE_FAILED,
    meta: null,
    payload: null,
    error
  })

  /**********************************************
* Method remove Section from Project
**********************************************/

  @dispatch() removeSection = (pkEntity: number, pkProject: number): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVE_SECTION,
    meta: { pkEntity, pkProject },
    payload: null
  })

  removeSectionSucceded = (): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVE_SECTION_SUCCEEDED,
    meta: null,
    payload: null
  })

  removeSectionFailed = (error): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVE_SECTION_FAILED,
    meta: null,
    payload: null,
    error
  })

  // @dispatch()  stateUpdated = (payload: ISourceListState): SourceListAPIAction => ({
  //   type: SourceListAPIActions.STATE_UPDATED,
  //   meta: null,
  //   payload
  // })

  //   /**
  //   * Opens a source for viewing and editing
  //   * - creates a SourceDetailState
  //   * - update store: 'edit'
  //   */
  //   @dispatch() open = (edit: ISourceDetailState): SourceListAPIAction => ({
  //     type: SourceListAPIActions.OPEN,
  //     meta: null,
  //     payload: {
  //       edit
  //     }
  //   })

  //   /**
  // * Closes a source
  // * - update store: delete 'edit'
  // */
  //   @dispatch() close = (): SourceListAPIAction => ({
  //     type: SourceListAPIActions.CLOSE,
  //     meta: null,
  //     payload: null
  //   })


  //   /**
  //    * Leads to the 'are you sure?' question
  //    * - update store: set 'remove' = add a clone of entry
  //    */
  //   @dispatch() startRemove = (remove: ISourceSearchHitState): SourceListAPIAction => ({
  //     type: SourceListAPIActions.START_REMOVE,
  //     meta: null,
  //     payload: {
  //       remove
  //     }
  //   })

  //   /**
  //   * Back to list
  //   * - update store: delete 'remove'
  //   */
  //   @dispatch() cancelRemove = (): SourceListAPIAction => ({
  //     type: SourceListAPIActions.CANCEL_REMOVE,
  //     meta: null,
  //     payload: null
  //   })


  //   /**
  //   * Back to list
  //   * - update store: delete 'remove'
  //   */
  //   @dispatch() removed = (): SourceListAPIAction => ({
  //     type: SourceListAPIActions.REMOVED,
  //     meta: null,
  //     payload: null
  //   })




  //   /**
  //   *  Updates store: updates 'edit', 'view', sets 'edit', 'edit' false
  //   */
  //   @dispatch() sourceUpdated = (digitObj: InfDigitalObject): SourceListAPIAction => ({
  //     type: SourceListAPIActions.SOURCE_UPDATED,
  //     meta: null,
  //     payload: {
  //       edit: {
  //         view: digitObj
  //       }
  //     }
  //   })


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
