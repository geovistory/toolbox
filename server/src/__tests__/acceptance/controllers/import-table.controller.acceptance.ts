import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../application';
import {setupApplication} from '../_test-helper';
import {hostname} from 'os';
import {GeovistoryServer} from '../../../server';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {createProjectAndNamespace} from '../../helpers/graphs/project.helpers';
import {createAccountVerified} from '../../helpers/graphs/account.helper';
import {linkAccountProject} from '../../helpers/atomic/pub-account_project_rel.helper';
import {PubAccount, DatNamespace, ProProject, InfTemporalEntity} from '../../../models';
import {ImportTable} from '../../../models/import-table.model';

describe('ImportTableController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {
        ({server, client} = await setupApplication());
    });

    beforeEach(async () => {
        await cleanDb();
    })

    after(async () => {
        await server.stop();
    });

    describe('POST /import-table', async () => {
        let project: ProProject, accountInProject: PubAccount, accountOutProject: PubAccount, namespace: DatNamespace;
        let pwd = 'testtest1';
        let table: ImportTable;

        before(async () => {
            let result = await createProjectAndNamespace(18889) //english
            project = result.project;
            namespace = result.namespace;
            accountInProject = await createAccountVerified('gaetan.muck@kleiolab.ch', 'gaetanmuck', pwd);
            await linkAccountProject(accountInProject, project);
            accountOutProject = await createAccountVerified('jonas.schneider@kleiolab.ch', 'jonasscheider', pwd);
        });

        beforeEach(async () => {
            table = {
                tableName: 'TestTable',
                pk_language: 18889, // english
                pk_namespace: namespace.pk_entity as number,
                headers: [
                    {colLabel: '', comment: 'string', type: 'string'},
                    {colLabel: 'col 1', comment: 'string', type: 'string'}
                ],
                rows: [
                    ['cell [0:0]', 'cell [0:1]'],
                    ['cell [1:0]', 'cell [1:1]']
                ],
            }
        })

        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.post('/import-table').send();
            expect(res.body.error).to.containEql({statusCode: 401, message: "Authorization header not found."});
        })

        it('should reject the request because the authorization header is wrong', async () => {
            let randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.post('/import-table').set('Authorization', randomJWT).send();
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
        })

        it('should reject the request because the user is not in the project', async () => {
            let jwt = (await client.post('/login').send({email: accountOutProject.email, password: pwd})).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send();
            expect(res.body.error).to.containEql({statusCode: 401}); //TODO: add the message
        });

        it('should reject the request because the namespace is not linked to the project', async () => {
            table.pk_namespace++;
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body.error).to.containEql({statusCode: 401}); //TODO: add the message
        });

        it('should reject the request because the body is empty', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send({});
            expect(res.body).to.containEql({statusCode: 422}); //TODO: add the message
        });

        it('should reject the request because body is not at right format', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send({foo: 'bar'});
            expect(res.body).to.containEql({statusCode: 422}); //TODO: add the message
        });

        it('should reject the request because there is a column which has no name', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            table.headers[0].colLabel = '';
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({error: "Inconsistency in column name <0>."});
        });

        it('should reject the request because the number of column is not the same in the header and in the table', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            table.headers[2] = {colLabel: 'col 2', comment: 'string', type: 'string'}
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({error: "Inconsistency in columns number in row <0>."});
        })

        it('should reject the request because there is a cell which is supposed to be a number, but it is not', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            table.headers[0].type = 'number';
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({error: "Inconsistency in data format at cell: [0:0] ==> It should be a number."});
        })

        it('should accept the request', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body).have.property('duration');
            expect(res.body.duration).to.be.a.Number;
            expect(res.body).have.property('fk_digital');
            expect(res.body.fk_digital).to.be.a.Number;
        })

        it('should reject the request because the table already exists', async () => {
            let jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.post('/import-table').set('Authorization', jwt).send(table);
            expect(res.body).to.containEql({error: "This table already exists in this namespace."});
        })
    });
});
