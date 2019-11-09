"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Ajv = require("ajv");
const ajv = new Ajv();
const query_filter_schema_json_1 = tslib_1.__importDefault(require("./query-filter.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(query_filter_schema_json_1.default);
function isValidQueryFilter(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else {
        return { error: validate.errors };
    }
}
exports.isValidQueryFilter = isValidQueryFilter;
//# sourceMappingURL=query-filter.validator.js.map