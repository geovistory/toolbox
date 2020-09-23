import { linkAccountProject } from '../atomic/pub-account_project_rel.helper';
import { cleanDb } from '../cleaning/clean-db.helper';
import { createAccountVerified } from "../graphs/account.helper";
import { createProjectAndNamespace } from '../graphs/project.helpers';
import { createDigital } from '../atomic/dat-digital.helper';
import { createColumn } from '../atomic/dat-column.helper';
import { createTextProperty } from '../atomic/dat-text-property.helper';
import { getLanguage } from '../atomic/inf-language.helper';
import { createRow } from '../atomic/tab-row.helper';
import { testdb } from '../testdb';

export async function forFeatureX() {
    await cleanDb();
    const result = await createProjectAndNamespace('English');
    const project = result.project;
    const namespace = result.namespace;
    const accountInProject = await createAccountVerified('gaetan.muck@gmail.com', 'gaetanmuck', 'test1234');
    await linkAccountProject(accountInProject, project);

    const digital = await createDigital('digitalTable', namespace, 'a table');
    const col1 = await createColumn(digital, "string");
    await createTextProperty(namespace, col1, 'Name', await getLanguage('English'))
    const col2 = await createColumn(digital, "string");
    await createTextProperty(namespace, col2, 'Birthdate', await getLanguage('English'));
    const row1 = await createRow(digital);
    const row2 = await createRow(digital);
    await testdb.execute("SELECT tables.create_cell_table_for_digital(" + digital.pk_entity + ");");

    



}
