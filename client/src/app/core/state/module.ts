import { NgModule } from '@angular/core';
import { PeItDetailService } from './services/custom/pe-it-detail';
import { DataUnitService } from './services/custom/data-unit';
import { RoleSetService } from './services/custom/role-set';
import { RoleDetailService } from './services/custom/role-detail';
import { AppeDetailService } from './services/custom/appe-detail';
import { LangDetailService } from './services/custom/lang-detail';
import { PlaceDetailService } from './services/custom/place-detail';
import { TimePrimitveDetailService } from './services/custom/time-primitive-detail';
import { TeEntDetailService } from './services/custom/te-ent-detail';
import { ExistenceTimeDetailService } from './services/custom/existence-time-detail';

@NgModule({
    providers: [
        PeItDetailService,
        DataUnitService,
        RoleSetService,
        RoleDetailService,
        AppeDetailService,
        LangDetailService,
        PlaceDetailService,
        TimePrimitveDetailService,
        TeEntDetailService,
        ExistenceTimeDetailService
    ]
})
export class StateModule { }
