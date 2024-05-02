import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../application';
import {TestDbFactory} from '../../helpers/TestDbFactory';
import {DatColumnMock} from '../../helpers/data/gvDB/DatColumnMock';
import {DatDigitalMock} from '../../helpers/data/gvDB/DatDigitalMock';
import {InfResourceMock} from '../../helpers/data/gvDB/InfResourceMock';
import {ProProjectMock} from '../../helpers/data/gvDB/ProProjectMock';
import {PubAccountMock} from '../../helpers/data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../../helpers/data/gvDB/PubCredentialMock';
import {createJonasSchneider} from '../../helpers/graphs/account.helper';
import {forFeatureX} from '../../helpers/graphs/feature-X.helper';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';


describe('FactoidController', () => {
    let server: GeovistoryApplication;
    let client: Client;

    before(async () => {({server, client} = await setupApplication());});
    after(async () => {await server.stop();});

    describe('GET /get-factoids-from-entity', () => {
        const accountInProject = PubAccountMock.GAETAN_VERIFIED
        const pwdIn = PubCredentialMock.GAETAN_PASSWORD.password;
        const accountOutOfProject = PubAccountMock.JONAS;
        const pwdOut = PubCredentialMock.JONAS_PASSWORD.password;

        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX();
                await createJonasSchneider();
            } catch (e) {
                console.log(e);
            }
        })

        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.get('/get-factoids-from-entity').query({pkEntity: InfResourceMock.ALBERT_IV.pk_entity});
            expect(res.body.error).to.containEql({statusCode: 401, message: "Authorization header not found."});
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.get('/get-factoids-from-entity').set('Authorization', randomJWT).query({pkEntity: InfResourceMock.ALBERT_IV.pk_entity});
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
        })

        it('should reject the request because the user is not in the project', async () => {
            const jwt = (await client.post('/login').send({email: accountOutOfProject.email, password: pwdOut})).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({pkProject: ProProjectMock.PROJECT_1.pk_entity, pkEntity: InfResourceMock.ALBERT_IV.pk_entity, factoidNumber: 0, page: 0});
            expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        });

        it('should reject the request because pkProject neither pkEntity is not provided', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt);
            expect(res.body.error).to.containEql({message: "Required parameter pkProject is missing!"});
        });

        it('should reject the request because pkProject is not provided', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt).query({pkEntity: InfResourceMock.RUDOLF.pk_entity});
            expect(res.body.error).to.containEql({message: "Required parameter pkProject is missing!"});
        });

        it('should reject the request because pkEntity is not provided', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity});
            expect(res.body.error).to.containEql({message: "Required parameter pkEntity is missing!"});
        });

        it('should return an empty array, because albert has no factoid', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfResourceMock.ALBERT_IV.pk_entity, factoidNumber: 10, page: 0});
            expect(res.body).to.containEql({pkEntity: InfResourceMock.ALBERT_IV.pk_entity + '', factoidEntities: [], totalLength: '0'});
        });

        it('should return an array of factoids', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfResourceMock.RUDOLF.pk_entity, factoidNumber: 10, page: 0});

            expect(res.body.pkEntity).to.be.equal(InfResourceMock.RUDOLF.pk_entity + '');
            expect(res.body.factoidEntities[0].pkClass).to.be.equal(61);
            expect(res.body.factoidEntities[0].pkRow).to.be.equal(1000);
            expect(res.body.factoidEntities[0].pkFactoidMapping).to.be.equal(7000);
            expect(res.body.factoidEntities[0].headerStatements.length).to.be.equal(1);
            expect(res.body.factoidEntities[0].headerStatements[0].fkProperty).to.be.equal(86);
            expect(res.body.factoidEntities[0].headerStatements[0].isOutgoing).to.be.equal(true);
            expect(res.body.factoidEntities[0].headerStatements[0].value).to.be.equal('Rudolf of Habsbourg');
            expect(res.body.factoidEntities[0].headerStatements[0].pkEntity).to.be.equal(2005);
            expect(res.body.factoidEntities[0].headerStatements[0].pkCell).to.be.equal(2002);
            expect(res.body.factoidEntities[0].bodyStatements.length).to.be.equal(1);
            expect(res.body.factoidEntities[0].bodyStatements[0].fkProperty).to.be.equal(152);
            expect(res.body.factoidEntities[0].bodyStatements[0].isOutgoing).to.be.equal(true);
            expect(res.body.factoidEntities[0].bodyStatements[0].value).to.be.equal('1218');
            expect(res.body.factoidEntities[0].bodyStatements[0].pkEntity).to.be.equal(null);
            expect(res.body.factoidEntities[0].bodyStatements[0].pkCell).to.be.equal(2003);

        });


        //TODO: Add all tests concerning pagination (param: factoidNumber + param: page)

    });

    describe('POST /set-factoid-mapping', () => {
        const path = '/set-factoid-mapping'
        const accountInProject = PubAccountMock.GAETAN_VERIFIED
        const pwdIn = PubCredentialMock.GAETAN_PASSWORD.password;
        const accountOutOfProject = PubAccountMock.JONAS;
        const pwdOut = PubCredentialMock.JONAS_PASSWORD.password;

        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX();
                await createJonasSchneider();
            } catch (e) {
                console.log(e);
            }
        })

        const FMs1 = {
            pkTable: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
            mappings: [{
                pkDigital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
                pkClass: 21, // person
                title: 'Person 1 in the union',
                comment: 'this is the person 1',
                properties: [{
                    pkProperty: 1111,
                    isOutgoing: false,
                    pkColumn: DatColumnMock.COL_NAMES.pk_entity,
                    comment: "Appellation",
                    default: {appellation: {string: 'Default person name', fk_class: 40}}
                }]
            }, {
                pkDigital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
                pkClass: 633, // union
                title: 'Person 1 in the union',
                comment: 'this is the person 1',
                properties: [{
                    pkProperty: 1436, //has partner
                    isOutgoing: true,
                    pkColumn: DatColumnMock.COL_NAMES.pk_entity,
                    comment: "Union - has partner 1",
                    default: {resource: {pk_entity: InfResourceMock.ALBERT_IV.pk_entity}}
                }, {
                    pkProperty: 1436, //has partner
                    isOutgoing: true,
                    pkColumn: DatColumnMock.COL_PEOPLE.pk_entity,
                    comment: "Union - has partner 2",
                    default: {resource: {pk_entity: InfResourceMock.RUDOLF.pk_entity}}
                }]
            }]
        }

        const FMs2 = {
            pkTable: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
            mappings: [{
                pkDigital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
                pkClass: 21, // person
                title: 'Person 1 in the union',
                comment: 'this is the person 1',
                properties: [{
                    pkEntity: 0,
                    pkProperty: 1111,
                    isOutgoing: false,
                    pkColumn: DatColumnMock.COL_NAMES.pk_entity,
                    comment: "Appellation",
                    default: {appellation: {string: 'Default person name', fk_class: 40}}
                }]
            }, {
                pkEntity: 0,
                pkDigital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
                pkClass: 633, // union
                title: 'Person 1 in the union',
                comment: 'this is the person 1',
                properties: [{
                    pkEntity: 0,
                    pkProperty: 1436, //has partner
                    isOutgoing: true,
                    pkColumn: DatColumnMock.COL_RND1.pk_entity,
                    comment: "Union - has partner 1",
                    default: {resource: {pk_entity: InfResourceMock.ALBERT_IV.pk_entity}}
                }, {
                    pkEntity: 0,
                    pkProperty: 1435, //stemmed from
                    isOutgoing: false,
                    pkColumn: DatColumnMock.COL_PEOPLE.pk_entity,
                    comment: "Union - stemmed from (resulted in)",
                    default: {resource: {pk_entity: InfResourceMock.ALBERT_IV.pk_entity}}
                }]
            }]
        }

        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.post(path).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send(FMs1);
            expect(res.body.error).to.containEql({statusCode: 401, message: "Authorization header not found."});
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.post(path).set('Authorization', randomJWT).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send(FMs1);
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
        })

        it('should reject the request because the user is not in the project', async () => {
            const jwt = (await client.post('/login').send({email: accountOutOfProject.email, password: pwdOut})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send(FMs1);
            expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        });

        it('should reject the request because the body param is absent', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send();
            expect(res.body.error).to.containEql({message: "Request body is required"});
        });

        it('should reject the request because the query param (project) is absent', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkTable: FMs1.pkTable}).send(FMs1);
            expect(res.body.error).to.containEql({message: "Required parameter pkProject is missing!"});
        });

        it('should reject the request because the query param (table) is absent', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity}).send(FMs1);
            expect(res.body.error).to.containEql({message: "Required parameter pkTable is missing!"});
        });

        it('should reject the request because it is an unknown table', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: 999999}).send(FMs1);
            expect(res.body.error.message).to.equal('The table does not exists')
        });

        it('The factoid mapping should be correctly saved in data.factoid_mapping', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send(FMs1);

            const result = await TestDbFactory.datasource.execute("SELECT * FROM data.factoid_mapping WHERE fk_digital = " + FMs1.pkTable);
            expect(result[0].pk_entity).to.be.equal(res.body.mappings[0].pkEntity)
            expect(result[0].fk_digital).to.be.equal(FMs1.mappings[0].pkDigital)
            expect(result[0].fk_class).to.be.equal(FMs1.mappings[0].pkClass)
            expect(result[0].title).to.be.equal(FMs1.mappings[0].title)
            expect(result[0].comment).to.be.equal(FMs1.mappings[0].comment)
            expect(result[1].pk_entity).to.be.equal(res.body.mappings[1].pkEntity)
            expect(result[1].fk_digital).to.be.equal(FMs1.mappings[1].pkDigital)
            expect(result[1].fk_class).to.be.equal(FMs1.mappings[1].pkClass)
            expect(result[1].title).to.be.equal(FMs1.mappings[1].title)
            expect(result[1].comment).to.be.equal(FMs1.mappings[1].comment)

        });

        it('The factoid property mapping should be correctly saved in data.factoid_property_mapping (all created)', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send(FMs1);

            const result1 = await TestDbFactory.datasource.execute("SELECT * FROM data.factoid_property_mapping WHERE fk_factoid_mapping = " + res.body.mappings[0].pkEntity);
            expect(result1[0].fk_property).to.equal(FMs1.mappings[0].properties[0].pkProperty)
            expect(result1[0].fk_column).to.equal(FMs1.mappings[0].properties[0].pkColumn)
            expect(result1[0].fk_factoid_mapping).to.equal(res.body.mappings[0].pkEntity)
            expect(result1[0].is_outgoing).to.equal(FMs1.mappings[0].properties[0].isOutgoing)
            expect(result1[0].comment).to.equal(FMs1.mappings[0].properties[0].comment)
            const result2 = await TestDbFactory.datasource.execute("SELECT * FROM data.factoid_property_mapping WHERE fk_factoid_mapping = " + res.body.mappings[1].pkEntity);
            expect(result2[0].fk_property).to.equal(FMs1.mappings[1].properties[0].pkProperty)
            expect(result2[0].fk_column).to.equal(FMs1.mappings[1].properties[0].pkColumn)
            expect(result2[0].fk_factoid_mapping).to.equal(res.body.mappings[1].pkEntity)
            expect(result2[0].is_outgoing).to.equal(FMs1.mappings[1].properties[0].isOutgoing)
            expect(result2[0].comment).to.equal(FMs1.mappings[1].properties[0].comment)
            expect(result2[1].fk_property).to.equal(FMs1.mappings[1].properties[1].pkProperty)
            expect(result2[1].fk_column).to.equal(FMs1.mappings[1].properties[1].pkColumn)
            expect(result2[1].fk_factoid_mapping).to.equal(res.body.mappings[1].pkEntity)
            expect(result2[1].is_outgoing).to.equal(FMs1.mappings[1].properties[1].isOutgoing)
            expect(result2[1].comment).to.equal(FMs1.mappings[1].properties[1].comment)

        });

        it('The factoid property mapping should be correctly saved in data.factoid_property_mapping (created, updated, deleted, not touched)', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res1 = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs1.pkTable}).send(FMs1);

            FMs2.mappings[1].pkEntity = res1.body.mappings[1].pkEntity;
            FMs2.mappings[1].properties[0].pkEntity = res1.body.mappings[1].properties[0].pkEntity;

            const res2 = await client.post(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs2.pkTable}).send(FMs2);

            const result1 = await TestDbFactory.datasource.execute("SELECT * FROM data.factoid_property_mapping WHERE fk_factoid_mapping = " + res2.body.mappings[0].pkEntity);
            expect(result1[0].fk_property).to.equal(FMs2.mappings[0].properties[0].pkProperty)
            expect(result1[0].fk_column).to.equal(FMs2.mappings[0].properties[0].pkColumn)
            expect(result1[0].fk_factoid_mapping).to.equal(res2.body.mappings[0].pkEntity)
            expect(result1[0].is_outgoing).to.equal(FMs2.mappings[0].properties[0].isOutgoing)
            expect(result1[0].comment).to.equal(FMs2.mappings[0].properties[0].comment)
            const result2 = await TestDbFactory.datasource.execute("SELECT * FROM data.factoid_property_mapping WHERE fk_factoid_mapping = " + res1.body.mappings[1].pkEntity);
            expect(result2[0].pk_entity).to.equal(res1.body.mappings[1].properties[0].pkEntity)
            expect(result2[0].fk_property).to.equal(FMs2.mappings[1].properties[0].pkProperty)
            expect(result2[0].fk_column).to.equal(FMs2.mappings[1].properties[0].pkColumn)
            expect(result2[0].fk_factoid_mapping).to.equal(res2.body.mappings[1].pkEntity)
            expect(result2[0].is_outgoing).to.equal(FMs2.mappings[1].properties[0].isOutgoing)
            expect(result2[0].comment).to.equal(FMs2.mappings[1].properties[0].comment)
            expect(result2[1].fk_property).to.equal(FMs2.mappings[1].properties[1].pkProperty)
            expect(result2[1].fk_column).to.equal(FMs2.mappings[1].properties[1].pkColumn)
            expect(result2[1].fk_factoid_mapping).to.equal(res2.body.mappings[1].pkEntity)
            expect(result2[1].is_outgoing).to.equal(FMs2.mappings[1].properties[1].isOutgoing)
            expect(result2[1].comment).to.equal(FMs2.mappings[1].properties[1].comment)
        });
    });

    describe('GET /get-factoid-mapping', () => {
        const path = '/get-factoid-mapping'
        const accountInProject = PubAccountMock.GAETAN_VERIFIED
        const pwdIn = PubCredentialMock.GAETAN_PASSWORD.password;
        const accountOutOfProject = PubAccountMock.JONAS;
        const pwdOut = PubCredentialMock.JONAS_PASSWORD.password;

        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX();
                await createJonasSchneider();
            } catch (e) {
                console.log(e);
            }
        })

        const FMs = {
            pkTable: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
            mappings: [{
                pkDigital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
                pkClass: 21, // person
                title: 'Person 1 in the union',
                comment: 'this is the person 1',
                properties: [{
                    pkProperty: 1111,
                    isOutgoing: false,
                    pkColumn: DatColumnMock.COL_NAMES.pk_entity,
                    comment: "Appellation",
                    default: {appellation: {string: 'Default person name', fk_class: 40}}
                }]
            }, {
                pkDigital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
                pkClass: 633, // union
                title: 'Person 1 in the union',
                comment: 'this is the person 1',
                properties: [{
                    pkProperty: 1436, //has partner
                    isOutgoing: true,
                    pkColumn: DatColumnMock.COL_NAMES.pk_entity,
                    comment: "Union - has partner 1",
                    default: {resource: {pk_entity: InfResourceMock.ALBERT_IV.pk_entity}}
                }, {
                    pkProperty: 1436, //has partner
                    isOutgoing: true,
                    pkColumn: DatColumnMock.COL_PEOPLE.pk_entity,
                    comment: "Union - has partner 2",
                    default: {resource: {pk_entity: InfResourceMock.RUDOLF.pk_entity}}
                }]
            }]
        }

        it('should reject the request because the user is not authenticated', async () => {
            const res = await client.get(path).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable});
            expect(res.body.error).to.containEql({statusCode: 401, message: "Authorization header not found."});
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.get(path).set('Authorization', randomJWT).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable});
            expect(res.body.error).to.containEql({statusCode: 401, message: "Error verifying token : invalid signature"});
        })

        it('should reject the request because the user is not in the project', async () => {
            const jwt = (await client.post('/login').send({email: accountOutOfProject.email, password: pwdOut})).body.lb4Token;
            const res = await client.get(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable});
            expect(res.body.error).to.containEql({statusCode: 403, message: "Access denied"});
        });

        it('should reject the request because the query param pkProject is absent', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get(path).set('Authorization', jwt).query({pkTable: FMs.pkTable});
            expect(res.body.error).to.containEql({message: "Required parameter pkProject is missing!"});
        });

        it('should reject the request because the query param pkTable is absent', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity});
            expect(res.body.error).to.containEql({message: "Required parameter pkTable is missing!"});
        });

        it('should reject the request because it is an unknown table', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            const res = await client.get(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: 999999});
            expect(res.body.error.message).to.equal('The table does not exists')
        });

        it('Nothing should be fetched (does not exist on the table)', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            //because featureX helper create a factoid, and the /set-factoid-mapping is already tested (we know it works correctly) we first remove all
            await client.post('/set-factoid-mapping').set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable}).send({pkTable: FMs.pkTable, mappings: []});
            const res = await client.get(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable});
            expect(res.body).deepEqual({pkTable: FMs.pkTable, mappings: []})
        });

        it('The Factoid mapping should correctly be fetched', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwdIn})).body.lb4Token;
            await client.post('/set-factoid-mapping').set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable}).send(FMs);
            const res = await client.get(path).set('Authorization', jwt).query({pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkTable: FMs.pkTable});

            expect(res.body.pkTable).to.equal(FMs.pkTable)
            expect(res.body.mappings[0].pkDigital).to.equal(FMs.pkTable)
            expect(res.body.mappings[0].pkClass).to.equal(FMs.mappings[0].pkClass)
            expect(res.body.mappings[0].title).to.equal(FMs.mappings[0].title)
            expect(res.body.mappings[0].comment).to.equal(FMs.mappings[0].comment)
            expect(res.body.mappings[0].properties[0].pkProperty).to.equal(FMs.mappings[0].properties[0].pkProperty)
            expect(res.body.mappings[0].properties[0].isOutgoing).to.equal(FMs.mappings[0].properties[0].isOutgoing)
            expect(res.body.mappings[0].properties[0].pkColumn).to.equal(FMs.mappings[0].properties[0].pkColumn)
            expect(res.body.mappings[0].properties[0].comment).to.equal(FMs.mappings[0].properties[0].comment)
            expect(res.body.mappings[1].pkDigital).to.equal(FMs.pkTable)
            expect(res.body.mappings[1].pkClass).to.equal(FMs.mappings[1].pkClass)
            expect(res.body.mappings[1].title).to.equal(FMs.mappings[1].title)
            expect(res.body.mappings[1].comment).to.equal(FMs.mappings[1].comment)
            expect(res.body.mappings[1].properties[0].pkProperty).to.equal(FMs.mappings[1].properties[0].pkProperty)
            expect(res.body.mappings[1].properties[0].isOutgoing).to.equal(FMs.mappings[1].properties[0].isOutgoing)
            expect(res.body.mappings[1].properties[0].pkColumn).to.equal(FMs.mappings[1].properties[0].pkColumn)
            expect(res.body.mappings[1].properties[0].comment).to.equal(FMs.mappings[1].properties[0].comment)
            expect(res.body.mappings[1].properties[1].pkProperty).to.equal(FMs.mappings[1].properties[1].pkProperty)
            expect(res.body.mappings[1].properties[1].isOutgoing).to.equal(FMs.mappings[1].properties[1].isOutgoing)
            expect(res.body.mappings[1].properties[1].pkColumn).to.equal(FMs.mappings[1].properties[1].pkColumn)
            expect(res.body.mappings[1].properties[1].comment).to.equal(FMs.mappings[1].properties[1].comment)
        });

    });

});
