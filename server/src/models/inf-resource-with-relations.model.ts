import {model, property} from '@loopback/repository';
import {InfStatementWithRelations} from "./statement/InfStatementWithRelations";
import {InfResource} from './inf-resource.model';

@model()
export class InfResourceWithRelations extends InfResource  {
  @property.array(InfStatementWithRelations)
  outgoing_statements?: InfStatementWithRelations[];
  @property.array(InfStatementWithRelations)
  incoming_statements?: InfStatementWithRelations[];
}
