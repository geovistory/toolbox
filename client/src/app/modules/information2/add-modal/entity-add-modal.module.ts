import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PeItAddFormModule } from '../data-unit/pe-it/pe-it-add-form/pe-it-add-form.module';
import { EntityAddModalService } from '../shared/entity-add-modal.service';
import { EntityAddAddExistingComponent } from './entity-add-add-existing/entity-add-add-existing.component';
import { EntityAddChooseClassComponent } from './entity-add-choose-class/entity-add-choose-class.component';
import { EntityAddCreateNewComponent } from './entity-add-create-new/entity-add-create-new.component';
import { EntityAddModalComponent } from './entity-add-modal/entity-add-modal.component';
import { EntityAddSearchExistingComponent } from './entity-add-search-existing/entity-add-search-existing.component';
import { NgReduxFormModule } from '@angular-redux/form';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EntitySearchHitModule } from '../components/entity-search-hit/entity-search-hit.module';
import { EntityCreateNewActions } from './entity-add-create-new/entity-add-create-new.actions';
import { EntityAddExistingActions } from './entity-add-add-existing/entity-add-add-existing.actions';
import { StateCreatorService } from '../shared/state-creator.service';

@NgModule({
    imports: [
        CommonModule,
        PeItAddFormModule,
        FormsModule,
        ReactiveFormsModule,
        NgReduxFormModule,
        SlimLoadingBarModule,
        NgbPaginationModule,
        EntitySearchHitModule
    ],
    declarations: [
        EntityAddAddExistingComponent,
        EntityAddChooseClassComponent,
        EntityAddCreateNewComponent,
        EntityAddModalComponent,
        EntityAddSearchExistingComponent,
    ],
    providers: [
        EntityAddModalService,
        EntityCreateNewActions,
        EntityAddExistingActions,
        StateCreatorService
    ],
    exports: [
    ],
    entryComponents: [
        EntityAddModalComponent
    ]
})
export class EntityAddModalModule { }
