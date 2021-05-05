import {InfStatement} from '../../models';


export type InfStatementSubjectFks = Pick<InfStatement,
  "fk_subject_info" |
  "fk_subject_data" |
  "fk_subject_tables_cell" |
  "fk_subject_tables_row"
>;
