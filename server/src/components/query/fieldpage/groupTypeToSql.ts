import {GroupType} from './fieldPageReqsToSqlArray';

/**
 * Create the lower part of the SQL that requests a field page.
 * This Sql requires a preceeding tw0, as prepared by reqsToTable()
 * It joins statements to the left table tw0 and the target right tables
 *
 * @param gt
 * @returns
 */
export function groupTypeToSql(gt: GroupType): string {

	if (gt.scope.inProject) {
		if (gt.isOutgoing) return inProjectOutgoing(gt.scope.inProject);
		else return inProjectIncoming(gt.scope.inProject);
	}

	else if (gt.scope.notInProject) {
		if (gt.isOutgoing) return notInProjectOutgoing(gt.scope.notInProject);
		else return notInProjectIncoming(gt.scope.notInProject);
	}

	else if (gt.scope.inRepo) {
		if (gt.isOutgoing) return inRepoOutgoing();
		else return inRepoIncoming();
	}

	else if (gt.scope.noContraint) {
		if (gt.isOutgoing) return noConstraintOutgoing();
		else return noConstraintIncoming();
	}

	console.warn('Scope not implemented');
	return ' TODO ';
}

function inProjectOutgoing(projectId: number): string {
	return `
  SELECT t2.*
  FROM tw0,  gv_field_page_outgoing_in_project(
		${projectId},
		tw0.fk_property,
		tw0.source_info_id,
		tw0.source_data_id,
		tw0.source_tables_cell_id,
		tw0.source_tables_row_id,
		tw0."limit",
		tw0."offset",
		tw0.req
	) t2`;
}

function inProjectIncoming(projectId: number): string {
	return `
  SELECT t2.*
  FROM tw0,  gv_field_page_incoming_in_project(
    ${projectId},
		tw0.fk_property,
		tw0.source_info_id,
		tw0.source_data_id,
		tw0.source_tables_cell_id,
		tw0.source_tables_row_id,
		tw0."limit",
		tw0."offset",
		tw0.req
	) t2`;
}

function notInProjectOutgoing(projectId: number): string {
	return `
		SELECT t2.*
		FROM tw0,  gv_field_page_outgoing_not_in_project(
			${projectId},
			tw0.fk_property,
			tw0.source_info_id,
			tw0.source_data_id,
			tw0.source_tables_cell_id,
			tw0.source_tables_row_id,
			tw0."limit",
			tw0."offset",
			tw0.req
		) t2`;
}

function notInProjectIncoming(projectId: number): string {
	return `
		SELECT t2.*
		FROM tw0,  gv_field_page_incoming_not_in_project(
			${projectId},
			tw0.fk_property,
			tw0.source_info_id,
			tw0.source_data_id,
			tw0.source_tables_cell_id,
			tw0.source_tables_row_id,
			tw0."limit",
			tw0."offset",
			tw0.req
		) t2`;
}




function inRepoOutgoing(): string {
	return `
  SELECT t2.*
  FROM tw0,  gv_field_page_outgoing_in_repo(
		tw0.fk_property,
		tw0.source_info_id,
		tw0.source_data_id,
		tw0.source_tables_cell_id,
		tw0.source_tables_row_id,
		tw0."limit",
		tw0."offset",
		tw0.req
	) t2`;
}

function inRepoIncoming(): string {
	return `
  SELECT t2.*
  FROM tw0,  gv_field_page_incoming_in_repo(
		tw0.fk_property,
		tw0.source_info_id,
		tw0.source_data_id,
		tw0.source_tables_cell_id,
		tw0.source_tables_row_id,
		tw0."limit",
		tw0."offset",
		tw0.req
	) t2`;
}


function noConstraintOutgoing(): string {
	return `
  SELECT t2.*
  FROM tw0,  gv_field_page_outgoing_no_constraint(
		tw0.fk_property,
		tw0.source_info_id,
		tw0.source_data_id,
		tw0.source_tables_cell_id,
		tw0.source_tables_row_id,
		tw0."limit",
		tw0."offset",
		tw0.req
	) t2`;
}

function noConstraintIncoming(): string {
	return `
  SELECT t2.*
  FROM tw0,  gv_field_page_incoming_no_constraint(
		tw0.fk_property,
		tw0.source_info_id,
		tw0.source_data_id,
		tw0.source_tables_cell_id,
		tw0.source_tables_row_id,
		tw0."limit",
		tw0."offset",
		tw0.req
	) t2`;
}
