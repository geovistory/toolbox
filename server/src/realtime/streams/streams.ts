import {BehaviorSubject, Subject} from 'rxjs';
import {WarFieldChange} from '../../models/war-field-change.model';

/**
 * This class initializes streams
 */
export class Streams {

  /**
   * Observable stream of timestamps (string) created by postgres
   * when entity preview table is updated. This allows to query
   * all modifications for the requested entity previews of the
   * currently connected clients.
   */
  warEntityPreviewModificationTmsp$ = new Subject<string>()

  /**
   * Observable of WarFieldChanges
   */
  warFieldChanges$ = new Subject<WarFieldChange>()


  // /**
  //  * caches the streamed entity previews per project
  //  */
  // streamedEntityPreviews: {[pkProject: number]: StreamedItems} = {}

  warehouseInitializing$ = new BehaviorSubject(false)

}
