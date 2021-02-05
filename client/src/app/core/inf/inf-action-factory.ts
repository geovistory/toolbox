import { StandardActionsFactory, ModifyActionMeta, SucceedActionMeta, ActionResultObservable } from "app/core/redux-store/actions";
import { Observable } from "rxjs";
import { NgRedux } from "@angular-redux/store";
import { U } from "app/core/util/util";
import { FluxStandardAction } from "flux-standard-action";
import { Injectable } from "@angular/core";
import { IAppState } from '../redux-store/model';

@Injectable()
export class InfActionFactory<Payload, Model> extends StandardActionsFactory<Payload, Model> {


  /**
   * @param pk is used for facetting
   */
  remove: (items: Model[], pk?: number) => ActionResultObservable<Model>;

  /**
   * @param pk is used for facetting
   */
  removeSucceeded: (items: Model[], removePending: string, pk?: number) => void;

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux);
  }

  createInfActions(actionPrefix: string, modelName: string): InfActionFactory<Payload, Model> {
    this.createCrudActions(actionPrefix, modelName)

    /**
     * Call the Redux Action to remove model instances from project.
     */
    this.remove = (items: Model[], pk?: number) => {
      const addPending = U.uuid();
      const action: FluxStandardAction<Payload, ModifyActionMeta<Model>> = ({
        type: this.actionPrefix + '.' + this.modelName + '::REMOVE',
        meta: { items, addPending, pk },
        payload: null
      })
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<Model>>(['resolved', addPending]),
        key: addPending
      };
    }

    this.removeSucceeded = (items: Model[], removePending: string, pk?: number) => {
      const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
        type: this.actionPrefix + '.' + this.modelName + '::REMOVE_SUCCEEDED',
        meta: { items, removePending, pk },
        payload: null
      })
      this.ngRedux.dispatch(action)
    }

    return this;
  }

}
