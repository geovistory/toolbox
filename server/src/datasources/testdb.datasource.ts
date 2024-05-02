import {LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {getGvPgUrlForLoopback} from '../utils/databaseUrl';


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
// @lifeCycleObserver('datasource')
export class TestdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'TestDbFactory.datasource';
  connecting = false;
  // static readonly defaultConfig = config;
  constructor() {

    super({
      url: getGvPgUrlForLoopback(),
      name: 'TestDbFactory.datasource',
      connector: 'postgresql',
      ssl: {
        rejectUnauthorized: false,
      },
    });
    if (process.version !== 'v12.8.1') throw new Error('Node version must be v12.8.1, current version: ' + process.version)

  }
}
