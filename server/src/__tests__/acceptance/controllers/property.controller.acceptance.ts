import {Client, expect} from '@loopback/testlab';
import {createDfhApiClass} from '../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../helpers/atomic/inf-language.helper';
import {addProfilesToProject} from '../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {linkAccountToProject} from '../../helpers/atomic/pub-account_project_rel.helper';
import {createSysSystemConfig} from '../../helpers/atomic/sys-system-config.helper';
import {DfhApiClassMock} from '../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../helpers/data/gvDB/InfLanguageMock';
import {createAccountVerified} from '../../helpers/generic/account.helper';
import {createProject} from '../../helpers/generic/project.helper';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';
import {createProfiles, createTypes} from '../../helpers/meta/model.helper';
import {DfhProperty} from '../../../models';



//TODO: add test with ETHEREAL

describe('PropertyController', () => {
    let client: Client;
    let pkProject: number
    let lb4Token: string;

    before(async () => {
        ({client} = await setupApplication());

    });
    beforeEach(async () => {
        await cleanDb();
        const profiles = await createProfiles()
        await createTypes()
        await createInfLanguage(InfLanguageMock.ENGLISH)
        pkProject = await createProject('Default project', 18889);
        await addProfilesToProject(pkProject, profiles.map(p => p.dfh_pk_profile));
        const accountID = await createAccountVerified('gaetan.muck@kleiolab.ch', 'test1234');
        await linkAccountToProject(accountID, pkProject);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await client.post('/login')
            .send({email: "gaetan.muck@kleiolab.ch", password: "test1234"});
        lb4Token = res.body.lb4Token
    });
    describe('GET /properties/of-project', () => {

        it('should return one property', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)
            await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE)
            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: []
            })

            const res = await client.get('/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.length).to.equal(1)
        })
        it('should return 3 properties', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)
            await createDfhApiClass(DfhApiClassMock.EN_50_TIME_SPAN)
            await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF)
            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: [
                    {
                        wherePkProperty: 1111,
                        whereFkDomain: 365,
                        isOutgoing: false,
                        toSourceClass: {
                            wherePkClassNotIn: [365],
                            whereBasicTypeIn: [8, 9, 30]
                        }
                    }
                ]
            })

            const res = await client.get('/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.length).to.equal(3)
        })

        it('should return 2 properties', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)
            await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF)
            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: [
                    {
                        wherePkProperty: 1111,
                        whereFkDomain: 365,
                        isOutgoing: false,
                        toSourceClass: {
                            wherePkClassNotIn: [365],
                            whereBasicTypeIn: [0] // remark !
                        }
                    }
                ]
            })

            const res = await client.get('/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.length).to.equal(2)
        })

        it('should return 1 properties', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_365_NAMING)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF)
            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: [
                    {
                        wherePkProperty: 1111,
                        whereFkDomain: 365,
                        isOutgoing: false,
                        toSourceClass: {
                            wherePkClassNotIn: [365],
                        }
                    }
                ]
            })

            const res = await client.get('/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.length).to.equal(1)
        })


        it('should return 4 properties', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
            await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE)
            await createDfhApiClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION)
            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: [
                    {
                        wherePkProperty: 1762,
                        whereFkRange: 785,
                        isOutgoing: true,
                        toSourceClass: {
                            whereBasicTypeIn: [8, 30],
                        }
                    }
                ]
            })

            const res = await client.get('/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.length).to.equal(4)
            expect(res.body.find((prop: DfhProperty) => prop.has_domain === DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class)).not.to.be.undefined()
        })

        it('should return has to be merged with property', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1499_HAS_TO_BE_MERGED_WITH)
            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: [
                    {
                        comment: 'add "has to be merged with" to a lot of classes',
                        wherePkProperty: 1499,
                        isOutgoing: true,
                        toSourceClass: {
                            whereBasicTypeIn: [8, 9, 10, 30],
                        },
                        replaceTargetClassWithSourceClass: true
                    }
                ]
            })

            const res = await client.get('/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            const prop: DfhProperty = res.body.find((p: DfhProperty) => p.has_domain === 363)
            expect(prop.has_range).to.equal(363)
        })

    });



});

