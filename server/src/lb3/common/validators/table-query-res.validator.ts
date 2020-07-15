
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { TableQueryRes } from '../interfaces/table-query-res.interface';
  import schema from '../schemas/table-query-res.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTableQueryRes(candidate: any): {
    validObj?: TableQueryRes,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   