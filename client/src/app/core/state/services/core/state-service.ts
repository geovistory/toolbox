import { ProjectCrm } from 'app/core/active-project';
import { StateSettings } from './state-settings';

/**
 * Interface for all state services
 *
 */
export interface StateService<DbModelType, StateModelType> {


    /**
     * Creates a StateServiceInstance from provided input data
     *
     * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of from() methods.
     * @param dbData nested object as it is delivered from REST api with roles etc.
     * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
     * @param settings setting object that is passed through the chain of from() methods of the different state classes
     */
    createState(options: StateModelType, dbData: DbModelType, crm: ProjectCrm, settings: StateSettings): StateModelType;

}

