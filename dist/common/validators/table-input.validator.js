"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const ajv = new Ajv();
const table_input_schema_json_1 = __importDefault(require("../schemas/table-input.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(table_input_schema_json_1.default);
function isValidTableInput(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else if (validate.errors) {
        return { error: validate.errors };
    }
    return { error: undefined };
}
exports.isValidTableInput = isValidTableInput;
//# sourceMappingURL=table-input.validator.js.map