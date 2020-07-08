
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { ProfileDeactivationReport } from '../interfaces/profile-deactivation-report.interface';
  import schema from '../schemas/profile-deactivation-report.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidProfileDeactivationReport(candidate: any): {
    validObj?: ProfileDeactivationReport,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   