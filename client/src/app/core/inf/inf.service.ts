import { NgRedux, select } from '@angular-redux/store';
import { ByPk, IAppState } from 'app/core/store/model';
import { Observable } from 'rxjs';
import { InfPersistentItem } from '../sdk';
import { mergeMap } from 'rxjs/operators';


class InfPersistentItemSelections {
  constructor(public ngRedux: NgRedux<IAppState>, public pkProject$: Observable<number>) { }

  public by_pk_entity$ = this.pkProject$.pipe(
    mergeMap(pk => {
      return this.ngRedux.select<ByPk<InfPersistentItem>>(['inf', 'persistent_item', 'by_project', pk, 'by_pk_entity'])
    })
  )

}


export class InfSelector {

  constructor(public ngRedux: NgRedux<IAppState>, public pkProject$: Observable<number>) { }

  persistent_item$ = new InfPersistentItemSelections(this.ngRedux, this.pkProject$);

}
