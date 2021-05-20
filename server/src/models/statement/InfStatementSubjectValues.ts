import {InfStatement} from '../inf-statement.model';


export type InfStatementSubjectValues = Pick<
  InfStatement,
  "subject_resource" |
  "subject_chunk" |
  "subject_statement" |
  "subject_digital"
>;
