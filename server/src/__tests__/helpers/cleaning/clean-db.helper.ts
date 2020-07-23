import {testdb} from '../../../datasources/testdb.datasource';
import {DatColumnRepository, DatDigitalRepository, DatNamespaceRepository, DatTextPropertyRepository, ProAnalysisRepository, ProClassFieldConfigRepository, ProDfhClassProjRelRepository, ProDfhProfileProjRelRepository, ProProjectRepository, ProTextPropertyRepository, PubAccountProjectRelRepository, PubAccountRepository, SysAnalysisTypeRepository, SysAppContextRepository, SysClassFieldPropertyRelRepository, SysClassFieldRepository, SysSystemRelevantClassRepository, SysSystemTypeRepository, WarEntityPreviewRepository} from '../../../repositories';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {PubRoleMappingRepository} from '../../../repositories/pub-role-mapping.repository';
import {PubRoleRepository} from '../../../repositories/pub-role.repository';
import {resetLanguageInitialization} from '../atomic/inf-language.helper';
import {resetTypeInitialization} from '../atomic/sys-system-type.helper';

export async function cleanDb() {
    //because we update it to create an information.language
    await testdb.execute("SELECT setval('information.entity_pk_entity_seq', 1, true);");

    //delete all versionning table
    const tables = await testdb.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE '%_vt'`);
    tables.forEach(async (t: {name: string}) => {await testdb.execute('DELETE FROM ' + t.name)});

    //delete all cell partitionned table
    const cellTables = await testdb.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE 'cell_%'`);
    cellTables.forEach(async (t: {name: string}) => {await testdb.execute('DELETE FROM ' + t.name)});

    const datColumnRepository = new DatColumnRepository(testdb, async () => datNamespaceRepository);
    const datDigitalRepository = new DatDigitalRepository(testdb);
    const datNamespaceRepository = new DatNamespaceRepository(testdb);
    const datTextPropertyRepository = new DatTextPropertyRepository(testdb);
    const proAnalysisRepository = new ProAnalysisRepository(testdb);
    const proClassFieldConfigRepository = new ProClassFieldConfigRepository(testdb);
    const proDfhClassProjRelRepository = new ProDfhClassProjRelRepository(testdb);
    const proDfhProfileProjRelRepository = new ProDfhProfileProjRelRepository(testdb);
    const proProjectRepository = new ProProjectRepository(testdb);
    const proTextPropertyRepository = new ProTextPropertyRepository(testdb);
    const pubAccountProjectRelRepository = new PubAccountProjectRelRepository(testdb);
    const pubAccountRepository = new PubAccountRepository(testdb, async () => pubCredentialRepository);
    const pubCredentialRepository = new PubCredentialRepository(testdb);
    const pubRoleMappingRepository = new PubRoleMappingRepository(testdb, async () => pubRoleRepository);
    const pubRoleRepository = new PubRoleRepository(testdb);
    const sysAnalysisTypeRepository = new SysAnalysisTypeRepository(testdb);
    const sysAppContextRepository = new SysAppContextRepository(testdb);
    const sysClassFieldPropertyRelRepository = new SysClassFieldPropertyRelRepository(testdb);
    const sysClassFieldRepository = new SysClassFieldRepository(testdb);
    const sysSystemRelevantClassRepository = new SysSystemRelevantClassRepository(testdb);
    const sysSystemTypeRepository = new SysSystemTypeRepository(testdb);
    const warEntityPreviewRepository = new WarEntityPreviewRepository(testdb);

    await testdb.execute('DELETE FROM tables.row');
    await testdb.execute('DELETE FROM tables.quill_doc_cell');
    await testdb.execute('DELETE FROM data.chunk');
    await testdb.execute('DELETE FROM data_for_history.api_class');
    await testdb.execute('DELETE FROM data_for_history.api_property');
    await testdb.execute('DELETE FROM data_for_history.api_profile');
    await testdb.execute('DELETE FROM data_for_history.property_of_property');
    await testdb.execute('DELETE FROM information.appellation');
    await testdb.execute('DELETE FROM information.lang_string');
    await testdb.execute('DELETE FROM information.persistent_item');
    await testdb.execute('DELETE FROM information.place');
    await testdb.execute('DELETE FROM information.statement');
    await testdb.execute('DELETE FROM information.temporal_entity');
    await testdb.execute('DELETE FROM information.text_property');
    await testdb.execute('DELETE FROM information.time_primitive');
    await testdb.execute('DELETE FROM projects.info_proj_rel');
    await testdb.execute('DELETE FROM public.accesstoken'); //constraint on pubAccount

    await pubAccountProjectRelRepository.deleteAll(); //update or delete on table "project" violates foreign key constraint "account_project_rel_fk_project_fkey" on table "account_project_rel"
    await datColumnRepository.deleteAll();
    await datDigitalRepository.deleteAll();
    await datNamespaceRepository.deleteAll();
    await datTextPropertyRepository.deleteAll();
    await proAnalysisRepository.deleteAll();
    await proClassFieldConfigRepository.deleteAll();
    await proDfhClassProjRelRepository.deleteAll();
    await proDfhProfileProjRelRepository.deleteAll();
    await proProjectRepository.deleteAll();
    await proTextPropertyRepository.deleteAll();
    await pubCredentialRepository.deleteAll();
    await pubAccountRepository.deleteAll();
    await pubRoleMappingRepository.deleteAll();
    await pubRoleRepository.deleteAll();
    await sysAnalysisTypeRepository.deleteAll();
    await sysAppContextRepository.deleteAll();
    await sysClassFieldPropertyRelRepository.deleteAll();
    await sysClassFieldRepository.deleteAll();
    await sysSystemRelevantClassRepository.deleteAll();
    await sysSystemTypeRepository.deleteAll();
    await warEntityPreviewRepository.deleteAll();

    await testdb.execute('DELETE FROM information.language'); //update or delete on table "language" violates foreign key constraint "project_fk_language_fkey" on table "project"
    resetLanguageInitialization();
    resetTypeInitialization();
}
