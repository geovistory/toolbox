import {LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
// @lifeCycleObserver('datasource')
export class TestdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'testdb';
  // static readonly defaultConfig = config;
  constructor() {

    super({
      url: process.env.TEST_DATABASE_URL,
      name: 'testdb',
      connector: 'postgresql',
      ssl: {
        rejectUnauthorized: false,
      },
    });
    console.log(process.env.TEST_DATABASE_URL)
  }
}
