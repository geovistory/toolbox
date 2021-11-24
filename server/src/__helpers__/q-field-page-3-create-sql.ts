/* eslint-disable @typescript-eslint/no-invalid-this */
import {QFieldPage3} from '../components/query/q-field-page-3';
import {Postgres1DataSource} from '../datasources';
import {req} from './req';

const fakeDataSource = '' as unknown as Postgres1DataSource;

// const req = GvFieldPageReqMock.appeTeEnIsAppeOfPerson
const x = new QFieldPage3(fakeDataSource)
x.createSql(req);

