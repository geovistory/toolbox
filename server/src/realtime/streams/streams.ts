import {Subject, BehaviorSubject} from 'rxjs';

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


  warehouseInitializing$ = new BehaviorSubject(false)

}
