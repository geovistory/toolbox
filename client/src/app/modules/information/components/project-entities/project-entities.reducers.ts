import { ProjectEntitiesAction } from './project-entities.actions';
import { Information } from '../../containers/information/api/information.models';

const INITIAL_STATE: Information = new Information();


export const projectEntitiesReducer =
    (lastState: Information = INITIAL_STATE, action: ProjectEntitiesAction): Information => {


        return lastState;
    };

