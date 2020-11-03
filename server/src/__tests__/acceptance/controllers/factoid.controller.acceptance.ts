/* eslint-disable @typescript-eslint/camelcase */
import { Client, expect } from '@loopback/testlab';
import { GeovistoryServer } from '../../../server';
import { cleanDb } from '../../helpers/cleaning/clean-db.helper';
import { DatDigitalMock } from '../../helpers/data/gvDB/DatDigitalMock';
import { DatFactoidMappingMock } from '../../helpers/data/gvDB/DatFactoidMappingMock';
import { DfhApiPropertyMock } from '../../helpers/data/gvDB/DfhApiPropertyMock';
import { InfAppellationMock } from '../../helpers/data/gvDB/InfAppellationMock';
import { InfPersistentItemMock } from '../../helpers/data/gvDB/InfPersistentItemMock';
import { ProProjectMock } from '../../helpers/data/gvDB/ProProjectMock';
import { PubAccountMock } from '../../helpers/data/gvDB/PubAccountMock';
import { PubCredentialMock } from '../../helpers/data/gvDB/PubCredentialMock';
import { TabCellXMock } from '../../helpers/data/gvDB/TabCellXMock';
import { createJonasSchneider } from '../../helpers/graphs/account.helper';
import { forFeatureX } from '../../helpers/graphs/feature-X.helper';
import { setupApplication } from '../../helpers/gv-server-helpers';


describe('FactoidController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => { ({ server, client } = await setupApplication()); });
    after(async () => { await server.stop(); });

    describe('GET /get-factoids-from-entity', () => {
        const accountInProject = PubAccountMock.GAETAN_VERIFIED
        const accountOutOfProject = PubAccountMock.JONAS;
        const pwdIn = PubCredentialMock.GAETAN_PASSWORD.password;
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
                .query({ pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity });
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
                .query({ pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity });
            expect(res.body).to.containEql({ pkEntity: InfPersistentItemMock.ALBERT_IV.pk_entity + '', factoids: [] });
        });

        it('should return an array of factoids', async () => {
            const jwt = (await client.post('/login').send({ email: accountInProject.email, password: pwdIn })).body.lb4Token;
            const res = await client.get('/get-factoids-from-entity').set('Authorization', jwt)
                .query({ pkProject: ProProjectMock.SANDBOX_PROJECT.pk_entity, pkEntity: InfPersistentItemMock.RUDOLF.pk_entity });
            expect(res.body.pkEntity).to.be.equal(InfPersistentItemMock.RUDOLF.pk_entity + '');
            expect(res.body.factoids.length).to.be.equal(2);
            expect(res.body.factoids[0].fkdigital).to.be.equal(DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity);
            expect(res.body.factoids[1].fkdigital).to.be.equal(DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity);
            expect(res.body.factoids[0].fkfactoidmapping).to.be.equal(DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.pk_entity);
            expect(res.body.factoids[1].fkfactoidmapping).to.be.equal(DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.pk_entity);
            expect(res.body.factoids[0].fkclass).to.be.equal(DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.fk_class);
            expect(res.body.factoids[1].fkclass).to.be.equal(DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.fk_class);
            expect(res.body.factoids[0].fkproperty).to.be.equal(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property);
            expect(res.body.factoids[1].fkproperty).to.be.equal(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property);
            expect(res.body.factoids[0].value).to.be.equal(TabCellXMock.FEATURE_X_2_2.numeric_value + '');
            expect(res.body.factoids[1].value).to.be.equal(InfAppellationMock.RUDOLF.string);
        });


    });

});
