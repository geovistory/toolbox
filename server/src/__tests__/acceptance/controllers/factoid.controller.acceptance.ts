/* eslint-disable @typescript-eslint/camelcase */
import { Client, expect } from '@loopback/testlab';
import { GeovistoryServer } from '../../../server';
import { InfPersistentItemMock } from '../../helpers/data/gvDB/InfPersistentItemMock';
import { ProProjectMock } from '../../helpers/data/gvDB/ProProjectMock';
import { PubAccountMock } from '../../helpers/data/gvDB/PubAccountMock';
import { PubCredentialMock } from '../../helpers/data/gvDB/PubCredentialMock';
import { createJonasSchneider } from '../../helpers/graphs/account.helper';
import { forFeatureX } from '../../helpers/graphs/feature-X.helper';
import { setupApplication } from '../../helpers/gv-server-helpers';
import { cleanDb } from '../../helpers/meta/clean-db.helper';


describe('FactoidController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => { ({ server, client } = await setupApplication()); });
    after(async () => { await server.stop(); });

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
            const res = await client.get('/get-factoids-from-entity').query( {pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity });
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Authorization header not found." });
        })

        it('should reject the request because the authorization header is wrong', async () => {
            const randomJWT = 'eyJ0eXAiOiAiand0IiwgImFsZyI6ICJIUzUxMiJ9.eyJuYW1lIjoiV2lraXBlZGlhIiwiaWF0IjoxNTI1Nzc3OTM4fQ.iu0aMCsaepPy6ULphSX5PT32oPvKkM5dPl131knIDq9Cr8OUzzACsuBnpSJ_rE9XkGjmQVawcvyCHLiM4Kr6NA';
            const res = await client.get('/get-factoids-from-entity').set('Authorization', randomJWT).query( {pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity });
            expect(res.body.error).to.containEql({ statusCode: 401, message: "Error verifying token : invalid signature" });
        })

        it('should reject the request because the user is not in the project', async () => {
            const jwt = (await client.post('/login').send({ email: accountOutOfProject.email, password: pwdOut })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({ pkProject: ProProjectMock.PROJECT_1.pk_entity, pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity, factoidNumber:0, page:0 });
            expect(res.body.error).to.containEql({ statusCode: 403, message: "Access denied" });
        });

        it('should reject the request because pkProject neither pkEntity is not provided', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdIn })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt);
            expect(res.body.error).to.containEql({ message: "Required parameter pkProject is missing!" });
        });

        it('should reject the request because pkProject is not provided', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdIn })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt).query({ pkEntity: InfPersistentItemMock.RUDOLF.pk_entity });
            expect(res.body.error).to.containEql({ message: "Required parameter pkProject is missing!" });
        });

        it('should reject the request because pkEntity is not provided', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdIn })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt).query({ pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity });
            expect(res.body.error).to.containEql({ message: "Required parameter pkEntity is missing!" });
        });

        it('should return an empty array, because albert has no factoid', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdIn })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({ pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity, factoidNumber: 10, page: 0 });
            expect(res.body).to.containEql({ pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity + '', factoidEntities: [], totalLength: '0' });
        });

        it('should return an array of factoids', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdIn })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({ pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfPersistentItemMock.RUDOLF.pk_entity, factoidNumber: 10, page: 0 });

            expect(res.body.pkEntity).to.be.equal(InfPersistentItemMock.RUDOLF.pk_entity + '');
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

});
