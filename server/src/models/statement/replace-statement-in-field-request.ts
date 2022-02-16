import {getModelSchemaRef} from '@loopback/openapi-v3'
import {model, property} from '@loopback/repository'
import {GvFieldProperty} from '../field/gv-field-property'
import {GvFieldSourceEntity} from '../field/gv-field-source-entity'
import {InfStatement, InfStatementWithRelations} from '../inf-statement.model'

@model()
export class ReplaceStatementInFieldRequest {
  @property({required: true}) pkProject: number
  @property({type: GvFieldSourceEntity, required: true}) source: GvFieldSourceEntity
  @property({type: GvFieldProperty, required: true}) property: GvFieldProperty
  @property({required: true}) isOutgoing: boolean
  @property({
    jsonSchema: {
      $ref: getModelSchemaRef(InfStatement, {includeRelations: true}).$ref
    }, required: true
  }) statement: InfStatementWithRelations
}
