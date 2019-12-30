"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const profile_deactivation_report_schema_json_1 = __importDefault(require("../schemas/profile-deactivation-report.schema.json"));
// Compile the JSON schema into a validation function
const validate = ajv.compile(profile_deactivation_report_schema_json_1.default);
function isValidProfileDeactivationReport(candidate) {
    if (validate(candidate) === true) {
        return { validObj: candidate };
    }
    else if (validate.errors) {
        return { error: validate.errors };
    }
    return { error: undefined };
}
exports.isValidProfileDeactivationReport = isValidProfileDeactivationReport;
//# sourceMappingURL=profile-deactivation-report.validator.js.map