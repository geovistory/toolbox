/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import qs from 'qs';
import {init} from 'ramda';
import {GetTablePageOptions, SortDirection, TablePageResponse, TableCell} from '../../../components/query/q-table-page';
import {PubAccount} from '../../../models';
import {GvSchemaObject} from '../../../models/gv-schema-object.model';
import {GeovistoryServer} from '../../../server';
import {createDatNamespace} from '../../helpers/atomic/dat-namespace.helper';
import {cleanDb} from '../../helpers/cleaning/clean-db.helper';
import {DatDigitalMock} from '../../helpers/data/gvDB/DatDigitalMock';
import {DatNamespaceMock} from '../../helpers/data/gvDB/DatNamespaceMock';
import {ProProjectMock} from '../../helpers/data/gvDB/ProProjectMock';
import {PubAccountMock} from '../../helpers/data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../../helpers/data/gvDB/PubCredentialMock';
import {forFeatureX} from '../../helpers/graphs/feature-X.helper';
import {createRawProject} from '../../helpers/graphs/project.helpers';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {DatColumnMock} from '../../helpers/data/gvDB/DatColumnMock';
import {DatClassColumnMappingMock} from '../../helpers/data/gvDB/DatClassColumnMappingMock';
import {TabCellXMock} from '../../helpers/data/gvDB/TabCellXMock';
import {InfStatementMock} from '../../helpers/data/gvDB/InfStatementMock';


describe('TableController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {({server, client} = await setupApplication());});
    after(async () => {await server.stop();});

    describe('GET /get-columns-of-table', () => {
        const pwd = PubCredentialMock.GAETAN_PASSWORD.password;
        const project = ProProjectMock.SANDBOX_PROJECT;
        const accountInProject: PubAccount = PubAccountMock.GAETAN_VERIFIED
        const accountOutOfProject: PubAccount = PubAccountMock.JONAS
        const digital = DatDigitalMock.DIGITAL_BIRTHDATES
        // const namespace = DatNamespaceMock.SANDBOX_NAMESPACE

        let query: {pkProject: number, pkDigital: number};

        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX()
                query = {
                    pkProject: project.pk_entity ?? -1,
                    pkDigital: digital.pk_entity ?? -1
                }

            } catch (e) {
                console.log(e);
            }
        })
        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.get('/get-columns-of-table').send();
            expect(res.body.error).to.containEql({statusCode: 401, message: "Authorization header not found."});
        })

        // it('should reject the request because the authorization header is wrong', async () => {
        //     const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
        //     const res = await client.get('/get-columns-of-table').set('Authorization', randomJWT).query(query);
        //     expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
        // })

        // it('should reject the request because the user is not in the project', async () => {
        //     const x = await client.post('/login').send({email: accountOutOfProject.email, password: pwd})
        //     const jwt = x.body.lb4Token;
        //     const res = await client.get('/get-columns-of-table').set('Authorization', jwt).query(query);
        //     expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        // });

        // it('should reject the request because the namespace is not linked to the project', async () => {
        //     const wrongNamespace = await createDatNamespace(await createRawProject('English'));
        //     const params = {pkNamespace: wrongNamespace.pk_entity}
        //     const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
        //     const res = await client.get('/get-columns-of-table?' + qs.stringify(params)).set('Authorization', jwt).query(query);
        //     expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        // });

        // it('should reject the request because the query params are empty', async () => {
        //     const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
        //     const res = await client.get('/get-columns-of-table').set('Authorization', jwt).send({});
        //     expect(res.body.error).to.containEql({statusCode: 400, code: "MISSING_REQUIRED_PARAMETER"});
        // });

        // it('should reject the request because query params are not in right format', async () => {
        //     const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
        //     const res = await client.get('/get-columns-of-table').set('Authorization', jwt).send({foo: 'bar'});
        //     expect(res.body.error).to.containEql({statusCode: 400, code: "MISSING_REQUIRED_PARAMETER"});
        // });

        it('should return a valid object', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.get('/get-columns-of-table').set('Authorization', jwt).query(query);
            const expected: GvSchemaObject = {
                dat: {
                    column: [
                        DatColumnMock.COL_NAMES.toObject(),
                        DatColumnMock.COL_DATES.toObject()
                    ],
                    class_column_mapping: [
                        DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON.toObject()
                    ]
                }
            }
            expect(res.body).to.deepEqual(expected);
        })
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
            const col1 = (DatColumnMock.COL_NAMES.pk_entity ?? -1).toString()
            const col2 = (DatColumnMock.COL_DATES.pk_entity ?? -1).toString()
            const expected: Partial<TablePageResponse> = {
                columns: [
                    col1,
                    col2
                ],
                length: 2,
                rows: [
                    {
                        [col1]: {string_value: 'Albert IV'} as TableCell,
                        [col2]: {string_value: '1180'} as TableCell
                    },
                    {
                        [col1]: {string_value: 'Rudolf of Habsbourg'} as TableCell,
                        [col2]: {string_value: '1218'} as TableCell,
                    }
                ],
                schemaObject: {
                    inf: {
                        statement: [
                            InfStatementMock.CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF
                        ]
                    }
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
            const col1 = (DatColumnMock.COL_RND1.pk_entity ?? -1).toString()
            const col2 = (DatColumnMock.COL_RND2.pk_entity ?? -1).toString()
            const expected: Partial<TablePageResponse> = {
                columns: [
                    col1,
                    col2
                ],
                length: 2,
                rows: [
                    {
                        [col1]: {numeric_value: TabCellXMock.FEATURE_X_RND_1_1.content} as TableCell,
                        [col2]: {numeric_value: TabCellXMock.FEATURE_X_RND_1_2.content} as TableCell
                    },
                    {
                        [col1]: {numeric_value: TabCellXMock.FEATURE_X_RND_2_1.content} as TableCell,
                        [col2]: {numeric_value: TabCellXMock.FEATURE_X_RND_2_2.content} as TableCell,
                    }
                ],
                schemaObject: {
                    inf: {
                        statement: []
                    }
                }
            }

            expect(res.body).to.containDeep(expected);
        })
    })
});