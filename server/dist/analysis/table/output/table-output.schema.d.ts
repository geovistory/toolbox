export declare const $ref: string;
export declare namespace definitions {
    export const TableOutput: {
        "title": string;
        "type": string;
        "properties": {
            "rows": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
            };
            "full_count": {
                "type": string;
                "title": string;
            };
        };
        "required": string[];
    };
    export const TableRow: {
        "title": string;
        "type": string;
        "additionalProperties": {};
    };
}
export declare const $schema: string;
