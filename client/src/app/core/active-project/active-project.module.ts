import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveProjectActions } from './active-project.action';
import { ActiveProjectEpics } from './active-project.epics';
import { ActiveProjectService } from './active-project.service';
import { SocketsModule } from '../sockets/sockets.module';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { EprService } from 'app/modules/information/shared/epr.service';


@NgModule({
    imports: [
        CommonModule,
        SocketsModule
    ],
    providers: [ActiveProjectActions, ActiveProjectEpics, ActiveProjectService, PeItService, EprService]
})
export class ActiveProjectModule { }
