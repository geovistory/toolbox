import {model, property} from '@loopback/repository';
@model()
export class GvPaginationStatementFilter {
  @property() fk_subject_info?: number;
  @property() fk_subject_data?: number;
  @property() fk_subject_tables_row?: number;
  @property() fk_subject_tables_cell?: number;


  @property() fk_property?: number;
  @property() fk_property_of_property?: number;


  @property() fk_object_info?: number;
  @property() fk_object_data?: number;
  @property() fk_object_tables_row?: number;
  @property() fk_object_tables_cell?: number;
}


