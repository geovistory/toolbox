import {InfStatement} from '../../models';


export type InfStatementObjectFks = Pick<InfStatement,
  "fk_object_info" |
  "fk_object_data" |
  "fk_object_tables_cell" |
  "fk_object_tables_row"
>;
