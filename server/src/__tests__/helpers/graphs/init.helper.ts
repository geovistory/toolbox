import {createLanguages} from '../atomic/inf-language.helper';
import {createTypes} from '../atomic/sys-system-type.helper';

export async function init() {
  await createLanguages();
  await createTypes();
}
