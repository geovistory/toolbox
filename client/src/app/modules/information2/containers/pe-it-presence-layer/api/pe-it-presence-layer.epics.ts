// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/ignoreElements';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/startWith';

// import { Injectable } from '@angular/core';
// import { LoadingBarAction, LoadingBarActions, U } from 'app/core';
// import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
// import { IAppState } from 'app/core/store/model';
// import { equals, path } from 'ramda';
// import { createEpicMiddleware, Epic } from 'redux-observable';
// import { Observable } from 'rxjs';

// import { DataUnitActions } from '../../../data-unit/data-unit.actions';
// import { PeItPresenceLayerComponent } from '../pe-it-presence-layer.component';
// import { DfhConfig } from '../../../shared/dfh-config';
// import { DataUnit, RoleDetail } from '../../../information.models';
// import { Action } from '../../../../../../../node_modules/redux';
// import { RoleSetActions } from '../../../role-set/role-set.actions';
// import { FluxStandardAction } from '../../../../../../../node_modules/flux-standard-action';

// const ofSubstore = (path: string[]) => (action): boolean => {
//     const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
//     const bool = equals(actionPath, path);
//     return bool;
// }

// const addCzmlPacket = (component: PeItPresenceLayerComponent, action): boolean => {

//     if (!action['@angular-redux::fractalkey']) return false;

//     // gets the path of the action's substore 
//     const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

//     // gets the state of that substore
//     const dataUnit: DataUnit = path(actionPath, component.ngRedux.getState());

//     // returns true, if the data unit is of the given pkClass 
//     const bool = dataUnit.fkClass == DfhConfig.CLASS_PK_PRESENCE ? true : false;
//     if (bool) {

//         const czmlPacket = U.czmlPacketFromPresence(dataUnit);
//         component.update(czmlPacket)
//     }

//     return bool;
// }


// const removeCzmlPacket = (component: PeItPresenceLayerComponent, action): boolean => {

//     if (!action['@angular-redux::fractalkey']) return false;

//     const roleDetail: RoleDetail = action.meta.roleDetail;

//     // returns true, if the data unit is of the given pkClass 
//     const bool = roleDetail._teEnt && roleDetail._teEnt.fkClass == DfhConfig.CLASS_PK_PRESENCE ? true : false;

//     if (bool) {

//         const czmlPacket = U.czmlPacketFromPresence(roleDetail._teEnt);
//         component.remove(czmlPacket.id)
//     }

//     return bool;
// }

// @Injectable()
// export class PeItPresenceLayerAPIEpics {
//     constructor(
//         private classApi: DfhClassApi,
//         private loadingBarActions: LoadingBarActions
//     ) { }

//     public createEpics(component: PeItPresenceLayerComponent) {
//         return [
//             createEpicMiddleware(this.createListenToDataUnitInitEpic(component)),
//             createEpicMiddleware(this.createListenToRoleRemovedFromProjectEpic(component))
//         ];
//     }

//     /**
//      * Listenes for DATA_UNIT_INIT actions, filters for Presences, creates czml packets
//      * @param  component the PeItPresenceLayerComponent
//      */
//     private createListenToDataUnitInitEpic(component: PeItPresenceLayerComponent): Epic<Action, IAppState> {
//         return (action$, store) => action$
//             .ofType(DataUnitActions.DATA_UNIT_INIT)
//             .filter(action => addCzmlPacket(component, action))
//             .switchMap((action) => new Observable<Action>((globalStore) => {
//                 globalStore.next({ type: 'NOOP' });
//             }))

//     }

//     /**
//      * Listenes for ROLE_REMOVED_FROM_PROJECT actions, filters for Presences, removes czml packet
//      * @param component the PeItPresenceLayerComponent
//      */
//     private createListenToRoleRemovedFromProjectEpic(component: PeItPresenceLayerComponent): Epic<Action, IAppState> {
//         return (action$, store) => action$
//             .ofType(RoleSetActions.ROLE_REMOVED_FROM_PROJECT)
//             .filter(action => removeCzmlPacket(component, action))
//             .switchMap((action) => new Observable<Action>((globalStore) => {
//                 globalStore.next({ type: 'NOOP' });
//             }))

//     }
// }
