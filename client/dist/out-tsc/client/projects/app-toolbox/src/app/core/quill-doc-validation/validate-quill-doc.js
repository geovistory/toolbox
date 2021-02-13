import Ajv from 'ajv';
import { quillDocSchema } from './quill-doc.schema';
const ajv = new Ajv();
const validate = ajv.compile(quillDocSchema);
export function isValidQuillDoc(candidate) {
    if (validate(candidate) === true) {
        return { obj: candidate };
    }
    else if (validate.errors) {
        return { err: validate.errors };
    }
    return {};
}
//# sourceMappingURL=validate-quill-doc.js.map