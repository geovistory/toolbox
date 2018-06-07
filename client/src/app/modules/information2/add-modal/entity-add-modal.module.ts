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
import { EntitySearchHitComponent } from '../components/entity-search-hit/entity-search-hit.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        PeItAddFormModule,
        FormsModule,
        ReactiveFormsModule,
        NgReduxFormModule,
        SlimLoadingBarModule,
        NgbPaginationModule
    ],
    declarations: [
        EntityAddAddExistingComponent,
        EntityAddChooseClassComponent,
        EntityAddCreateNewComponent,
        EntityAddModalComponent,
        EntityAddSearchExistingComponent,
        EntitySearchHitComponent        
    ],
    providers: [
        EntityAddModalService
    ],
    exports: [
    ],
    entryComponents: [
        EntityAddModalComponent
    ]
})
export class EntityAddModalModule { }
