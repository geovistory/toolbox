import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information } from '../../information.models';


// replace ProjectEntities with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = Information;
export type ProjectEntitiesAction = FluxStandardAction<Payload, any>;

@Injectable()
export class ProjectEntitiesActions {


}
