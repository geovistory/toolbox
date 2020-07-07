import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, juggler, repository, } from '@loopback/repository';
import { UserServiceBindings } from '@loopback/authentication-jwt';
import { Account, AccountRelations } from '../models/account.model';
import { Credential } from '../models/credential.model';
import { CredentialRepository } from './credential.repository';

export class AccountRepository extends DefaultCrudRepository<
    Account,
    typeof Account.prototype.id,
    AccountRelations
    > {
    public readonly accountCredentials: HasOneRepositoryFactory<
        Credential,
        typeof Account.prototype.id
    >;

    constructor(
        @inject(`datasources.Postgres1`)
        dataSource: juggler.DataSource,
        @repository.getter('CredentialRepository')
        protected credentialRepositoryGetter: Getter<
            CredentialRepository
        >,
    ) {
        super(Account, dataSource);
        this.accountCredentials = this.createHasOneRepositoryFactoryFor(
            'accountCredentials',
            credentialRepositoryGetter,
        );
        this.registerInclusionResolver(
            'userCredentials',
            this.accountCredentials.inclusionResolver,
        );
    }

    async findCredentials(
        accountId: typeof Account.prototype.id,
    ): Promise<Credential | undefined> {
        try {
            return await this.accountCredentials(accountId).get();
        } catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
}
