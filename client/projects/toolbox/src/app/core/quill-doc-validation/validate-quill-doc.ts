
import Ajv, { ErrorObject } from 'ajv';
import { quillDocSchema } from './quill-doc.schema';
import { QuillDoc } from 'projects/toolbox/src/app/modules/quill';

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
