import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IInformationState, IPeItSearchHitState } from '../../api/information.model';

// replace ProjectEntities with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IInformationState;
export type ProjectEntitiesAction = FluxStandardAction<Payload, any>;

@Injectable()
export class ProjectEntitiesActions {





}
