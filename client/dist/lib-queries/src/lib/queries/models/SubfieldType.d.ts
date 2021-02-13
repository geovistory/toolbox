import { SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
export interface SubfieldType extends SysConfigValueObjectType {
    temporalEntity?: 'true';
    entityPreview?: 'true';
    typeItem?: 'true';
    timeSpan?: 'true';
    textProperty?: 'true';
}
