// import { NgRedux } from '@angular-redux/store';
// import { Injectable } from '@angular/core';
// import { U } from '@kleiolab/lib-utils';
// import { FluxStandardAction } from 'flux-standard-action';
// import { IAppState } from '../../root/models/model';
// import { ModifyActionMeta, SchemaActionsFactory, SucceedActionMeta } from './schema-actions-factory';

// @Injectable()
// export class InfActionFactory<Payload, Model> extends SchemaActionsFactory<Model> {


//   constructor(public ngRedux: NgRedux<IAppState>, public actionPrefix: string, public modelName: string) {
//     super(ngRedux, actionPrefix, modelName);
//   }

//   /**
//    * Call the Redux Action to remove model instances from project.
//    */
//   remove(items: Model[], pk?: number) {
//     const addPending = U.uuid();
//     const action: FluxStandardAction<Payload, ModifyActionMeta<Model>> = ({
//       type: this.actionPrefix + '.' + this.modelName + '::REMOVE',
//       meta: { items, addPending, pk },
//       payload: null
//     })
//     this.ngRedux.dispatch(action)
//     return {
//       pending$: this.ngRedux.select<boolean>(['pending', addPending]),
//       resolved$: this.ngRedux.select<SucceedActionMeta<Model>>(['resolved', addPending]),
//       key: addPending
//     };
//   }

//   removeSucceeded(items: Model[], removePending: string, pk?: number) {
//     const action: FluxStandardAction<Payload, SucceedActionMeta<Model>> = ({
//       type: this.actionPrefix + '.' + this.modelName + '::REMOVE_SUCCEEDED',
//       meta: { items, removePending, pk },
//       payload: null
//     })
//     this.ngRedux.dispatch(action)
//   }


// }
