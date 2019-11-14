export declare const $ref: string;
export declare namespace definitions {
    export const TimeChartContInput: {
        "description": string;
        "title": string;
        "type": string;
        "properties": {
            "lines": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
            };
        };
        "required": string[];
    };
    export const TimeChartContLine: {
        "title": string;
        "type": string;
        "properties": {
            "queryDefinition": {
                "$ref": string;
                "title": string;
            };
            "visualizationDefinition": {
                "type": string;
                "properties": {
                    "label": {
                        "type": string;
                        "title": string;
                    };
                };
                "required": string[];
                "title": string;
            };
        };
        "required": string[];
    };
    export const TimeChartContQueryDef: {
        "title": string;
        "type": string;
        "properties": {
            "filter": {
                "$ref": string;
                "title": string;
            };
            "columns": {
                "description": string;
                "type": string;
                "items": {
                    "type": string;
                    "properties": {
                        "ofRootTable": {
                            "type": string;
                            "enum": boolean[];
                            "title": string;
                        };
                        "preventGroupBy": {
                            "type": string;
                            "enum": boolean[];
                            "title": string;
                        };
                        "defaultType": {
                            "type": string;
                            "enum": string[];
                            "title": string;
                        };
                    };
                    "required": string[];
                }[];
                "minItems": number;
                "additionalItems": {
                    "anyOf": {
                        "type": string;
                        "properties": {
                            "ofRootTable": {
                                "type": string;
                                "enum": boolean[];
                                "title": string;
                            };
                            "preventGroupBy": {
                                "type": string;
                                "enum": boolean[];
                                "title": string;
                            };
                            "defaultType": {
                                "type": string;
                                "enum": string[];
                                "title": string;
                            };
                        };
                        "required": string[];
                    }[];
                };
                "title": string;
            };
        };
        "required": string[];
    };
    export const QueryFilter: {
        "title": string;
        "type": string;
        "properties": {
            "data": {
                "$ref": string;
                "title": string;
            };
            "children": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
                "default": never[];
            };
        };
        "required": string[];
    };
    export const QueryFilterData: {
        "title": string;
        "type": string;
        "properties": {
            "subgroup": {
                "enum": string[];
                "type": string;
                "title": string;
            };
            "operator": {
                "type": string;
                "title": string;
            };
            "classes": {
                "type": string;
                "items": {
                    "type": string;
                };
                "title": string;
            };
            "types": {
                "type": string;
                "items": {
                    "type": string;
                };
                "title": string;
            };
            "outgoingProperties": {
                "type": string;
                "items": {
                    "type": string;
                };
                "title": string;
            };
            "ingoingProperties": {
                "type": string;
                "items": {
                    "type": string;
                };
                "title": string;
            };
        };
    };
}
export declare const $schema: string;
