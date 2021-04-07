import { createDatFactoidMapping, createDatFactoidPropertyMapping } from "../atomic/dat-factoid.helper";
import { getIndex } from "../meta/index.helper";

/* eslint-disable @typescript-eslint/camelcase */
export async function createFactoidMapping(digital: number, theclass: number): Promise<number> {
    const factoidMapping = getIndex();

    await createDatFactoidMapping({
        pk_entity: factoidMapping,
        fk_digital: digital,
        fk_class: theclass,
    });

    return factoidMapping;
}

export async function createFactoid(factoidMapping: number, column: number, property: number): Promise<number> {
    const factoid = getIndex();

    await createDatFactoidPropertyMapping({
        pk_entity: factoid,
        fk_factoid_mapping: factoidMapping,
        fk_column: column,
        fk_property: property
    })

    return factoid;
}