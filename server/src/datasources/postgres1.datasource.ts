import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Postgres1DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgres1';

  constructor(
    @inject('datasources.config.postgres1', {optional: true})
    dsConfig: object,
  ) {
    super(dsConfig);
    console.log('Geovistory Database:', this.settings.url.split('@')[1])
  }
}
