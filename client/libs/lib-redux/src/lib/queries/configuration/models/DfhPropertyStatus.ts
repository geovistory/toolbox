import { DfhProperty } from '@kleiolab/lib-sdk-lb4';


export interface DfhPropertyStatus extends DfhProperty {
    // true, if removed from all profiles of the current project
    removedFromAllProfiles: boolean;
}
