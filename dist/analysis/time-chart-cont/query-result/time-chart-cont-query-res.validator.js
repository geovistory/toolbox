"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Ajv = require("ajv");
const ajv = new Ajv();
const time_chart_cont_query_res_schema_json_1 = tslib_1.__importDefault(require("./time-chart-cont-query-res.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(time_chart_cont_query_res_schema_json_1.default);
function isValidTimeChartContQueryRes(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else {
        return { error: validate.errors };
    }
}
exports.isValidTimeChartContQueryRes = isValidTimeChartContQueryRes;
//# sourceMappingURL=time-chart-cont-query-res.validator.js.map