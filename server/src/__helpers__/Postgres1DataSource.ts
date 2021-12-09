import {juggler} from '@loopback/repository';
import {getGvPgUrlForLoopback} from '../utils/databaseUrl';







export class Postgres1DataSource extends juggler.DataSource {
  constructor() {
    super({
      url: getGvPgUrlForLoopback(),
      name: 'postgres1',
      connector: 'postgresql',
      ssl: {
        rejectUnauthorized: true,
      },
      type: ''
    });
    console.log('Geovistory Database:', this.settings.url.split('@')[1]);
  }
}
