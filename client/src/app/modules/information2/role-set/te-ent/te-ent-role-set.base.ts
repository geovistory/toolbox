import { NgRedux, WithSubStore } from '@angular-redux/store';
import { Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs/Observable';

import { RoleDetail, RoleSet, TeEntDetail } from '../../information.models';
import { RoleActions } from '../../role/role.actions';
import { ClassService } from '../../shared/class.service';
import { RoleSetService } from '../../shared/role-set.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { RoleSetAddCtrlBase } from '../role-set-add-ctrl.base';
import { RoleSetActions } from '../role-set.actions';
import { roleSetReducer } from '../role-set.reducer';



@AutoUnsubscribe()
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: roleSetReducer
})
export abstract class TeEntRoleSetBase extends RoleSetAddCtrlBase {

    /**
    * Paths to other slices of the store
    */
    @Input() parentTeEntStatePath: string[];
    parentPeItStatePath: string[];

    parentRoleDetailPath: string[]

    /**
     * Other Store Observables
     */
    ontoInfoVisible$: Observable<boolean>
    communityStatsVisible$: Observable<boolean>

    roleSet: RoleSet;
    parentTeEntState: TeEntDetail;
    parentRoleDetail: RoleDetail;


    constructor(
        protected eprApi: InfEntityProjectRelApi,
        protected roleApi: InfRoleApi,
        protected ngRedux: NgRedux<IAppState>,
        protected actions: RoleSetActions,
        protected roleSetService: RoleSetService,
        protected roleStore: NgRedux<RoleDetail>,
        protected roleActions: RoleActions,
        protected stateCreator: StateCreatorService,
        protected classService: ClassService,
        protected fb: FormBuilder,
    ) {
        super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
    }

    init() {

        this.initPaths()

        this.initObservablesOutsideLocalStore();

        this.initSubsciptions();

        this.initTeEntRoleSetChild();
    }
    /**
       * init paths to different slices of the store
       */
    initPaths() {
        // transforms e.g. 
        // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', '_role_list', '88899', 'childTeEnt'] to
        // ['information', 'entityEditor', 'peItState']
        this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 5));

        // transforms e.g. 
        // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', '_role_list', '88899', 'childTeEnt'] to
        // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', ]
        this.parentRoleDetailPath = this.parentPath.slice(0, (this.parentPath.length - 3));

    }


    /**
     * init observables to other slices of the store than the local store
     * (to select observables from local store, use @select decorator)
     */
    initObservablesOutsideLocalStore() {
        this.ontoInfoVisible$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'ontoInfoVisible']);
    }

    /**
     * init subscriptions to observables in the store
     * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
     */
    initSubsciptions() {
        this.subs.push(this.ngRedux.select<TeEntDetail>(this.parentTeEntStatePath).subscribe(d => this.parentTeEntState = d))
        this.subs.push(this.ngRedux.select<RoleDetail>(this.parentRoleDetailPath).subscribe(d => this.parentRoleDetail = d))

    }

    abstract initTeEntRoleSetChild(): void;


}

