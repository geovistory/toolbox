
import Ajv, { ErrorObject } from 'ajv';
import { quillDocSchema } from './quill-doc.schema';
import { QuillDoc } from "@kleiolab/lib-sdk-lb4";

interface Validated<M> {
  obj?: M
  err?: ErrorObject[]
}

const ajv = new Ajv();
const validate = ajv.compile(quillDocSchema);

export function isValidQuillDoc(candidate: any): Validated<QuillDoc> {
  if (validate(candidate) === true) {
    return { obj: candidate }
  } else if (validate.errors) {
    return { err: validate.errors }
  }
  return {}
}
