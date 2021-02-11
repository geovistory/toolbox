export interface Models {
    [name: string]: any;
}
export declare class SDKModels {
    private models;
    get(modelName: string): any;
    getAll(): Models;
    getModelNames(): string[];
}
