import {model, property} from '@loopback/repository';
import {getModelSchemaRef} from '@loopback/rest';
import {InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfResourceWithRelations, InfStatement, InfStatementWithRelations, InfTimePrimitive} from '../models';



@model()
export class InfData {
  @property({
    jsonSchema: {
      $ref: getModelSchemaRef(InfResource, {includeRelations: true}).$ref
    }
  })
  resource?: InfResourceWithRelations;

  @property({
    jsonSchema: {
      $ref: getModelSchemaRef(InfStatement, {includeRelations: true}).$ref
    }
  })
  statement?: InfStatementWithRelations;

  @property()
  appellation?: InfAppellation;

  @property()
  place?: InfPlace;

  @property()
  dimension?: InfDimension;

  @property()
  timePrimitive?: InfTimePrimitive;

  @property()
  language?: InfLanguage;

  @property()
  langString?: InfLangString;
}
