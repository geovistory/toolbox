import { NgRedux, ObservableStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { mockPerson } from '../../data-unit/pe-it/pe-it-create-form/sandbox.mock';
import { InformationActions } from '../../information.actions';
import { Information } from '../../information.models';
import { informationReducer } from '../../information.reducer';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';


@AutoUnsubscribe({
    includeArrays: true
})
@Component({
    selector: 'gv-entity-add-create-new',
    templateUrl: './entity-add-create-new.component.html',
    styleUrls: ['./entity-add-create-new.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityAddCreateNewComponent implements OnInit {

    f: any = {};

    readonly basePath = ['information']
    getBasePath = () => this.basePath
    localStore: ObservableStore<Information>;

    loading: boolean = false;
    errorMessages: any;


    subs: Subscription[] = [];

    constructor(
        private modalService: EntityAddModalService,
        private ngRedux: NgRedux<Information>,
        private actions: InformationActions,
        private ref: ChangeDetectorRef
    ) {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);

    }


    ngOnInit() {

        this.modalService.previousState = EntityAddModalState[1];

        this.modalService.modalTitle = "Create a new " + this.modalService.selectedClass.dfh_standard_label

        this.modalService.addButtonVisible = false;

        // TODO: write a simple stateCreator function that returns something similar to the mockPerson, with the respective sub-property for the appellation 
        // Init the state
        // this.subs.push(this.stateCreator.initializePeItToCreate(this.modalService.selectedClass.dfh_pk_class, this.modalService.searchString).subscribe(peItState => {

        // }))

        this.localStore.dispatch(this.actions.peItCreateFormAdded(mockPerson));



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
