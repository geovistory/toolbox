import { select, WithSubStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk } from 'app/core/store/model';
import { Observable } from 'rxjs';
import { DfhClass, DfhLabel } from '../sdk';
import { DfhActions } from './dfh.actions';

// Class Selectors
@WithSubStore({ basePathMethodName: 'getBasePath', localReducer: () => { } })
class DfhClassSelections {
  @select() public by_dfh_pk_class$: Observable<ByPk<DfhClass>>;
  @select() public loading$: Observable<boolean>;
  getBasePath = () => ['dfh', 'klass'];
}

// Label Selectors
@WithSubStore({ basePathMethodName: 'getBasePath', localReducer: () => { } })
class DfhLabelSelections {
  @select() public by_pk_entity$: Observable<ByPk<DfhLabel>>;
  @select() public by_dfh_fk_class$: Observable<ByPk<ByPk<DfhLabel>>>;
  @select() public loading$: Observable<boolean>;
  getBasePath = () => ['dfh', 'label'];
}



@Injectable()
export class DfhService extends DfhActions {

  class$ = new DfhClassSelections()
  label$ = new DfhLabelSelections()

}
