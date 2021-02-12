import { FluxStandardAction } from 'flux-standard-action';
import { SourceList } from '../models';
declare type Payload = SourceList;
interface MetaData {
    pkAllowedClasses?: number[];
}
export declare type SourceListAPIAction = FluxStandardAction<Payload, MetaData>;
export declare class SourceListAPIActions {
    static readonly INITIALIZE_LIST = "SourceList::INITIALIZE_LIST";
    static readonly DESTROY = "SourceList::DESTROY";
    /*********************************************************************
    *  Actions to manage the list
    *********************************************************************/
    initializeList: (pkAllowedClasses: number[]) => FluxStandardAction<SourceList, MetaData>;
    /*********************************************************************
    *  Method to distroy the slice of store
    *********************************************************************/
    destroy: () => FluxStandardAction<SourceList, MetaData>;
}
export {};
