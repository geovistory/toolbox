"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const map_and_time_cont_input_schema_json_1 = __importDefault(require("../schemas/map-and-time-cont-input.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(map_and_time_cont_input_schema_json_1.default);
function isValidMapAndTimeContInput(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else if (validate.errors) {
        return { error: validate.errors };
    }
    return { error: undefined };
}
exports.isValidMapAndTimeContInput = isValidMapAndTimeContInput;
//# sourceMappingURL=map-and-time-cont-input.validator.js.map