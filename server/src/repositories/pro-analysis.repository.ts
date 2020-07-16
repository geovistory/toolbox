import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {ProAnalysis, ProAnalysisRelations, ProProject, PubAccount} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProProjectRepository} from './pro-project.repository';
import {PubAccountRepository} from './pub-account.repository';

export class ProAnalysisRepository extends DefaultCrudRepository<
  ProAnalysis,
  typeof ProAnalysis.prototype.pk_entity,
  ProAnalysisRelations
> {

  public readonly project: HasOneRepositoryFactory<ProProject, typeof ProAnalysis.prototype.pk_entity>;

  public readonly account: HasOneRepositoryFactory<PubAccount, typeof ProAnalysis.prototype.pk_entity>;

  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource, @repository.getter('ProProjectRepository') protected proProjectRepositoryGetter: Getter<ProProjectRepository>, @repository.getter('PubAccountRepository') protected pubAccountRepositoryGetter: Getter<PubAccountRepository>,
  ) {
    super(ProAnalysis, dataSource);
    this.account = this.createHasOneRepositoryFactoryFor('account', pubAccountRepositoryGetter);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
    this.project = this.createHasOneRepositoryFactoryFor('project', proProjectRepositoryGetter);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
  }
}
