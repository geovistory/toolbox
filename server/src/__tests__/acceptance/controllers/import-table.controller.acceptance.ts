import { Client, expect } from '@loopback/testlab';
import { GeovistoryApplication } from '../../../application';
import { setupApplication } from '../_test-helper';
import { hostname } from 'os';

describe('ImportTableController', () => {
    let app: GeovistoryApplication;
    let client: Client;

    before('setupApplication', async () => {
        ({ app, client } = await setupApplication());
    });

    after(async () => {
        await app.stop();
    });

    it('Call Importer with parameters not fitting the LB4 model', async () => {

        const res1 = await client.post('/import-table').send({});
        expect(res1.body).to.containEql({ statusCode: 422 });

        const res2 = await client.post('/import-table').send({ foo: 'bar' });
        expect(res2.body).to.containEql({ statusCode: 422 });

        let table = {
            tableName: 'BigTable 19',
            pk_language: 19008,
            pk_namespace: 24647440,
            headers: [
                { colLabel: '', comment: 'string', type: 'string' },
                { colLabel: 'col 1', comment: 'string', type: 'string' }
            ],
            rows: [
                ['cell 0, 0', 'cell 0, 1'],
                ['cell 1, 0', 'cell 1, 1']
            ],
        }

        const res3 = await client.post('/import-table').send(table);
        expect(res3.body).to.containEql({error: "Inconsistency in column name <0>." });


    });
});

