import { Client, expect } from '@loopback/testlab';
import { GeovistoryApplication } from '../../../application';
import { setupApplication } from '../_test-helper';
import { hostname } from 'os';

describe('ImportTableController', () => {
    let app: GeovistoryApplication;
    let client: Client;

    let table: any;

    before(async () => {
        // ({ app, client } = await setupApplication());
    });

    beforeEach(async () => {
        table = {
            tableName: 'TestTable',
            pk_language: 19008, //
            pk_namespace: 24647440,
            headers: [
                { colLabel: '', comment: 'string', type: 'string' },
                { colLabel: 'col 1', comment: 'string', type: 'string' }
            ],
            rows: [
                ['cell [0:0]', 'cell [0:1]'],
                ['cell [1:0]', 'cell [1:1]']
            ],
        }
    })

    after(async () => {
        await app.stop();
    });

    // it('Not authenticated', async () => {
    //     const res = await client.post('/import-table').send();
    //     expect(res.body).to.containEql({ statusCode: 401 });
    // })

    // it('Send empty body', async () => {
    //     const res = await client.post('/import-table').send({});
    //     expect(res.body).to.containEql({ statusCode: 422 });
    // })

    // it('Send wrong format body', async () => {
    //     const res = await client.post('/import-table').send({ foo: 'bar' });
    //     expect(res.body).to.containEql({ statusCode: 422 });
    // })

    // it('Send a column with no name', async () => {
    //     table.headers[0].colLabel = '';
    //     const res = await client.post('/import-table').send(table);
    //     expect(res.body).to.containEql({ error: "Inconsistency in column name <0>." });
    // })

    // it('Number of column is not matching in the header and in the table', async () => {
    //     table.headers[2] = { colLabel: 'col 2', comment: 'string', type: 'string' }
    //     const res = await client.post('/import-table').send(table);
    //     expect(res.body).to.containEql({ error: "Inconsistency in columns number in row <0>." });
    // })

    // it('Cell is supposed to be a number, but it is not', async () => {
    //     table.headers[0].type = 'Number';
    //     const res = await client.post('/import-table').send(table);
    //     expect(res.body).to.containEql({ error: "Inconsistency in data format at cell: [0:0] ==> It should be a number." });
    // })

    // it('Create a table', async () => {
    //     const res = await client.post('/import-table').send(table);
    //     expect(res.body).have.property('duration');
    //     expect(res.body.duration).to.be.a.Number;
    //     expect(res.body).have.property('fk_digital');
    //     expect(res.body.fk_digital).to.be.a.Number;
    // })

    // it('Add a already existing table', async () => {
    //     const res = await client.post('/import-table').send(table);
    //     expect(res.body).to.containEql({ error: "This table already exists in this namespace." });
    // });
});

