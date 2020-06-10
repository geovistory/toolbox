
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { ProfileActivationReport } from '../interfaces/profile-activation-report.interface';
  import schema from '../schemas/profile-activation-report.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidProfileActivationReport(candidate: any): {
    validObj?: ProfileActivationReport,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   