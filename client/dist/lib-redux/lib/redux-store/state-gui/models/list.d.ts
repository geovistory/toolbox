import { EntitySearchHit } from '@kleiolab/lib-sdk-lb4';
export declare class List {
    searchString?: string;
    pkAllowedClasses?: number[];
    collectionSize?: number;
    items?: EntitySearchHit[];
    loading?: boolean;
    error?: any;
    constructor(data?: List);
}
