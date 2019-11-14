export declare const $ref: string;
export declare namespace definitions {
    export const TimeChartContOutput: {
        "title": string;
        "type": string;
        "properties": {
            "activeLine": {
                "type": string;
                "title": string;
            };
            "chartLines": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
            };
            "mouseX": {
                "type": string;
                "title": string;
            };
        };
        "required": string[];
    };
    export const ChartLine: {
        "title": string;
        "type": string;
        "properties": {
            "label": {
                "type": string;
                "title": string;
            };
            "linePoints": {
                "type": string;
                "items": {
                    "$ref": string;
                };
                "title": string;
            };
        };
        "required": string[];
    };
    export const ChartLinePoint: {
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
}
export declare const $schema: string;
