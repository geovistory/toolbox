import {Entity, model, property, belongsTo} from '@loopback/repository';
import {PubRole} from './pub-role.model';

@model({
  settings: {
    strict: false,
    description: 'Map principals to roles',
    strictObjectIDCoercion: true,
    postgresql: {schema: 'public', table: 'rolemapping'},
  }
})
export class PubRoleMapping extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  @property({
    type: 'string',
    description: 'The principal type, such as USER, APPLICATION, ROLE, or user model name in case of multiple user models',
  })
  principalType?: string;

  @property({
    type: 'string',
    index: true,
  })
  principalId?: string;

  @property({
    type: 'number',
  })
  roleId?: number;

  @belongsTo(() => PubRole, {name: 'role'})
  roleid: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PubRoleMapping>) {
    super(data);
  }
}

export interface PubRoleMappingRelations {
  // describe navigational properties here
}

export type PubRoleMappingWithRelations = PubRoleMapping & PubRoleMappingRelations;
