-- 1
Drop Table If Exists information._backup_role;

-- 2
Drop Table If Exists information.entity_association_vt;

-- 3
Drop Trigger on_insert On information.v_entity_association;

-- 4
Drop Function information.v_entity_association_find_or_create ();

-- 5
Drop View war.v_entity_association_per_project_and_repo;

-- 6
Drop View information.v_entity_association;

-- 7
Alter Table information.entity_association Rename To _backup_entity_association;

