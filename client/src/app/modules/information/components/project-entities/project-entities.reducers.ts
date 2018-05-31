import { Action } from 'redux';

import { omit } from 'ramda';
import { IInformationState } from '../../api/information.model';
import { ProjectEntitiesAction, ProjectEntitiesActions } from './project-entities.actions';

const INITIAL_STATE: IInformationState = {
};


export const projectEntitiesReducer =
    (lastState: IInformationState = INITIAL_STATE, action: ProjectEntitiesAction): IInformationState => {


        return lastState;
    };

