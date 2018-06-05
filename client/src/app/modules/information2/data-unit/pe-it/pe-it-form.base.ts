import { Input, OnInit, OnDestroy } from "@angular/core";

import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { WithSubStore, dispatch, NgRedux, ObservableStore, select } from "@angular-redux/store";
import { FormBuilder } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { InfPersistentItem } from "app/core";
import { peItReducer } from "./pe-it.reducer";
import { PeItDetail } from "../../information.models";
import { PeItActions } from "./pe-it.actions";
import { DataUnitBase } from "../data-unit.base";



/**
 * hooks in on the level of
 * PeItDetail
 */
@AutoUnsubscribe()
@WithSubStore({
    localReducer: peItReducer,
    basePathMethodName: 'getBasePath'
})
export abstract class PeItFormBase extends DataUnitBase implements OnInit {

    // @WithSubStore needs a empty string for root     
    getBasePath = () => {
        return this.parentPath ? [...this.parentPath, 'peItState'] : ''
    }

    // ngRedux.configureSubStore needs a empty array for root 
    getBaseForConfigSubStore = () => {
        return this.parentPath ? [...this.parentPath, 'peItState'] : []
    }

    @select() peIt$: Observable<InfPersistentItem>


    localStore: ObservableStore<PeItDetail>;


    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: PeItActions,
        protected fb: FormBuilder
    ) {
        super(fb)
    }

    // if provided, initialState will be dispatched onInit replacing the lastState of substore 
    @Input() initState: PeItDetail;
    peItState: PeItDetail;

    ngOnInit() {
        // initial state is useful for sandboxing the component
        if (this.initState) this.updateState(this.initState)

        this.onInitPeItBaseChild()
    }


    // gets called by base class onInit
    initStore() {
        this.localStore = this.ngRedux.configureSubStore(this.getBaseForConfigSubStore(), peItReducer);
        this.subs.push(this.localStore.select<PeItDetail>('').subscribe(d => {
            this.peItState = d
        }))
    }

    /**
     * Updates the state of substore
     */
    @dispatch() updateState(payload: PeItDetail) {
        return this.actions.stateUpdated(payload)
    }


    /***************************
     *  Hooks for child class
    ****************************/
    abstract onInitPeItBaseChild(): void;

}