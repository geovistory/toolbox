export declare const $ref: string;
export declare namespace definitions {
    export const TableInput: {
        "description": string;
        "title": string;
        "type": string;
        "properties": {
            "queryDefinition": {
                "$ref": string;
                "title": string;
            };
        };
        "required": string[];
    };
    export const QueryDefinition: {
        "title": string;
        "type": string;
        "properties": {
            "filter": {
                "$ref": string;
                "title": string;
            };
            "columns": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
            };
            "limit": {
                "type": string;
                "title": string;
            };
            "offset": {
                "type": string;
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
    export const ColDef: {
        "title": string;
        "type": string;
        "properties": {
            "ofRootTable": {
                "type": string;
                "title": string;
            };
            "preventGroupBy": {
                "type": string;
                "title": string;
            };
            "defaultType": {
                "enum": string[];
                "type": string;
                "title": string;
            };
            "colName": {
                "type": string;
                "title": string;
            };
            "label": {
                "type": string;
                "title": string;
            };
            "id": {
                "type": string;
                "title": string;
            };
            "queryPath": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
            };
        };
    };
    export const QueryPathSegment: {
        "title": string;
        "type": string;
        "properties": {
            "type": {
                "$ref": string;
                "title": string;
            };
            "data": {
                "type": string;
                "properties": {
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
                "title": string;
            };
        };
        "required": string[];
    };
    export const QueryPathSegmentType: {
        "title": string;
        "enum": string[];
        "type": string;
    };
}
export declare const $schema: string;
