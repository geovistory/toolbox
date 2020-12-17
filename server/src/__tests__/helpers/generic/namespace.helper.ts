/* eslint-disable @typescript-eslint/camelcase */
import * as namespaces from '../atomic/dat-namespace.helper';

export async function createNamespace(project: number): Promise<number> {
    return (await namespaces.createDatNamespace({ pk_entity: project })).pk_entity as number;
}