import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi, InfTemporalEntityApi } from 'app/core';
import { RoleDetail, RoleSet, TeEntDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { Observable } from 'rxjs';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleSetAddCtrlBase } from '../../role-set-add-ctrl.base';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetApiEpics } from '../../role-set.epics';



@Component({
    selector: 'gv-te-ent-role-set-add-ctrl',
    templateUrl: './te-ent-role-set-add-ctrl.component.html',
    styleUrls: ['./te-ent-role-set-add-ctrl.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        slideInOut
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TeEntRoleSetAddCtrlComponent),
            multi: true
        }
    ]
})
export class TeEntRoleSetAddCtrlComponent extends RoleSetAddCtrlBase {


    /**
    * Paths to other slices of the store
    */
    @Input() parentTeEntStatePath: string[];
    parentPeItStatePath: string[];

    parentRoleDetailPath: string[]

    /**
     * Other Store Observables
     */
    showOntoInfo$: Observable<boolean>
    showCommunityStats$: Observable<boolean>

    roleSetState: RoleSet;
    parentTeEntState: TeEntDetail;
    parentRoleDetail: RoleDetail;


    constructor(
        protected rootEpics: RootEpics,
        protected epics: RoleSetApiEpics,
        protected eprApi: InfEntityProjectRelApi,
        protected roleApi: InfRoleApi,
        public ngRedux: NgRedux<IAppState>,
        protected actions: RoleSetActions,
        protected roleSetService: RoleSetService,
        protected roleStore: NgRedux<RoleDetail>,
        protected roleActions: RoleActions,
        protected classService: ClassService,
        protected fb: FormBuilder,
        private teEntApi: InfTemporalEntityApi

    ) {
        super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, classService, fb)
    }

    initRoleSetAddCtrlBaseChild() {

        this.initPaths()

        this.initObservablesOutsideLocalStore();

        this.initSubsciptions();

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
        this.showOntoInfo$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'showOntoInfo']);
    }

    /**
     * init subscriptions to observables in the store
     * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
     */
    initSubsciptions() {
        this.subs.push(this.ngRedux.select<TeEntDetail>(this.parentTeEntStatePath).subscribe(d => this.parentTeEntState = d))
        this.subs.push(this.ngRedux.select<RoleDetail>(this.parentRoleDetailPath).subscribe(d => this.parentRoleDetail = d))

    }

}
