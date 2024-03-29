import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {PubAccount, PubAccountRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PubCredential} from '../models/pub-credential.model';
import {PubCredentialRepository} from './pub-credential.repository';


export class PubAccountRepository extends DefaultCrudRepository<
  PubAccount,
  typeof PubAccount.prototype.id,
  PubAccountRelations
  > {

  public readonly pubAccountCredentials: HasOneRepositoryFactory<
    PubCredential,
    typeof PubAccount.prototype.id
  >;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    @repository.getter('PubCredentialRepository') protected credentialRepositoryGetter: Getter<PubCredentialRepository>,
  ) {
    super(PubAccount, dataSource);
    this.pubAccountCredentials = this.createHasOneRepositoryFactoryFor(
      'pubAccountCredentials',
      credentialRepositoryGetter,
    );
    this.registerInclusionResolver(
      'pubAccountCredentials',
      this.pubAccountCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    accountId: typeof PubAccount.prototype.id,
  ): Promise<PubCredential | undefined> {
    try {
      return await this.pubAccountCredentials(accountId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
