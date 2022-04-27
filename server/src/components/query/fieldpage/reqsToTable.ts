import {GvFieldPageReq} from '../../../models/field/gv-field-page-req';

/**
 * converts multiple requests into unioned select statements
 * @param reqs
 */

export function reqsToTable(reqs: GvFieldPageReq[]): string {
    return reqs.map(r => reqToRow(r)).join('\nUNION ALL\n');
}
/**
 * converts one request to a select statement
 * @param req
 * @returns
 */
function reqToRow(req: GvFieldPageReq): string {
    const p = req.page;
    const strings = [];
    strings.push(`${p.property.fkProperty ?? 0} fk_property`);
    strings.push(`${p.source.fkInfo ?? 0} source_info_id`);
    strings.push(`${p.source.fkData ?? 0} source_data_id`);
    strings.push(`${p.source.fkTablesCell ?? 0}::bigint source_tables_cell_id`);
    strings.push(`${p.source.fkTablesRow ?? 0}::bigint source_tables_row_id`);
    strings.push(`${p.limit} "limit"`);
    strings.push(`${p.offset} "offset"`);
    strings.push(`'${JSON.stringify(req)}'::json "req"`);
    return `SELECT ${strings.join(', ')}`;
}

