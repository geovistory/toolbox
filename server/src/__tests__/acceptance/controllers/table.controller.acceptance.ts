/* eslint-disable @typescript-eslint/camelcase */
import { Client, expect } from '@loopback/testlab';
import { GetTablePageOptions, SortDirection } from '../../../components/query/q-table-page';
import { PubAccount } from '../../../models';
import { GvPositiveSchemaObject } from '../../../models/gv-positive-schema-object.model';
import { GeovistoryServer } from '../../../server';
import { createDatNamespace } from '../../helpers/atomic/dat-namespace.helper';
import { DatClassColumnMappingMock } from '../../helpers/data/gvDB/DatClassColumnMappingMock';
import { DatColumnMock } from '../../helpers/data/gvDB/DatColumnMock';
import { DatDigitalMock } from '../../helpers/data/gvDB/DatDigitalMock';
import { DatNamespaceMock } from '../../helpers/data/gvDB/DatNamespaceMock';
import { DfhApiClassMock } from '../../helpers/data/gvDB/DfhApiClassMock';
import { InfStatementMock } from '../../helpers/data/gvDB/InfStatementMock';
import { ProProjectMock } from '../../helpers/data/gvDB/ProProjectMock';
import { PubAccountMock } from '../../helpers/data/gvDB/PubAccountMock';
import { PubCredentialMock } from '../../helpers/data/gvDB/PubCredentialMock';
import { createJonasSchneider } from '../../helpers/graphs/account.helper';
import { forFeatureX } from '../../helpers/graphs/feature-X.helper';
import { createProject2 } from '../../helpers/graphs/project.helper';
import { setupApplication } from '../../helpers/gv-server-helpers';
import { cleanDb } from '../../helpers/meta/clean-db.helper';
const qs = require('querystring');


