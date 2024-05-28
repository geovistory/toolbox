create trigger on_insert instead of
insert
    on
    projects.v_info_proj_rel for each row execute procedure projects.v_info_proj_rel_update_or_create()
