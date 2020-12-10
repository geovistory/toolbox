/* eslint-disable @typescript-eslint/camelcase */
import { createDatNamespace } from '../atomic/dat-namespace.helper';
import { getIndex } from '../meta/index.helper';

export async function createDefaultNamespace(projectID: number): Promise<number> {
    return (await createDatNamespace({
        pk_entity: getIndex(),
        fk_project: projectID,
        standard_label: 'Default Namespace'
    })).pk_entity as number;
}