describe('TableController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => { ({ server, client } = await setupApplication()); });
    after(async () => { await server.stop(); });



    describe('POST /map-column', async () => {
        const project = ProProjectMock.SANDBOX_PROJECT;
        const accountInProject: PubAccount = PubAccountMock.GAETAN_VERIFIED
        const pwdInProject = PubCredentialMock.GAETAN_PASSWORD.password;
        const namespaceInProject = DatNamespaceMock.SANDBOX_NAMESPACE

        const namespaceOUT = DatNamespaceMock.NAMESPACE_2

        let query: { pkProject: number };

        beforeEach(async () => {
            await cleanDb();
            await forFeatureX();
            await createJonasSchneider();
            await createProject2()
            await createDatNamespace(DatNamespaceMock.NAMESPACE_2);
            query = { pkProject: project.pk_entity ?? -1 }
        })

        //AUTHORIZATION

        it('AUTH: should reject the request because the user is not authenticated', async () => {
            const res = await client.post('/map-column').send();
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Authorization header not found." });
        })

        it('AUTH: should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.post('/map-column').set('Authorization', randomJWT).query(query);
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Error verifying token : invalid signature" });
        })

        it('AUTH: should reject the request because the user is not in the namespace', async () => {
            const x = await client.post('/login').send({ email: PubAccountMock.JONAS.email, password: PubCredentialMock.JONAS_PASSWORD.password })
            const jwt = x.body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceOUT.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1, pkClass: -1 });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        // MISSING PARAMETERS

        it('MISS-PARAM: should reject the request: the namespace is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column').set('Authorization', jwt).send({});
            expect(res.body.error).to.containEql({ statusCode: 400, code: "MISSING_REQUIRED_PARAMETER" });
        })

        it('MISS-PARAM: should reject the request: the class and the column are absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({});
            expect(res.body.error.details[0]).to.containEql({ message: "should have required property \'pkColumn\'" });
            expect(res.body.error.details[1]).to.containEql({ message: "should have required property \'pkClass\'" });
        })

        it('MISS-PARAM: should reject the request: the class is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1 });
            expect(res.body.error.details[0]).to.containEql({ message: "should have required property \'pkClass\'" });
        })

        it('MISS-PARAM: should reject the request: the column is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkClass: -1 });
            expect(res.body.error.details[0]).to.containEql({ message: "should have required property \'pkColumn\'" });
        })

        // CORE

        it('CORE: should reject the request: the namespace is wrong', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceOUT.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1, pkClass: DfhApiClassMock.EN_21_PERSON.dfh_pk_class });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        })

        it('CORE: should reject the request: the column does not exists', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: 9998, pkClass: DfhApiClassMock.EN_21_PERSON.dfh_pk_class });
            expect(res.body.error).to.containEql({ statusCode: 404, message: "Entity not found: DatColumn with id " + 9998 });
        })

        it('CORE: should reject the request: the class does not exists', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_PEOPLE.pk_entity, pkClass: 9998 });
            expect(res.body.error).to.containEql({ statusCode: 404, message: "Entity not found: DfhClass with id " + 9998 });
        })

        it('CORE: should reject the request: the column is already mapped to this class', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_PEOPLE.pk_entity, pkClass: DfhApiClassMock.EN_21_PERSON.dfh_pk_class });
            expect(res.body.error).to.containEql({ message: "The column is already mapped to this class" });
        })

        it('CORE: should accept the request: column has been mapped', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/map-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_BIRTHDATES.pk_entity, pkClass: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class });

            expect(res.body.dat.class_column_mapping[0].pk_entity).to.be.a.Number();
            expect(res.body.dat.class_column_mapping[0].fk_class).to.be.a.equal(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class);
            expect(res.body.dat.class_column_mapping[0].fk_column).to.be.a.equal(DatColumnMock.COL_BIRTHDATES.pk_entity);
        })

    })

    describe('POST /unmap-column a', async () => {
        const project = ProProjectMock.SANDBOX_PROJECT;
        const accountInProject: PubAccount = PubAccountMock.GAETAN_VERIFIED
        const pwdInProject = PubCredentialMock.GAETAN_PASSWORD.password;
        const namespaceInProject = DatNamespaceMock.SANDBOX_NAMESPACE

        const namespaceOUT = DatNamespaceMock.NAMESPACE_2

        let query: { pkProject: number };

        beforeEach(async () => {
            await cleanDb();
            await forFeatureX();
            await createJonasSchneider();
            await createProject2()
            await createDatNamespace(DatNamespaceMock.NAMESPACE_2);
            query = { pkProject: project.pk_entity ?? -1 }
        })

        //AUTHORIZATION

        it('AUTH: should reject the request because the user is not authenticated', async () => {
            const res = await client.post('/unmap-column').send();
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Authorization header not found." });
        })

        it('AUTH: should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.post('/unmap-column').set('Authorization', randomJWT).query(query);
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Error verifying token : invalid signature" });
        })

        it('AUTH: should reject the request because the user is not in the namespace', async () => {
            const x = await client.post('/login').send({ email: PubAccountMock.JONAS.email, password: PubCredentialMock.JONAS_PASSWORD.password })
            const jwt = x.body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceOUT.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1 });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        it('AUTH: should reject the request: the namespace is wrong', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceOUT.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1 });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        })

        // MISSING PARAMETERS

        it('MISS-PARAM: should reject the request: the namespace is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column').set('Authorization', jwt).send({});
            expect(res.body.error).to.containEql({ statusCode: 400, code: "MISSING_REQUIRED_PARAMETER" });
        })

        it('MISS-PARAM: should reject the request: the pkEntity is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({});
            expect(res.body.error.details[0]).to.containEql({ message: "should have required property \'pkColumn\'" });
        })

        // CORE

        it('CORE: should reject the request: the pkEntity does not exists', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: 9998 });
            expect(res.body.error).to.containEql({ message: "The mapping does not exists" });
        })

        it('CORE: should reject the request: the column has cells that are matched with entities', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_NAMES.pk_entity });
            expect(res.body.error).to.containEql({ message: 'Can not delete the mapping, the column has cells that are matched with entities (1 matchings)' });
        })

        it('CORE: should accept the request: the column has cells that are matched with entities, but force deletion', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_NAMES.pk_entity, deleteAll: true });
            expect(res.body.negative.dat.class_column_mapping[0].pk_entity).to.be.equal(DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON.pk_entity);
            expect(res.body.negative.inf.statement[0].pk_entity).to.be.equal(InfStatementMock.CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF.pkEntity);
            expect(res.body.negative.dat.class_column_mapping[0].pk_entity).to.be.equal(5056); // the pkEntity of the inf_proj_rel of the statement
        })

        it('CORE: should accept the request: column mapping has been removed', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_BIRTHDATES.pk_entity });
            expect(res.body.negative.dat.class_column_mapping[0].pk_entity).to.be.equal(DatClassColumnMappingMock.MAPPING_COL_BIRTHDATE_TO_CLASS_TIMEPRIMITIVE.pk_entity);
        })

    })


    describe('POST /unmap-column-check', async () => {
        const project = ProProjectMock.SANDBOX_PROJECT;
        const accountInProject: PubAccount = PubAccountMock.GAETAN_VERIFIED
        const pwdInProject = PubCredentialMock.GAETAN_PASSWORD.password;
        const namespaceInProject = DatNamespaceMock.SANDBOX_NAMESPACE

        const namespaceOUT = DatNamespaceMock.NAMESPACE_2

        let query: { pkProject: number };

        beforeEach(async () => {
            await cleanDb();
            await forFeatureX();
            await createJonasSchneider();
            await createProject2()
            await createDatNamespace(DatNamespaceMock.NAMESPACE_2);
            query = { pkProject: project.pk_entity ?? -1 }
        })

        //AUTHORIZATION

        it('AUTH: should reject the request because the user is not authenticated', async () => {
            const res = await client.post('/unmap-column-check').send();
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Authorization header not found." });
        })

        it('AUTH: should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.post('/unmap-column-check').set('Authorization', randomJWT).query(query);
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Error verifying token : invalid signature" });
        })

        it('AUTH: should reject the request because the user is not in the namespace', async () => {
            const x = await client.post('/login').send({ email: PubAccountMock.JONAS.email, password: PubCredentialMock.JONAS_PASSWORD.password })
            const jwt = x.body.lb4Token;
            const res = await client.post('/unmap-column-check?' + qs.stringify({ pkNamespace: namespaceOUT.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1 });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        it('AUTH: should reject the request: the namespace is wrong', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column-check?' + qs.stringify({ pkNamespace: namespaceOUT.pk_entity })).set('Authorization', jwt).send({ pkColumn: -1 });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        })

        // MISSING PARAMETERS

        it('MISS-PARAM: should reject the request: the namespace is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column-check').set('Authorization', jwt).send({});
            expect(res.body.error).to.containEql({ statusCode: 400, code: "MISSING_REQUIRED_PARAMETER" });
        })

        it('MISS-PARAM: should reject the request: the pkEntity is absent', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column-check?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({});
            expect(res.body.error.details[0]).to.containEql({ message: "should have required property \'pkColumn\'" });
        })

        // CORE

        it('CORE: should reject the request: the pkEntity does not exists', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column-check?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: 9998 });
            expect(res.body.error).to.containEql({ message: "The mapping does not exists" });
        })

        it('CORE: should accept the request: the columns has matching', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdInProject })).body.lb4Token;
            const res = await client.post('/unmap-column-check?' + qs.stringify({ pkNamespace: namespaceInProject.pk_entity })).set('Authorization', jwt).send({ pkColumn: DatColumnMock.COL_NAMES.pk_entity, deleteAll: true });
            expect(res.body.ok).to.be.false();
            expect(res.body.matchingNb).to.be.a.Number();
        })


    })




    describe('GET /get-columns-of-table', () => {
        const pwd = PubCredentialMock.GAETAN_PASSWORD.password;
        const project = ProProjectMock.SANDBOX_PROJECT;
        const accountInProject: PubAccount = PubAccountMock.GAETAN_VERIFIED
        const digital = DatDigitalMock.DIGITAL_BIRTHDATES
        // const namespace = DatNamespaceMock.SANDBOX_NAMESPACE

        let query: { pkProject: number, pkDigital: number };

        beforeEach(async () => {
            await cleanDb();
            await forFeatureX();
            await createJonasSchneider();
            query = {
                pkProject: project.pk_entity ?? -1,
                pkDigital: digital.pk_entity ?? -1
            }
        })
        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.get('/get-columns-of-table').send();
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Authorization header not found." });
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.get('/get-columns-of-table').set('Authorization', randomJWT).query(query);
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Error verifying token : invalid signature" });
        })

        it('should reject the request because the user is not in the project', async () => {
            const x = await client.post('/login').send({ email: PubAccountMock.JONAS.email, password: PubCredentialMock.JONAS_PASSWORD.password })
            const jwt = x.body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).query(query);
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        it('should reject the request because the query params are empty', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).send({});
            expect(res.body.error).to.containEql({ statusCode: 400, code: "MISSING_REQUIRED_PARAMETER" });
        });

        it('should reject the request because query params are not in right format', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).send({ foo: 'bar' });
            expect(res.body.error).to.containEql({ statusCode: 400, code: "MISSING_REQUIRED_PARAMETER" });
        });

        it('should return a valid object', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwd })).body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).query(query);
            const expected: GvPositiveSchemaObject = {
                dat: {
                    column: [
                        DatColumnMock.COL_NAMES.toObject(),
                        DatColumnMock.COL_BIRTHDATES.toObject()
                    ],
                    class_column_mapping: [
                        DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON.toObject()
                    ],
                    text_property: [
                        {
                            string: 'Name',
                            fk_entity: 3000,
                            pk_entity: 5000,
                            quill_doc: {
                                ops: [
                                    { insert: 'N', attributes: { charid: '1' } },
                                    { insert: 'a', attributes: { charid: '2' } },
                                    { insert: 'm', attributes: { charid: '3' } },
                                    { insert: 'e', attributes: { charid: '4' } },
                                    { insert: '\n', attributes: { blockid: '5' } }
                                ],
                                latestId: 5
                            },
                            fk_language: 18889,
                            fk_namespace: 1001,
                            fk_system_type: 3295
                        }, {
                            string: 'Birthdate',
                            fk_entity: 3001,
                            pk_entity: 5001,
                            quill_doc: {
                                ops: [
                                    { insert: 'B', attributes: { charid: '1' } },
                                    { insert: 'i', attributes: { charid: '2' } },
                                    { insert: 'r', attributes: { charid: '3' } },
                                    { insert: 't', attributes: { charid: '4' } },
                                    { insert: 'h', attributes: { charid: '5' } },
                                    { insert: 'd', attributes: { charid: '6' } },
                                    { insert: 'a', attributes: { charid: '7' } },
                                    { insert: 't', attributes: { charid: '8' } },
                                    { insert: 'e', attributes: { charid: '9' } },
                                    { insert: '\n', attributes: { blockid: '10' } }
                                ],
                                latestId: 10
                            },
                            fk_language: 18889,
                            fk_namespace: 1001,
                            fk_system_type: 3295
                        }
                    ]
                }
            }
            expect(res.body).to.deepEqual(expected);
        })

    });

    describe('GET /get-table-page', () => {
        let query: { pkProject: number, pkEntity: number };
        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX()
            } catch (e) {
                console.log(e);
            }
        })

        it('should return a valid object for table with class column mapping', async () => {
            query = {
                pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity ?? -1,
                pkEntity: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity ?? -1
            }
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
                filters: {},
                columns: []
            }
            const res = await client
                .post('/get-table-page')
                .set('Authorization', jwt)
                .query(query)
                .send(options)
            const expected = {
                "columns": ["3000", "3001"],
                "rows": [{
                    "3000": { "string_value": "Rudolf of Habsbourg", "numeric_value": null, "pk_cell": 2002 },
                    "3001": { "string_value": null, "numeric_value": 1218, "pk_cell": 2003 },
                    "pk_row": 1000
                }, {
                    "3000": { "string_value": "Albert IV", "numeric_value": null, "pk_cell": 2000 },
                    "3001": { "string_value": null, "numeric_value": 1180, "pk_cell": 2001 },
                    "pk_row": 1001
                }],
                "length": 2,
                "schemaObject": {
                    "inf": { "statement": [{ "pk_entity": 3022, "fk_property": 1334, "fk_object_data": 0, "fk_object_info": 2005, "fk_subject_data": 0, "fk_subject_info": 0, "is_in_project_count": 1, "fk_object_tables_row": 0, "fk_object_tables_cell": 0, "fk_subject_tables_row": 0, "fk_subject_tables_cell": 2002, "fk_property_of_property": 0, "is_standard_in_project_count": 0 }] },
                    "pro": { "info_proj_rel": [{ "fk_entity": 3022, "pk_entity": 5056, "fk_project": 375232, "is_in_project": true, "fk_last_modifier": 1001 }] }
                }
            }
            expect(res.body).to.containDeep(expected);
        })


        it('should return a valid object for table without class column mapping', async () => {
            query = {
                pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity ?? -1,
                pkEntity: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity ?? -1
            }
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
                filters: {},
                columns: []
            }
            const res = await client
                .post('/get-table-page')
                .set('Authorization', jwt)
                .query(query)
                .send(options)
            // const expected = {
            //     "columns": ["3002", "3003"],
            //     "rows": [{
            //         "3002": { "string_value": null, "numeric_value": 0, "pk_cell": 2004 },
            //         "3003": { "string_value": null, "numeric_value": 0.7870950473021305, "pk_cell": 2005 },
            //         "pk_row": 1002
            //     }, {
            //         "3002": { "string_value": null, "numeric_value": 0.605658563450139, "pk_cell": 2006 },
            //         "3003": { "string_value": null, "numeric_value": 0.6616414762429768, "pk_cell": 2007 },
            //         "pk_row": 1003
            //     }],
            //     "length": 2,
            //     "schemaObject": {
            //         "inf": { "statement": [] },
            //         "pro": { "info_proj_rel": [] }
            //     }
            // }
            expect(res.body.columns).to.be.an.Array();
            expect(res.body.columns[0]).to.be.equal('3002');
            expect(res.body.columns[1]).to.be.equal('3003');
            expect(res.body.rows[0]['3002'].string_value).to.be.null();
            expect(res.body.rows[0]['3003'].string_value).to.be.null();
            expect(res.body.rows[0]['3002'].numeric_value).to.be.a.Number();
            expect(res.body.rows[0]['3003'].numeric_value).to.be.a.Number();
            expect(res.body.rows[0]['3002'].pk_cell).to.be.equal(2004);
            expect(res.body.rows[0]['3003'].pk_cell).to.be.equal(2005);
            expect(res.body.rows[0]['pk_row']).to.be.equal(1002);
            expect(res.body.rows[1]['3002'].string_value).to.be.null();
            expect(res.body.rows[1]['3003'].string_value).to.be.null();
            expect(res.body.rows[1]['3002'].numeric_value).to.be.a.Number();
            expect(res.body.rows[1]['3003'].numeric_value).to.be.a.Number();
            expect(res.body.rows[1]['3002'].pk_cell).to.be.equal(2006);
            expect(res.body.rows[1]['3003'].pk_cell).to.be.equal(2007);
            expect(res.body.rows[1]['pk_row']).to.be.equal(1003);
            expect(res.body.length).to.be.equal(2);
        })
    })
});
