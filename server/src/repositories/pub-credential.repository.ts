// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { PubCredential, CredentialRelations } from '../models/pub-credential.model';

export class PubCredentialRepository extends DefaultCrudRepository<
    PubCredential,
    typeof PubCredential.prototype.id,
    CredentialRelations
    > {
    constructor(
        @inject(`datasources.Postgres1`)
        dataSource: juggler.DataSource,
    ) {
        super(PubCredential, dataSource);
    }
}
