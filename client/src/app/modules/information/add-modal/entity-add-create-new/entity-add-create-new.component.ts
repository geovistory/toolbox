import { NgRedux, ObservableStore, WithSubStore, select } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription, Observable } from 'rxjs';

import { mockPerson } from '../../data-unit/pe-it/pe-it-create-form/sandbox.mock';
import { PeItDetail } from 'app/core/state/models';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';
import { informationReducer } from '../../containers/information/api/information.reducer';
import { Information } from '../../containers/information/api/information.models';
import { InformationAPIActions } from '../../containers/information/api/information.actions';

@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: informationReducer
})
@AutoUnsubscribe({
    includeArrays: true
})
@Component({
    selector: 'gv-entity-add-create-new',
    templateUrl: './entity-add-create-new.component.html',
    styleUrls: ['./entity-add-create-new.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityAddCreateNewComponent implements OnInit, OnDestroy {

    f: any = {};

    readonly basePath = ['information']
    localStore: ObservableStore<Information>;

    loading = false;
    errorMessages: any;

    initialized = false;

    @select() _peIt_create_form$: Observable<PeItDetail>

    subs: Subscription[] = [];

    constructor(
        private modalService: EntityAddModalService,
        private ngRedux: NgRedux<Information>,
        private actions: InformationAPIActions,
        private ref: ChangeDetectorRef
    ) {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);

    }

    getBasePath = () => this.basePath

    ngOnInit() {

        this.modalService.previousState = EntityAddModalState[1];

        this.modalService.modalTitle = 'Create a new ' + this.modalService.selectedClass.label

        this.modalService.addButtonVisible = false;

        // // TODO: write a simple stateCreator function that returns something similar to the mockPerson, with the respective sub-property for the appellation
        // // Init the state
        // this.subs.push(this.stateCreator.initializePeItToCreate(this.modalService.selectedClass.dfh_pk_class, this.modalService.searchString).subscribe(peItState => {

        //     this.localStore.dispatch(this.actions.peItCreateFormAdded(peItState));
        //     this.initialized = true;
        // }))

    }

    ngOnDestroy() {
        this.ref.detach()
        this.subs.forEach(sub => { sub.unsubscribe() })

        this.localStore.dispatch(this.actions.peItCreateFormDestroyed())
    }

    formChange(form: NgForm) {
        this.modalService.createButtonVisible = form.valid;
        this.modalService.peItToCreate = form.value.peIt;
    }

    setEntityModalState(newState: string) {
        this.modalService.state = newState;
    }

}
