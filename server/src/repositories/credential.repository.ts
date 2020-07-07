// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { UserServiceBindings } from '@loopback/authentication-jwt';
import { Credential, CredentialRelations } from '../models/credential.model';

export class CredentialRepository extends DefaultCrudRepository<
    Credential,
    typeof Credential.prototype.id,
    CredentialRelations
    > {
    constructor(
        @inject(`datasources.Postgres1`)
        dataSource: juggler.DataSource,
    ) {
        super(Credential, dataSource);
    }
}
