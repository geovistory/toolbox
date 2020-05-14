
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { TableOutput } from '../interfaces/table-output.interface';
  import schema from '../schemas/table-output.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTableOutput(candidate: any): {
    validObj?: TableOutput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   