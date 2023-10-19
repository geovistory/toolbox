import { GvFieldPage, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IAppState } from '../../state.model';
import { CrudActionsFactory } from './crud-actions-factory';


interface SucceedActionMeta<Model> { items: Model[], removePending: string, pk?: number }
interface ActionResultObservable<Model> { pending$: Observable<boolean>, resolved$: Observable<SucceedActionMeta<Model>>, key: string }

export class CrudFacade<Model> {
  constructor(
    protected store: Store<IAppState>,
    private actions: CrudActionsFactory<Model>
  ) {
  }

  load(suffix: string = '', pk?: number): ActionResultObservable<Model> {
    const addPending = U.uuid()
    this.store.dispatch(this.actions.loadAction(suffix, addPending, pk))
    return {
      pending$: this.store.select((s) => s?.pending?.[addPending]),
      resolved$: this.store.select<SucceedActionMeta<Model>>(s => s.resolved?.[addPending]),
      key: addPending
    };
  }

  loadSucceeded(items: Model[], removePending: string, pk?: number): void {
    this.store.dispatch(this.actions.loadSucceededAction(items, removePending, pk))
  }

  /**
   * Call the Redux Action to upsert model instances.
   */
  upsert(items: Partial<Model>[], pk?: number): ActionResultObservable<Partial<Model>> {
    const addPending = U.uuid();
    this.store.dispatch(this.actions.upsertAction(items, addPending, pk))
    return {
      pending$: this.store.select((s) => s?.pending?.[addPending]),
      resolved$: this.store.select<SucceedActionMeta<Model>>(s => s.resolved?.[addPending]),
      key: addPending
    };
  }

  upsertSucceeded(items: Model[], removePending: string, pk?: number): void {
    this.store.dispatch(this.actions.upsertSucceededAction(items, removePending, pk))
  }

  /**
   * this action is not model specific but pendingKey specific.
   * Reducer will add whole meta part to the resolved key
   */
  succeeded(items: Model[], removePending: string, pk?: number): void {
    this.store.dispatch(this.actions.succeededAction(items, removePending, pk))
  }


  /**
  * Call the Redux Action to delete model instances.
  */
  delete(items: Model[], pk?: number): ActionResultObservable<Model> {
    const addPending = U.uuid();
    this.store.dispatch(this.actions.deleteAction(items, addPending, pk))
    return {
      pending$: this.store.select((s) => s?.pending?.[addPending]),
      resolved$: this.store.select<SucceedActionMeta<Model>>(s => s.resolved?.[addPending]).pipe(filter(x => !!x)),
      key: addPending
    };
  }

  deleteSucceeded(items: Model[], removePending: string, pk?: number): void {
    this.store.dispatch(this.actions.deleteSucceededAction(items, removePending, pk))
  }

  failed(error, removePending: string, pk?: number): void {
    this.store.dispatch(this.actions.failedAction(error, removePending, pk))
  }


  loadPage(page: GvFieldPage, pk?: number): void {
    this.store.dispatch(this.actions.loadPageAction(page, pk))
  }

  loadPageSucceeded(statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number): void {
    this.store.dispatch(this.actions.loadPageSucceededAction(statements, count, page, pk))
  }



  loadPageFailed(page: GvFieldPage, pk?: number): void {
    this.store.dispatch(this.actions.loadPageFailedAction(page, pk))
  }
}
