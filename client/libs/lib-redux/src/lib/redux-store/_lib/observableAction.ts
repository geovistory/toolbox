import { Action } from 'redux';
import { Observable } from 'rxjs';

interface A extends Action {
  meta?: any
}
export type ActionsObservable = Observable<A>
