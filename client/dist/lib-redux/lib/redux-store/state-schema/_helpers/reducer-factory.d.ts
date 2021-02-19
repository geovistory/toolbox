import { FluxStandardAction } from 'flux-standard-action';
import { Reducer } from 'redux';
export declare const PR_ENTITY_MODEL_MAP = "pkEntityModelMap";
export interface EntityModelAndClass<ModelName> {
    modelName: ModelName;
    fkClass: number;
}
export interface ReducerConfigCollection {
    [key: string]: ReducerConfig;
}
export interface ReducerConfig {
    facetteByPk?: string;
    indexBy?: {
        keyInStore: string;
        indexByFn: (item: any) => string;
    };
    groupBy?: {
        keyInStore: string;
        groupByFn: (item: any) => string;
    }[];
    equals?: (itemA: any, itemB: any) => boolean;
}
export interface Meta<Model> {
    items: Model[];
    pk?: number;
}
export declare const by: (name: string) => string;
export declare const paginateBy = "by_subfield_page";
export declare function getFromTo(limit: number, offset: number): string;
export declare function getEnd(limit: number, offset: number): number;
export declare function getStart(limit: number, offset: number): number;
/**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 */
export declare class ReducerFactory<Payload, Model> {
    actionPrefix: string;
    configs: ReducerConfigCollection;
    constructor(actionPrefix: string, configs: ReducerConfigCollection);
    createReducers(): Reducer<unknown, import("redux").AnyAction>;
    private createModelReducers;
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     */
    private createEntityModelMapReducers;
    updatingBy: (name: string) => string;
    deletingBy: (name: string) => string;
    removingBy: (name: string) => string;
    private facette;
    private deFacette;
    private enFacette;
    private isFacetteByPk;
    deleteItemsFromState(config: ReducerConfig, action: FluxStandardAction<Payload, {
        items: Model[];
    }>, state: any): any;
    mergeItemsInState(config: ReducerConfig, state: any, action: FluxStandardAction<Payload, {
        items: Model[];
    }>): any;
    /**
     * Creates object where the key returned by the configured indexByFn
     */
    private indexKeyObject;
    groupBy(items: any[], groupByFn: (item: any) => string, indexByFn: (item: any) => string): {};
    private getGroupKeyOfItem;
}
