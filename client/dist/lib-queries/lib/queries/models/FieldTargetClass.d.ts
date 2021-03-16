import { GvTargetType } from '@kleiolab/lib-sdk-lb4';
export interface FieldTargetClass {
    listType: GvTargetType;
    targetClass: number;
    targetClassLabel: string;
    removedFromAllProfiles: boolean;
}
