/* eslint-disable @typescript-eslint/camelcase */
import { DatColumn, DatNamespace, DatTextProperty, InfLanguage } from '../../../models';
import { testdb } from '../../helpers/testdb';


export async function createTextProperty(namespace: DatNamespace, column: DatColumn, label: string, language: InfLanguage) {
    return new DatTextProperty(testdb)
        .create({
            fk_namespace: namespace.pk_entity,
            fk_entity: column.pk_entity,
            string: label,
            fk_language: language.pk_entity
        });
}