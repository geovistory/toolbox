
import { Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RoleSetBase } from '../role-set.base';
import { InfEntityProjectRelApi, InfRoleApi } from 'app/core/sdk';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { RoleSet, RoleDetail } from '../../information.models';
import { RoleSetActions } from '../role-set.actions';
import { RoleSetService } from '../../shared/role-set.service';
import { RoleActions } from '../../role/role.actions';
import { StateCreatorService } from '../../shared/state-creator.service';
import { ClassService } from '../../shared/class.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { roleSetReducer } from '../role-set.reducer';


@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
export abstract class TeEntRoleSetBase extends RoleSetBase {

    /**
    * Paths to other slices of the store
    */
    @Input() parentTeEntStatePath: string[];
    parentPeItStatePath: string[];

    parentRoleStatePath: string[]

    constructor(
        protected eprApi: InfEntityProjectRelApi,
        protected roleApi: InfRoleApi,
        protected ngRedux: NgRedux<RoleSet>,
        protected actions: RoleSetActions,
        protected roleSetService: RoleSetService,
        protected roleStore: NgRedux<RoleDetail>,
        protected roleActions: RoleActions,
        protected stateCreator: StateCreatorService,
        protected classService: ClassService,
        protected fb: FormBuilder
    ) {
        super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
    }

    init(): void {
        console.log('init')
        this.initTeEntRoleSetChild()
    }

    abstract initTeEntRoleSetChild():void;




    /**
     * ADD STUFF FROM information TeEntRoleSetComponent
     */
}