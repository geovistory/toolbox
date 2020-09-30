import { testdb } from "../testdb";
import { DatColumnRepository, DatDigitalRepository, DatNamespaceRepository, DatTextPropertyRepository, ProAnalysisRepository, ProClassFieldConfigRepository, ProDfhClassProjRelRepository, ProDfhProfileProjRelRepository, ProProjectRepository, ProTextPropertyRepository, PubAccountProjectRelRepository, PubAccountRepository, SysAnalysisTypeRepository, SysAppContextRepository, SysClassFieldPropertyRelRepository, SysClassFieldRepository, SysSystemRelevantClassRepository, SysSystemTypeRepository, WarEntityPreviewRepository, WarClassPreviewRepository, ProEntityLabelConfigRepository } from '../../../repositories';
import { PubCredentialRepository } from '../../../repositories/pub-credential.repository';
import { PubRoleMappingRepository } from '../../../repositories/pub-role-mapping.repository';
import { PubRoleRepository } from '../../../repositories/pub-role.repository';
import { resetLanguageInitialization } from '../atomic/inf-language.helper';
import { resetTypeInitialization } from '../atomic/sys-system-type.helper';

export async function cleanDb() {
    //because we update it to create an information.language
    await testdb.execute("SELECT setval('information.entity_pk_entity_seq', 1, true);");

    //delete all versionning table
    const tables = await testdb.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE '%_vt'`);
    tables.forEach(async (t: { name: string }) => { await testdb.execute('DELETE FROM ' + t.name) });

    //delete all cell partitionned table
    const cellTables = await testdb.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE 'cell_%'`);
    cellTables.forEach(async (t: { name: string }) => { if (t.name !== 'tables.cell_vt') await testdb.execute('DELETE FROM ' + t.name) });

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
    const proEntityLabelConfigRepository = new ProEntityLabelConfigRepository(testdb);
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
    const warClassPreviewRepository = new WarClassPreviewRepository(testdb);

    await testdb.execute('ALTER TABLE tables.row DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM tables.row');
    await testdb.execute('ALTER TABLE tables.row ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE tables.quill_doc_cell DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM tables.quill_doc_cell');
    await testdb.execute('ALTER TABLE tables.quill_doc_cell ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data.chunk DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM data.chunk');
    await testdb.execute('ALTER TABLE data.chunk ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data_for_history.api_class DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM data_for_history.api_class');
    await testdb.execute('ALTER TABLE data_for_history.api_class ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data_for_history.api_property DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM data_for_history.api_property');
    await testdb.execute('ALTER TABLE data_for_history.api_property ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data_for_history.api_profile DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM data_for_history.api_profile');
    await testdb.execute('ALTER TABLE data_for_history.api_profile ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data_for_history.property_of_property DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM data_for_history.property_of_property');
    await testdb.execute('ALTER TABLE data_for_history.property_of_property ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.appellation DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.appellation');
    await testdb.execute('ALTER TABLE information.appellation ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.lang_string DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.lang_string');
    await testdb.execute('ALTER TABLE information.lang_string ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.persistent_item DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.persistent_item');
    await testdb.execute('ALTER TABLE information.persistent_item ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.place DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.place');
    await testdb.execute('ALTER TABLE information.place ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.statement DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.statement');
    await testdb.execute('ALTER TABLE information.statement ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.temporal_entity DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.temporal_entity');
    await testdb.execute('ALTER TABLE information.temporal_entity ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.text_property DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.text_property');
    await testdb.execute('ALTER TABLE information.text_property ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE information.time_primitive DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.time_primitive');
    await testdb.execute('ALTER TABLE information.time_primitive ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.info_proj_rel DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM projects.info_proj_rel');
    await testdb.execute('ALTER TABLE projects.info_proj_rel ENABLE TRIGGER versioning_trigger');

    await testdb.execute('DELETE FROM public.accesstoken'); //constraint on pubAccount

    await testdb.execute('ALTER TABLE public.account_project_rel DISABLE TRIGGER versioning_trigger');
    await pubAccountProjectRelRepository.deleteAll(); //update or delete on table "project" violates foreign key constraint "account_project_rel_fk_project_fkey" on table "account_project_rel"
    await testdb.execute('ALTER TABLE public.account_project_rel ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data.class_column_mapping DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM data.class_column_mapping');
    await testdb.execute('ALTER TABLE data.class_column_mapping ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data.column DISABLE TRIGGER versioning_trigger');
    await datColumnRepository.deleteAll();
    await testdb.execute('ALTER TABLE data.column ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data.digital DISABLE TRIGGER versioning_trigger');
    await datDigitalRepository.deleteAll();
    await testdb.execute('ALTER TABLE data.digital ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data.namespace DISABLE TRIGGER versioning_trigger');
    await datNamespaceRepository.deleteAll();
    await testdb.execute('ALTER TABLE data.namespace ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE data.text_property DISABLE TRIGGER versioning_trigger');
    await datTextPropertyRepository.deleteAll();
    await testdb.execute('ALTER TABLE data.text_property ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.analysis DISABLE TRIGGER versioning_trigger');
    await proAnalysisRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.analysis ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.class_field_config DISABLE TRIGGER versioning_trigger');
    await proClassFieldConfigRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.class_field_config ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.dfh_class_proj_rel DISABLE TRIGGER versioning_trigger');
    await proDfhClassProjRelRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.dfh_class_proj_rel ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.dfh_profile_proj_rel DISABLE TRIGGER versioning_trigger');
    await proDfhProfileProjRelRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.dfh_profile_proj_rel ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.project DISABLE TRIGGER versioning_trigger');
    await proProjectRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.project ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.text_property DISABLE TRIGGER versioning_trigger');
    await proTextPropertyRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.text_property ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE projects.entity_label_config DISABLE TRIGGER versioning_trigger');
    await proEntityLabelConfigRepository.deleteAll();
    await testdb.execute('ALTER TABLE projects.entity_label_config ENABLE TRIGGER versioning_trigger');

    await pubCredentialRepository.deleteAll();

    await pubAccountRepository.deleteAll();

    await pubRoleMappingRepository.deleteAll();

    await pubRoleRepository.deleteAll();

    await testdb.execute('ALTER TABLE system.analysis_type DISABLE TRIGGER versioning_trigger');
    await sysAnalysisTypeRepository.deleteAll();
    await testdb.execute('ALTER TABLE system.analysis_type ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE system.app_context DISABLE TRIGGER versioning_trigger');
    await sysAppContextRepository.deleteAll();
    await testdb.execute('ALTER TABLE system.app_context ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE system.class_field_property_rel DISABLE TRIGGER versioning_trigger');
    await sysClassFieldPropertyRelRepository.deleteAll();
    await testdb.execute('ALTER TABLE system.class_field_property_rel ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE system.class_field DISABLE TRIGGER versioning_trigger');
    await sysClassFieldRepository.deleteAll();
    await testdb.execute('ALTER TABLE system.class_field ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE system.system_relevant_class DISABLE TRIGGER versioning_trigger');
    await sysSystemRelevantClassRepository.deleteAll();
    await testdb.execute('ALTER TABLE system.system_relevant_class ENABLE TRIGGER versioning_trigger');

    await testdb.execute('ALTER TABLE system.system_type DISABLE TRIGGER versioning_trigger');
    await sysSystemTypeRepository.deleteAll();
    await testdb.execute('ALTER TABLE system.system_type ENABLE TRIGGER versioning_trigger');

    await warEntityPreviewRepository.deleteAll();
    await warClassPreviewRepository.deleteAll();

    await testdb.execute('ALTER TABLE information.language DISABLE TRIGGER versioning_trigger');
    await testdb.execute('DELETE FROM information.language'); //update or delete on table "language" violates foreign key constraint "project_fk_language_fkey" on table "project"
    await testdb.execute('ALTER TABLE information.language ENABLE TRIGGER versioning_trigger');

    resetLanguageInitialization();
    resetTypeInitialization();
}
