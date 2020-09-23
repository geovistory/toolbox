import { Client, expect } from '@loopback/testlab';
import io from 'socket.io-client';
import { DatNamespace, ProProject, PubAccount } from '../../../models';
import { ImportTable } from '../../../models/import-table.model';
import { GeovistoryServer } from '../../../server';
import { createNamespace } from '../../helpers/atomic/dat-namespace.helper';
import { linkAccountProject } from '../../helpers/atomic/pub-account_project_rel.helper';
import { createTypes } from '../../helpers/atomic/sys-system-type.helper';
import { cleanDb } from '../../helpers/cleaning/clean-db.helper';
import { createAccountVerified } from '../../helpers/graphs/account.helper';
import { init } from '../../helpers/graphs/init.helper';
import { createProjectAndNamespace, createRawProject } from '../../helpers/graphs/project.helpers';
import { setupApplication } from '../_test-helper';


const qs = require('querystring');
const pEvent = require('p-event');


describe('ImportTableController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => { ({ server, client } = await setupApplication()); });
    after(async () => { await server.stop(); });

    describe('POST /import-table', () => {
        let project: ProProject, accountInProject: PubAccount, accountOutOfProject: PubAccount, namespace: DatNamespace;
        const pwd = 'testtest1';
        let table: ImportTable;

        beforeEach(async () => {
            try {
                await cleanDb();
                await createTypes();
                const result = await createProjectAndNamespace('English');
                project = result.project;
                namespace = result.namespace;
                accountInProject = await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', pwd);
                await linkAccountProject(accountInProject, project);
                accountOutOfProject = await createAccountVerified('jonas.schneider@kleiolab.ch', 'jonasscheider', pwd);

                table = {
                    tableName: 'TestTable',
                    fileName: 'TestTableFileName',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    pk_language: 18889, // english
                    headers: [
                        { colLabel: 'col 0', comment: 'string', type: 'string' },
                        { colLabel: 'col 1', comment: 'string', type: 'string' }
                    ],
                    rows: [
                        ['cell [0:0]', 'cell [0:1]'],
                        ['cell [1:0]', 'cell [1:1]']
                    ],
                }
            } catch (e) {
                console.log(e);
            }
        })

        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.post('/import-table').send();
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Authorization header not found." });
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.post('/import-table').set('Authorization', randomJWT).send(table);
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Error verifying token : invalid signature" });
        })

        it('should reject the request because the user is not in the project', async () => {
            const jwt = (await client.post('/login').send({ email: accountOutOfProject.email, password: pwd })).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        it('should reject the request because the namespace is not linked to the project', async () => {
            const wrongNamespace = await createNamespace(await createRawProject('English'));
            const params = { pkNamespace: wrongNamespace.pk_entity }
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        it('should reject the request because the body is empty', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send({});
            expect(res.body.error).to.containEql({ statusCode: 422, message: "The request body is invalid. See error object `details` property for more info." });
        });

        it('should reject the request because body is not at right format', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send({ foo: 'bar' });
            expect(res.body.error).to.containEql({ statusCode: 422, message: 'The request body is invalid. See error object `details` property for more info.' });
        });

        it('should reject the request because there is a column which has no name', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            table.headers[0].colLabel = '';
            const params = { pkNamespace: namespace.pk_entity }
            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({ error: "Inconsistency in column name <0>." });
        });

        it('should reject the request because the number of column is not the same in the header and in the table', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            table.headers[2] = { colLabel: 'col 2', comment: 'string', type: 'string' }
            const params = { pkNamespace: namespace.pk_entity }
            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({ error: "Inconsistency in columns number in row <0>." });
        })

        it('should reject the request because there is a cell which is supposed to be a number, but it is not', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            table.headers[0].type = 'number';
            const params = { pkNamespace: namespace.pk_entity }
            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({ error: "Inconsistency in data format at cell: [0: 0] ==> It should be a number." });
        })

        it('should accept the request', async () => {
            await init();
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const params = { pkNamespace: namespace.pk_entity }
            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            expect(res.body).have.property('fk_digital');
            expect(res.body.fk_digital).to.be.a.Number();
        })
    });


    describe('WSS /ImportTable', () => {
        let socketClient: SocketIOClient.Socket;

        beforeEach(async () => {
            try {
                await cleanDb();
                await createTypes();
                const url = server.url;
                socketClient = io(`${url}/ImportTable`);
            } catch (e) {
                console.log(e);
            }
        });

        afterEach(async () => {
            socketClient.close();
        })

        it('should throw no errors', async () => {
            socketClient.emit('listenDigitals', []);
            expect(true);
        })

        it('should tell the front-end that the non existing digital is already loaded', async () => {
            const fakeId = 999;
            socketClient.emit('listenDigitals', [fakeId]);
            const response = await pEvent(socketClient, 'state_' + fakeId);
            expect(response).to.containEql({ advancement: 100, id: fakeId, infos: '' });
        })

        it('should tell the front end that the digital is loading', async () => {
            const pwd = 'testtest1';
            const result = await createProjectAndNamespace('English');
            const project = result.project;
            const namespace = result.namespace;
            const accountInProject = await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', pwd);
            await linkAccountProject(accountInProject, project);
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const params = { pkNamespace: namespace.pk_entity }

            const table = {
                tableName: 'TestTable',
                fileName: 'TestTableFileName',
                // eslint-disable-next-line @typescript-eslint/camelcase
                pk_language: 18889, // english
                headers: [
                    { colLabel: 'col 0', comment: 'string', type: 'string' },
                    { colLabel: 'col 1', comment: 'string', type: 'string' }
                ],
                rows: [
                    ['cell [0:0]', 'cell [0:1]'],
                    ['cell [1:0]', 'cell [1:1]']
                ],
            }
            table.rows = [];
            for (let i = 0; i < 1000; i++) {
                table.rows.push(['cell [' + i + ':0]', 'cell [' + i + ':1]'])
            }

            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            socketClient.emit('listenDigitals', [res.body.fk_digital]);
            const response = await pEvent(socketClient, 'state_' + res.body.fk_digital);
            expect(response.infos).to.be.a.String();

            let finished = false;
            while (!finished) {
                const resp = await pEvent(socketClient, 'state_' + res.body.fk_digital);
                finished = resp.advancement === 100;
            }
        })

        it('should tell the front-end that the digital is already loaded', async () => {
            const pwd = 'testtest1';
            const result = await createProjectAndNamespace('English');
            const project = result.project;
            const namespace = result.namespace;
            const accountInProject = await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', pwd);
            await linkAccountProject(accountInProject, project);
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const params = { pkNamespace: namespace.pk_entity }

            const table = {
                tableName: 'TestTable',
                fileName: 'TestTableFileName',
                // eslint-disable-next-line @typescript-eslint/camelcase
                pk_language: 18889, // english
                headers: [
                    { colLabel: 'col 0', comment: 'string', type: 'string' },
                    { colLabel: 'col 1', comment: 'string', type: 'string' }
                ],
                rows: [
                    ['cell [0:0]', 'cell [0:1]'],
                    ['cell [1:0]', 'cell [1:1]']
                ],
            }
            for (let i = 0; i < 1000; i++) {
                table.rows.push(['cell [' + i + ':0]', 'cell [' + i + ':1]'])
            }

            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            socketClient.emit('listenDigitals', [res.body.fk_digital]);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await pEvent(socketClient, 'state_' + res.body.fk_digital);
            expect(response.infos).to.be.a.String();

            let finished = false;
            while (!finished) {
                const resp = await pEvent(socketClient, 'state_' + res.body.fk_digital);
                finished = resp.advancement === 100;
            }
        })

        it('should tell both users that the digital is loading', async () => {
            const socketClient2 = io(`${server.url}/ImportTable`);

            const pwd = 'testtest1';
            const result = await createProjectAndNamespace('English');
            const project = result.project;
            const namespace = result.namespace;
            const accountInProject = await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', pwd);
            await linkAccountProject(accountInProject, project);
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const params = { pkNamespace: namespace.pk_entity }

            const table = {
                tableName: 'TestTable',
                fileName: 'TestTableFileName',
                // eslint-disable-next-line @typescript-eslint/camelcase
                pk_language: 18889, // english
                headers: [
                    { colLabel: 'col 0', comment: 'string', type: 'string' },
                    { colLabel: 'col 1', comment: 'string', type: 'string' }
                ],
                rows: [
                    ['cell [0:0]', 'cell [0:1]'],
                    ['cell [1:0]', 'cell [1:1]']
                ],
            }
            for (let i = 0; i < 1000; i++) {
                table.rows.push(['cell [' + i + ':0]', 'cell [' + i + ':1]'])
            }


            const res = await client.post('/import-table?' + qs.stringify(params)).set('Authorization', jwt).send(table);
            socketClient.emit('listenDigitals', [res.body.fk_digital]);
            socketClient2.emit('listenDigitals', [res.body.fk_digital]);

            let resp1, resp2;
            await Promise.all([pEvent(socketClient, 'state_' + res.body.fk_digital), pEvent(socketClient, 'state_' + res.body.fk_digital)])
                .then(r => {
                    resp1 = r[0];
                    resp2 = r[1];
                });

            expect(JSON.stringify(resp1)).to.be.equal(JSON.stringify(resp2));

            let finished = false;
            while (!finished) {
                const resp = await pEvent(socketClient, 'state_' + res.body.fk_digital);
                finished = resp.advancement === 100;
            }

            socketClient2.close();
        })

    });
});
