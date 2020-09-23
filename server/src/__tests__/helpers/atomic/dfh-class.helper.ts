/* eslint-disable @typescript-eslint/camelcase */

import { testdb } from '../testdb';

export class DfhClass {
    pkClass: number;
    label: string;

    constructor(pkClass: number, label: string) {
        this.pkClass = pkClass;
        this.label = label;
    }
}

export async function createClass(pkClass: number, label: string) {
    return new DfhClass(
        (await testdb.execute('INSERT INTO data_for_history.api_class (dfh_pk_class, dfh_class_label) VALUES (' + pkClass + ', ' + label + ');')).pkClass,
        label
    )
}

