"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const query_filter_schema_json_1 = __importDefault(require("../schemas/query-filter.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(query_filter_schema_json_1.default);
function isValidQueryFilter(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else if (validate.errors) {
        return { error: validate.errors };
    }
    return { error: undefined };
}
exports.isValidQueryFilter = isValidQueryFilter;
//# sourceMappingURL=query-filter.validator.js.map