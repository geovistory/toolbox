/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import {PubAccount} from '../../../models';
import {GeovistoryServer} from '../../../server';
import {cleanDb} from '../../helpers/meta/clean-db.helper';
import {DatChunkMock} from '../../helpers/data/gvDB/DatChunkMock';
import {InfResourceMock} from '../../helpers/data/gvDB/InfResourceMock';
import {InfStatementMock} from '../../helpers/data/gvDB/InfStatementMock';
import {ProProjectMock} from '../../helpers/data/gvDB/ProProjectMock';
import {PubAccountMock} from '../../helpers/data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../../helpers/data/gvDB/PubCredentialMock';
import {TabCellXMock} from '../../helpers/data/gvDB/TabCellXMock';
import {forFeatureX} from '../../helpers/graphs/feature-X.helper';
import {setupApplication} from '../../helpers/gv-server-helpers';


describe('RamListController', () => {
    let server: GeovistoryServer;
    let client: Client;

    before(async () => {({server, client} = await setupApplication());});
    after(async () => {await server.stop();});

    describe('GET /get-ram-list', () => {
        const pwd = PubCredentialMock.GAETAN_PASSWORD.password;
        const project = ProProjectMock.SANDBOX_PROJECT;
        const accountInProject = PubAccountMock.GAETAN_VERIFIED
        const entity = InfResourceMock.RUDOLF

        const cell = TabCellXMock.FEATURE_X_2_1;
        const cellRefersToRudolf = InfStatementMock.CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF
        const tableIsReproOfHabsEmp = InfStatementMock.DIGITAL_BIRTHDATES_IS_REPRODUCTION_OF_HABS_EMP

        const chunk = DatChunkMock.RUDOLF
        const chunkRefersToRudol = InfStatementMock.CHUNK_RUDOLF_REFERS_TO_RUDOLF
        const textIsReproOfHabsEmp = InfStatementMock.DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP

        const habsEmpMentionsRufolf = InfStatementMock.HABS_EMP_EXPR_MENTIONS_RUDOLF

        let query: {pkProject: number, pkEntity: number, fkProperty: number};

        beforeEach(async () => {
            try {
                await cleanDb();
                await forFeatureX()
                query = {
                    pkProject: project.pk_entity ?? -1,
                    pkEntity: entity.pk_entity ?? -1,
                    fkProperty: -1
                }

            } catch (e) {
                console.log(e);
            }
        })


        it('should return a valid object for ramlist where rudolf is refered to by a chunk', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.get('/get-ram-list').set('Authorization', jwt).query(
                {
                    ...query,
                    fkProperty: 1334,
                    refersTo: 'Chunk'
                }
            );

            // the chunk must be present
            expect(res?.body?.dat?.chunk).to.containDeep([
                chunk
            ])
            // the cell must not be present
            expect(res?.body?.tab?.cell).to.not.containDeep([
                cell
            ])
            // these statements must be present
            expect(res?.body?.inf?.statement).to.containDeep([
                chunkRefersToRudol,
                textIsReproOfHabsEmp,
            ]);
            // these statements must not be present
            expect(res?.body?.inf?.statement).to.not.containDeep([
                cellRefersToRudolf,
                tableIsReproOfHabsEmp
            ]);

        })

        it('should return a valid object for ramlist where rudolf is refered to by a cell', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.get('/get-ram-list').set('Authorization', jwt).query(
                {
                    ...query,
                    fkProperty: 1334,
                    refersTo: 'Cell'
                }
            );

            // the cell must be present
            expect(res?.body?.tab?.cell).to.containDeep([
                cell
            ])

            // the chunk must not be present
            expect(res?.body?.dat?.chunk).to.not.containDeep([
                chunk
            ])

            // these statements must be present
            expect(res?.body?.inf?.statement).to.containDeep([
                cellRefersToRudolf,
                tableIsReproOfHabsEmp
            ]);
            // these statements must not be present
            expect(res?.body?.inf?.statement).to.not.containDeep([
                chunkRefersToRudol,
                textIsReproOfHabsEmp
            ]);

        })

        it('should return a valid object for ramlist where rudolf is mentioned in a book', async () => {
            const jwt = (await client.post('/login').send({email: accountInProject.email, password: pwd})).body.lb4Token;
            const res = await client.get('/get-ram-list').set('Authorization', jwt).query(
                {
                    ...query,
                    fkProperty: 1218,
                }
            );

            // no cell must be present
            expect(res?.body?.tab?.cell).be.undefined()


            // no chunk must be present
            expect(res?.body?.dat?.chunk).be.undefined()


            // these statements must be present
            expect(res?.body?.inf?.statement).to.containDeep([
                habsEmpMentionsRufolf,
                InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY
            ]);
            // these statements must not be present
            expect(res?.body?.inf?.statement).to.not.containDeep([
                chunkRefersToRudol,
                textIsReproOfHabsEmp,
                cellRefersToRudolf,
                tableIsReproOfHabsEmp
            ]);

        })
    });

});
