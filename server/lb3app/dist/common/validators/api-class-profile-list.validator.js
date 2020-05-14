"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const api_class_profile_list_schema_json_1 = __importDefault(require("../schemas/api-class-profile-list.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(api_class_profile_list_schema_json_1.default);
function isValidApiClassProfileList(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else if (validate.errors) {
        return { error: validate.errors };
    }
    return { error: undefined };
}
exports.isValidApiClassProfileList = isValidApiClassProfileList;
//# sourceMappingURL=api-class-profile-list.validator.js.map