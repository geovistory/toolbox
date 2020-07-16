import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  url: process.env.DATABASE_URL + '?ssl=true',
  name: 'postgres1',
  connector: 'postgresql',
  ssl: {
    rejectUnauthorized: true,
  },
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Postgres1DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgres1';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgres1', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
