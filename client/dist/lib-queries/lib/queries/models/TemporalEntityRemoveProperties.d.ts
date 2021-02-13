import { InfTemporalEntity } from '@kleiolab/lib-sdk-lb4';
import { InfTextProperty } from '@kleiolab/lib-sdk-lb4';
import { InfStatement } from '@kleiolab/lib-sdk-lb4';
/**
 * This interface is used for creating objects containing all the
 * information related to a temporal entity that should be removed
 * from project, when the temporal entity is removed
 */
export interface TemporalEntityRemoveProperties {
    temporalEntity: InfTemporalEntity;
    statements: InfStatement[];
    textProperties: InfTextProperty[];
}
