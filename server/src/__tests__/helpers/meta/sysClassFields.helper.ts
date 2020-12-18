import {SysClassFieldMock} from '../data/gvDB/SysClassFieldMock';
import {createSysClassField} from '../atomic/sys-class-field.helper';

const types = [
    SysClassFieldMock.SHORT_TITLE,
    SysClassFieldMock.EXACT_REFERENCE,
    SysClassFieldMock.ENTITY_DEFINITION,
    SysClassFieldMock.COMMENT,
]


export async function createSysClassFields() {
    for (const type of types) {
        await createSysClassField(type)
    }
}
