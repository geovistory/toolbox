/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import {DatDigital, DatNamespace, ProProject, PubAccount} from '../../../models';
import {GeovistoryServer} from '../../../server';
import {linkAccountProject} from '../../helpers/atomic/pub-account_project_rel.helper';
import {createTypes} from '../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {createAccountVerified} from '../../helpers/graphs/account.helper';
import {createProjectAndNamespace} from '../../helpers/graphs/project.helpers';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {forFeatureX} from '../../helpers/graphs/feature-X.helper';
import {PubAccountMock} from '../../helpers/data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../../helpers/data/gvDB/PubCredentialMock';
import {ProProjectMock} from '../../helpers/data/gvDB/ProProjectMock';
import {DatDigitalMock} from '../../helpers/data/gvDB/DatDigitalMock';
import {GvSchemaObject} from '../../../models/gv-schema-object.model';
import {GetTablePageOptions, SortDirection, TablePageResponse} from '../../../components/query/q-table-page';


describe('TableController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {({server, client} = await setupApplication());});
    after(async () => {await server.stop();});

    describe('GET /get-columns-of-table', () => {
        const pwd = 'testtest1';
        let project: ProProject,
            accountInProject: PubAccount,
            accountOutOfProject: PubAccount,
            namespace: DatNamespace;

        // TODO create the table in beforeEach
        const table = new DatDigital({pk_entity: 123})

        let query: {pkProject: number, pkDigital: number};

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

                query = {
                    pkProject: project.pk_entity ?? -1,
                    pkDigital: table.pk_entity ?? -1
                }

            } catch (e) {
                console.log(e);
            }
        })

        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.get('/get-columns-of-table').send();
            expect(res.body.error).to.containEql({statusCode: 401, message: "Authorization header not found."});
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.get('/get-columns-of-table').set('Authorization', randomJWT).query(query);
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
        })

        it('should reject the request because the user is not in the project', async () => {
            const x = await client.post('/login').send({email: accountOutOfProject.email, password: pwd})
            const jwt = x.body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).query(query);
            expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        });

        // it('should reject the request because the namespace is not linked to the project', async () => {
        //     const wrongNamespace = await createNamespace(await createRawProject('English'));
        //     const params = {pkNamespace: wrongNamespace.pk_entity}
        //     const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
        //     const res = await client.get('/get-columns-of-table?' + qs.stringify(params)).set('Authorization', jwt).query(query);
        //     expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        // });

        it('should reject the request because the query params are empty', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).send({});
            expect(res.body.error).to.containEql({statusCode: 400, code: "MISSING_REQUIRED_PARAMETER"});
        });

        it('should reject the request because query params are not in right format', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).send({foo: 'bar'});
            expect(res.body.error).to.containEql({statusCode: 400, code: "MISSING_REQUIRED_PARAMETER"});
        });

        // it('should return a valid object', async () => {
        //     await init();
        //     const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
        //     const res = await client.get('/get-columns-of-table').set('Authorization', jwt).query(query);
        //     const expected: GvSchemaObject = {
        //         dat: {
        //             digital: [
        //                 {pk_entity: 123} // TODO: add mock here
        //             ],
        //         }
        //     }
        //     expect(res.body).to.containEql(expected);
        // })
    });
    describe('GET /get-table-page', () => {
        let query: {pkProject: number, pkEntity: number};
        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX()
            } catch (e) {
                console.log(e);
            }
            query = {
                pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity ?? -1,
                pkEntity: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity ?? -1
            }
        })

        it('should return a valid object', async () => {
            const jwt = (
                await client.post('/login')
                    .send({
                        email: PubAccountMock.GAETAN_VERIFIED.email,
                        password: PubCredentialMock.GAETAN_PASSWORD.password
                    })
            ).body.lb4Token;
            const options: GetTablePageOptions = {
                limit: 10,
                offset: 0,
                sortBy: 'pk_row',
                sortDirection: SortDirection.ASC,
                filters: {}
            }
            const res = await client
                .post('/get-table-page')
                .set('Authorization', jwt)
                .query(query)
                .send(options)
            const expected
                // : TablePageResponse
                = {
            }
            expect(res.body).to.equal(expected);
        })
    })


});
