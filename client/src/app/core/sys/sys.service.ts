import { select, WithSubStore } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { ByPk } from '../store/model';
import { SysActions } from './sys.actions';


// Label Selectors
@WithSubStore({ basePathMethodName: 'getBasePath', localReducer: () => { } })
class SysSystemRelevantClassSelections {
  @select() public by_pk_entity$: Observable<ByPk<SysSystemRelevantClass>>;
  @select() public by_fk_class$: Observable<ByPk<ByPk<SysSystemRelevantClass>>>;
  @select() public by_required_by_sources$: Observable<ByPk<ByPk<SysSystemRelevantClass>>>;
  @select() public loading$: Observable<boolean>;
  getBasePath = () => ['sys', 'system_relevant_class'];
}

export class SystemService extends SysActions {
  system_relevant_class$ = new SysSystemRelevantClassSelections() 
}