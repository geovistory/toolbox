import {InfStatementWithRelations} from "./InfStatementWithRelations";


export type InfStatementSubjectValues = Pick<
  InfStatementWithRelations,
  "subject_resource" |
  "subject_chunk" |
  "subject_statement" |
  "subject_digital"
>;
