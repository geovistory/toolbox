declare const _exports: {
    "type": string;
    "items": {
        "type": string;
        "properties": {
            "full_count": {
                "type": string;
                "title": string;
            };
            "temporal_distribution": {
                "type": string;
                "items": {
                    "$ref": string;
                };
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
                "full_count": {
                    "type": string;
                    "title": string;
                };
                "temporal_distribution": {
                    "type": string;
                    "items": {
                        "$ref": string;
                    };
                    "title": string;
                };
            };
            "required": string[];
        }[];
    };
    "definitions": {
        "ChartLinePoint": {
            "title": string;
            "type": string;
            "properties": {
                "x": {
                    "type": string;
                    "title": string;
                };
                "y": {
                    "type": string;
                    "title": string;
                };
                "data": {
                    "title": string;
                };
            };
            "required": string[];
        };
    };
    "$schema": string;
};
export = _exports;
