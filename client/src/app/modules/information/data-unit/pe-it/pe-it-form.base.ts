import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InfPersistentItem } from 'app/core';
import { PeItDetail } from 'app/core/state/models';
import { Observable } from 'rxjs';
import { DataUnitBase } from '../data-unit.base';
import { PeItActions } from './pe-it.actions';
import { peItReducer } from './pe-it.reducer';
import { RootEpics } from 'app/core/store/epics';
import { DataUnitAPIEpics } from '../data-unit.epics';


/**
 * hooks in on the level of
 * PeItDetail
 */
@WithSubStore({
    localReducer: peItReducer,
    basePathMethodName: 'getBasePath'
})
export abstract class PeItFormBase extends DataUnitBase implements OnInit {

    peIt: InfPersistentItem;

    @Input() basePath: string[];
    @select() peIt$: Observable<InfPersistentItem>

    localStore: ObservableStore<PeItDetail>;

    peItState: PeItDetail;

    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: PeItActions,
        protected fb: FormBuilder,
        protected rootEpics: RootEpics,
        protected dataUnitEpics: DataUnitAPIEpics
    ) {
        super(ngRedux, fb, rootEpics, dataUnitEpics);
    }

    getBasePath = (): string[] => this.basePath;


    init() {
        // initial state is useful for sandboxing the component
        this.onInitPeItBaseChild()
    }


    // gets called by base class onInit
    initStore() {

        this.localStore = this.ngRedux.configureSubStore(this.basePath, peItReducer);
        this.localStore.select<PeItDetail>('').takeUntil(this.destroy$).subscribe(d => {
            this.peItState = d
        })
    }


    /***************************
     *  Hooks for child class
    ****************************/
    abstract onInitPeItBaseChild(): void;

}
