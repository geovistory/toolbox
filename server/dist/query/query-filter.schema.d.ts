export declare const $ref: string;
export declare namespace definitions {
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
            };
        };
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
