import {InfStatementWithRelations} from "./InfStatementWithRelations";


export type InfStatementObjectValues = Pick<
  InfStatementWithRelations,
  "object_resource" |
  "object_appellation" |
  "object_time_primitive" |
  "object_language" |
  "object_lang_string" |
  "object_dimension"|
  "object_place" |
  "object_chunk"
>;
