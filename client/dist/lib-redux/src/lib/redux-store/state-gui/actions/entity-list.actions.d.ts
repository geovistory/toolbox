import { FluxStandardAction } from 'flux-standard-action';
import { Information } from '../models/entity-list.models';
declare type Payload = Information;
export declare type InformationAPIAction = FluxStandardAction<Payload, {}>;
export declare class InformationAPIActions {
    static readonly DESTROY = "Information::DESTROY";
    /*********************************************************************
    *  Method to distroy the slice of store
    *********************************************************************/
    destroy: () => FluxStandardAction<Information, {}>;
}
export {};
