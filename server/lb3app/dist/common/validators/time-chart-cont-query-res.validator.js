"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const time_chart_cont_query_res_schema_json_1 = __importDefault(require("../schemas/time-chart-cont-query-res.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(time_chart_cont_query_res_schema_json_1.default);
function isValidTimeChartContQueryRes(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else if (validate.errors) {
        return { error: validate.errors };
    }
    return { error: undefined };
}
exports.isValidTimeChartContQueryRes = isValidTimeChartContQueryRes;
//# sourceMappingURL=time-chart-cont-query-res.validator.js.map