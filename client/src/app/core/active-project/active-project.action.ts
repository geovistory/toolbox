import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Project } from 'app/core';

interface MetaData { };
type Payload = Project;
export type ActiveProjectAction = FluxStandardAction<Payload, MetaData>;


@Injectable()
export class ActiveProjectActions {

    static ACTIVE_PROJECT_UPDATED = 'ACTIVE_PROJECT_UPDATED';

    activeProjectUpdated(payload:Payload):ActiveProjectAction {
        return {
            type: ActiveProjectActions.ACTIVE_PROJECT_UPDATED,
            payload,
            meta:null,
        }
    } 

}