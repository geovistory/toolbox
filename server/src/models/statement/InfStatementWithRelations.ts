import {model, property} from '@loopback/repository';
import {DatChunk, DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfResource, InfPlace, InfStatement,  InfTimePrimitive, ProInfoProjRel} from '..';

@model()
export class InfStatementWithRelations
  // extends InfStatement <- this would be logically right, but decorators don't work
  //    for this reason, we manually duplicate the properties of InfStatement
{
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_info?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_data?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_tables_cell?: number;

  @property({
    type: 'string',
    default: 0,
  })
  fk_subject_tables_row?: string;

  @property({
    type: 'number',
    default: 0,
  })
  fk_property?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_property_of_property?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_info?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_data?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_tables_cell?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_tables_row?: number;

  @property({
    type: 'number',
  })
  is_in_project_count?: number;

  @property({
    type: 'number',
  })
  is_standard_in_project_count?: number;

  @property({
    type: 'string',
  })
  community_favorite_calendar?: string;


  @property.array(ProInfoProjRel)
  entity_version_project_rels?: ProInfoProjRel[];


  @property({type: InfResource})
  subject_resource?: InfResource;


  @property({type: DatChunk})
  subject_chunk?: DatChunk;


  @property({type: InfStatement})
  subject_statement?: InfStatement;


  @property({type: DatDigital})
  subject_digital?: DatDigital;


  /**
 * Objects value objects
 */


  @property({type: InfResource})
  object_resource?: InfResource;

  @property({type: InfAppellation})
  object_appellation?: InfAppellation;


  @property({type: InfTimePrimitive})
  object_time_primitive?: InfTimePrimitive;


  @property({type: InfLanguage})
  object_language?: InfLanguage;


  @property({type: InfLangString})
  object_lang_string?: InfLangString;


  @property({type: InfDimension})
  object_dimension?: InfDimension;


  @property({type: InfPlace})
  object_place?: InfPlace;


  @property({type: DatChunk})
  object_chunk?: DatChunk;
}
