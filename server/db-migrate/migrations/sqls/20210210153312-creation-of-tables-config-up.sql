Create Table projects.table_config (
	fk_project integer NOT NULL,
	account_id integer,
	fk_digital integer NOT NULL,
	config jsonb,

    CONSTRAINT tables_config_fk_project_fkey FOREIGN KEY (fk_project)
        REFERENCES projects.project (pk_entity) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,

    CONSTRAINT tables_config_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,

    CONSTRAINT tables_config_fk_digital_fkey FOREIGN KEY (fk_digital)
        REFERENCES data.digital (pk_entity) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
Inherits (
    projects.entity
);

-- 2
Select
    commons.init_entity_child_table ('projects.table_config');