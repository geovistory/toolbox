import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InfPersistentItem } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';

import { PeItDetail } from '../../information.models';
import { DataUnitBase } from '../data-unit.base';
import { PeItActions } from './pe-it.actions';
import { peItReducer } from './pe-it.reducer';

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

    @Input() basePath: string[];
    getBasePath = ():string[] => this.basePath;
    @select() peIt$: Observable<InfPersistentItem>

    localStore: ObservableStore<PeItDetail>;


    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: PeItActions,
        protected fb: FormBuilder
    ) {
        super(fb)
    }

    peItState: PeItDetail;

    init() {
        // initial state is useful for sandboxing the component
        this.onInitPeItBaseChild()
    }


    // gets called by base class onInit
    initStore() {

        this.localStore = this.ngRedux.configureSubStore(this.basePath, peItReducer);
        this.subs.push(this.localStore.select<PeItDetail>('').subscribe(d => {
            this.peItState = d
        }))
    }


    /***************************
     *  Hooks for child class
    ****************************/
    abstract onInitPeItBaseChild(): void;

}