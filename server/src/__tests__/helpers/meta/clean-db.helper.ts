import {DatColumnRepository, DatDigitalRepository, DatNamespaceRepository, DatTextPropertyRepository, ProAnalysisRepository, ProClassFieldConfigRepository, ProDfhClassProjRelRepository, ProDfhProfileProjRelRepository, ProEntityLabelConfigRepository, ProProjectRepository, ProTableConfigRepository, ProTextPropertyRepository, PubAccountProjectRelRepository, PubAccountRepository, SysAppContextRepository, SysClassFieldPropertyRelRepository, SysClassFieldRepository, SysSystemRelevantClassRepository, SysSystemTypeRepository, WarClassPreviewRepository, WarEntityPreviewRepository, WarStatementRepository} from '../../../repositories';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {PubRoleMappingRepository} from '../../../repositories/pub-role-mapping.repository';
import {PubRoleRepository} from '../../../repositories/pub-role.repository';
import {WarFieldChangeRepository} from '../../../repositories/war-field-change.repository';
import {TestDbFactory} from '../TestDbFactory';
import {deleteSysSystemConfig} from '../atomic/deleteSysSystemConfig';

export async function cleanDb() {
    //because we update it to create an information.language
    await TestDbFactory.datasource.execute("SELECT setval('information.entity_pk_entity_seq', 1, true);");

    //delete all versionning table
    const tables = await TestDbFactory.datasource.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE '%_vt'`);
    tables.forEach(async (t: {name: string}) => {await TestDbFactory.datasource.execute('DELETE FROM ' + t.name)});

    //delete all cell partitionned table
    const cellTables = await TestDbFactory.datasource.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE 'cell_%'`);
    cellTables.forEach(async (t: {name: string}) => {if (t.name !== 'tables.cell_vt') await TestDbFactory.datasource.execute('DELETE FROM ' + t.name)});

    //delete all row partitionned table
    const rowTables = await TestDbFactory.datasource.execute(`
    SELECT table_schema || '.' || table_name as name
    FROM information_schema."tables"
    WHERE table_type = 'BASE TABLE' AND table_name LIKE 'row_%'`);
    rowTables.forEach(async (t: {name: string}) => {if (t.name !== 'tables.row_vt') await TestDbFactory.datasource.execute('DELETE FROM ' + t.name)});

    const proTableConfig = new ProTableConfigRepository(TestDbFactory.datasource);
    const datColumnRepository = new DatColumnRepository(TestDbFactory.datasource, async () => datNamespaceRepository);
    const datDigitalRepository = new DatDigitalRepository(TestDbFactory.datasource);
    const datNamespaceRepository = new DatNamespaceRepository(TestDbFactory.datasource);
    const datTextPropertyRepository = new DatTextPropertyRepository(TestDbFactory.datasource);
    const proAnalysisRepository = new ProAnalysisRepository(TestDbFactory.datasource);
    const proClassFieldConfigRepository = new ProClassFieldConfigRepository(TestDbFactory.datasource);
    const proDfhClassProjRelRepository = new ProDfhClassProjRelRepository(TestDbFactory.datasource);
    const proDfhProfileProjRelRepository = new ProDfhProfileProjRelRepository(TestDbFactory.datasource);
    const proProjectRepository = new ProProjectRepository(TestDbFactory.datasource);
    const proTextPropertyRepository = new ProTextPropertyRepository(TestDbFactory.datasource);
    const proEntityLabelConfigRepository = new ProEntityLabelConfigRepository(TestDbFactory.datasource);
    const pubAccountProjectRelRepository = new PubAccountProjectRelRepository(TestDbFactory.datasource);
    const pubAccountRepository = new PubAccountRepository(TestDbFactory.datasource, async () => pubCredentialRepository);
    const pubCredentialRepository = new PubCredentialRepository(TestDbFactory.datasource);
    const pubRoleMappingRepository = new PubRoleMappingRepository(TestDbFactory.datasource, async () => pubRoleRepository);
    const pubRoleRepository = new PubRoleRepository(TestDbFactory.datasource);
    // const sysAnalysisTypeRepository = new SysAnalysisTypeRepository(TestDbFactory.datasource);
    const sysAppContextRepository = new SysAppContextRepository(TestDbFactory.datasource);
    const sysClassFieldPropertyRelRepository = new SysClassFieldPropertyRelRepository(TestDbFactory.datasource);
    const sysClassFieldRepository = new SysClassFieldRepository(TestDbFactory.datasource);
    const sysSystemRelevantClassRepository = new SysSystemRelevantClassRepository(TestDbFactory.datasource);
    const sysSystemTypeRepository = new SysSystemTypeRepository(TestDbFactory.datasource);
    const warEntityPreviewRepository = new WarEntityPreviewRepository(TestDbFactory.datasource);
    const warFieldChangeRepository = new WarFieldChangeRepository(TestDbFactory.datasource);
    const warClassPreviewRepository = new WarClassPreviewRepository(TestDbFactory.datasource);
    const warStatementRepository = new WarStatementRepository(TestDbFactory.datasource);


    await TestDbFactory.datasource.execute('ALTER TABLE information.appellation DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.appellation');
    await TestDbFactory.datasource.execute('ALTER TABLE information.appellation ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.place DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.place');
    await TestDbFactory.datasource.execute('ALTER TABLE information.place ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.dimension DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.dimension');
    await TestDbFactory.datasource.execute('ALTER TABLE information.dimension ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.lang_string DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.lang_string');
    await TestDbFactory.datasource.execute('ALTER TABLE information.lang_string ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.time_primitive DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.time_primitive');
    await TestDbFactory.datasource.execute('ALTER TABLE information.time_primitive ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.table_config DISABLE TRIGGER versioning_trigger');
    await proTableConfig.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.table_config ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.factoid_property_mapping DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data.factoid_property_mapping');
    await TestDbFactory.datasource.execute('ALTER TABLE data.factoid_property_mapping ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.factoid_mapping DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data.factoid_mapping');
    await TestDbFactory.datasource.execute('ALTER TABLE data.factoid_mapping ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE tables.quill_doc_cell DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM tables.quill_doc_cell');
    await TestDbFactory.datasource.execute('ALTER TABLE tables.quill_doc_cell ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.chunk DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data.chunk');
    await TestDbFactory.datasource.execute('ALTER TABLE data.chunk ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.api_class DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data_for_history.api_class');
    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.api_class ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.api_property DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data_for_history.api_property');
    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.api_property ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.api_profile DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data_for_history.api_profile');
    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.api_profile ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.property_of_property DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data_for_history.property_of_property');
    await TestDbFactory.datasource.execute('ALTER TABLE data_for_history.property_of_property ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.appellation DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.appellation');
    await TestDbFactory.datasource.execute('ALTER TABLE information.appellation ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.lang_string DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.lang_string');
    await TestDbFactory.datasource.execute('ALTER TABLE information.lang_string ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.dimension DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.dimension');
    await TestDbFactory.datasource.execute('ALTER TABLE information.dimension ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.resource DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.resource');
    await TestDbFactory.datasource.execute('ALTER TABLE information.resource ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.place DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.place');
    await TestDbFactory.datasource.execute('ALTER TABLE information.place ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.statement DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.statement');
    await TestDbFactory.datasource.execute('ALTER TABLE information.statement ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.text_property DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.text_property');
    await TestDbFactory.datasource.execute('ALTER TABLE information.text_property ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE information.time_primitive DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.time_primitive');
    await TestDbFactory.datasource.execute('ALTER TABLE information.time_primitive ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.info_proj_rel DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM projects.info_proj_rel');
    await TestDbFactory.datasource.execute('ALTER TABLE projects.info_proj_rel ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('DELETE FROM public.accesstoken'); //constraint on pubAccount

    await TestDbFactory.datasource.execute('ALTER TABLE public.account_project_rel DISABLE TRIGGER versioning_trigger');
    await pubAccountProjectRelRepository.deleteAll(); //update or delete on table "project" violates foreign key constraint "account_project_rel_fk_project_fkey" on table "account_project_rel"
    await TestDbFactory.datasource.execute('ALTER TABLE public.account_project_rel ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.class_column_mapping DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM data.class_column_mapping');
    await TestDbFactory.datasource.execute('ALTER TABLE data.class_column_mapping ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.column DISABLE TRIGGER versioning_trigger');
    await datColumnRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE data.column ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.digital DISABLE TRIGGER versioning_trigger');
    await datDigitalRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE data.digital ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.namespace DISABLE TRIGGER versioning_trigger');
    await datNamespaceRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE data.namespace ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE data.text_property DISABLE TRIGGER versioning_trigger');
    await datTextPropertyRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE data.text_property ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.analysis DISABLE TRIGGER versioning_trigger');
    await proAnalysisRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.analysis ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.class_field_config DISABLE TRIGGER versioning_trigger');
    await proClassFieldConfigRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.class_field_config ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.dfh_class_proj_rel DISABLE TRIGGER versioning_trigger');
    await proDfhClassProjRelRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.dfh_class_proj_rel ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.dfh_profile_proj_rel DISABLE TRIGGER versioning_trigger');
    await proDfhProfileProjRelRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.dfh_profile_proj_rel ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.project DISABLE TRIGGER versioning_trigger');
    await proProjectRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.project ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.text_property DISABLE TRIGGER versioning_trigger');
    await proTextPropertyRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.text_property ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE projects.entity_label_config DISABLE TRIGGER versioning_trigger');
    await proEntityLabelConfigRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE projects.entity_label_config ENABLE TRIGGER versioning_trigger');

    await pubCredentialRepository.deleteAll();

    await pubAccountRepository.deleteAll();

    await pubRoleMappingRepository.deleteAll();

    await pubRoleRepository.deleteAll();

    // await TestDbFactory.datasource.execute('ALTER TABLE system.analysis_type DISABLE TRIGGER versioning_trigger');
    // await sysAnalysisTypeRepository.deleteAll();
    // await TestDbFactory.datasource.execute('ALTER TABLE system.analysis_type ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE system.app_context DISABLE TRIGGER versioning_trigger');
    await sysAppContextRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE system.app_context ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE system.class_field_property_rel DISABLE TRIGGER versioning_trigger');
    await sysClassFieldPropertyRelRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE system.class_field_property_rel ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE system.class_field DISABLE TRIGGER versioning_trigger');
    await sysClassFieldRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE system.class_field ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE system.system_relevant_class DISABLE TRIGGER versioning_trigger');
    await sysSystemRelevantClassRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE system.system_relevant_class ENABLE TRIGGER versioning_trigger');

    await TestDbFactory.datasource.execute('ALTER TABLE system.system_type DISABLE TRIGGER versioning_trigger');
    await sysSystemTypeRepository.deleteAll();
    await TestDbFactory.datasource.execute('ALTER TABLE system.system_type ENABLE TRIGGER versioning_trigger');

    await warEntityPreviewRepository.deleteAll();
    await warFieldChangeRepository.deleteAll();
    await warClassPreviewRepository.deleteAll();
    await warStatementRepository.deleteAll();

    await TestDbFactory.datasource.execute('ALTER TABLE information.language DISABLE TRIGGER versioning_trigger');
    await TestDbFactory.datasource.execute('DELETE FROM information.language'); //update or delete on table "language" violates foreign key constraint "project_fk_language_fkey" on table "project"
    await TestDbFactory.datasource.execute('ALTER TABLE information.language ENABLE TRIGGER versioning_trigger');

    await deleteSysSystemConfig()
}
