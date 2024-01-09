import {Client, expect} from '@loopback/testlab';
import {GvSchemaModifier} from '../../../../models/gv-schema-modifier.model';
import {createDfhApiClass} from '../../../helpers/atomic/createDfhApiClass';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {addProfileToProject, addProfilesToProject} from '../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {createSysSystemConfig} from '../../../helpers/atomic/sys-system-config.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject} from '../../../helpers/generic/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {createProfiles, createTypes} from '../../../helpers/meta/model.helper';



describe('DfhPropertyController', () => {
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
    describe('GET /data-model/properties/of-project', () => {


        it('should return one property', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)
            await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE)
            await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)

            await createSysSystemConfig({
                classes: {},
                specialFields: {},
                addProperty: []
            })

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.positive.dfh?.property?.length).to.equal(1)
        })

        it('should return 3 properties', async () => {

            // property should be selected as template
            await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON)
            await createDfhApiClass({
                ...DfhApiClassMock.EN_365_NAMING,
                dfh_fk_profile: 4
            })

            // property should be selected
            await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE)
            await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)

            // should not get a genarated 1111 property (because basic_type = 10)
            await createDfhApiClass(DfhApiClassMock.EN_50_TIME_SPAN)

            // should be ignored, since range class (union) missing
            await createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM)

            // should add the property 1111 for the class Birth
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

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.positive.dfh?.property?.length).to.equal(3)
        })

        it('should return 1 property', async () => {

            await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)
            await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE)
            await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)

            // should not be added to birth because of basicType
            await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF)
            await createDfhApiClass({
                ...DfhApiClassMock.EN_365_NAMING,
                dfh_fk_profile: 4
            })


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

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.positive.dfh?.property?.length).to.equal(1)
        })

        it('should return 3 <has definition> properties', async () => {


            // creating the template property
            await createDfhApiClass(DfhApiClassMock.EN_1_CRM_ENTITY)
            await createDfhApiProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION)
            await createDfhApiClass(DfhApiClassMock.EN_785_TEXT)

            // should be added to
            await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
            await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE)
            await createDfhApiClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE)

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
                            wherePkClassNotIn: [785]
                        }
                    }
                ]
            })

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            expect(res.body.positive.dfh?.property?.length).to.equal(4)
            expect(res.body.positive.dfh?.property?.find((prop) => prop.has_domain === DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class)).not.to.be.undefined()
        })

        it('should return has to be merged with property', async () => {
            // create template property
            await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
            await createDfhApiProperty({
                ...DfhApiPropertyMock.EN_1499_HAS_TO_BE_MERGED_WITH,
                dfh_fk_profile: 4
            })

            // should be added to geo-place
            await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE)

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

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()
            const prop = res.body.positive.dfh?.property?.find((p) => p.has_domain === 363)
            expect(prop?.has_range).to.equal(363)
        })

        it('should return <person -> has appellation -> appe in lang> property', async () => {
            /**
             * The property should only be created, if domain and range and property are
             * in a profile activated by the project.
             */
            await createDfhApiClass({
                ...DfhApiClassMock.EN_21_PERSON,
                dfh_fk_profile: 999
            })
            await createDfhApiClass({
                ...DfhApiClassMock.EN_365_NAMING,
                dfh_fk_profile: 999 // add the target class to a fake profile
            })

            // add fake profile to project
            await addProfileToProject(999, pkProject)

            // add the teemplate property (should not be returned, since its range class is not added)
            await createDfhApiProperty({
                ...DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
                dfh_fk_profile: 999
            })

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

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()

            expect(res.body.positive.dfh?.property?.length).to.equal(1)
            const prop = res.body.positive.dfh?.property?.[0];
            expect(prop?.has_domain).to.equal(365)
            expect(prop?.has_range).to.equal(21)
        })

        it('should NOT return <person -> has appellation -> appe in lang> property', async () => {
            /**
             * The property should only be created, if domain and range and property are
             * in a profile activated by the project.
             */
            await createDfhApiClass({
                ...DfhApiClassMock.EN_21_PERSON,
                dfh_fk_profile: 5
            })
            await createDfhApiClass({
                ...DfhApiClassMock.EN_365_NAMING,
                dfh_fk_profile: 999 // add the target class to a fake profile
            })

            // here we don't add fake profile to project !
            // await addProfileToProject(999, pkProject)

            await createDfhApiProperty({
                ...DfhApiPropertyMock.EN_1111_IS_APPE_OF,
                dfh_fk_profile: 5
            })


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

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()

            expect(res.body.positive.dfh?.property?.length).to.equal(0)

        })

        it('should property that is removed from api', async () => {
            /**
             * The property should only be created, if domain and range and property are
             * in a profile activated by the project.
             */
            await createDfhApiClass({
                ...DfhApiClassMock.EN_21_PERSON,
                dfh_fk_profile: 999
            })
            await createDfhApiClass({
                ...DfhApiClassMock.EN_365_NAMING,
                dfh_fk_profile: 999
            })

            await createDfhApiProperty({
                ...DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
                dfh_fk_profile: 999,
                removed_from_api: true
            })

            // add profile to project
            await addProfileToProject(999, pkProject)

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

            const res: {body: GvSchemaModifier} = await client.get('/data-model/properties/of-project')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send()

            expect(res.body.positive.dfh?.property?.length).to.equal(1)
            expect(res.body.positive.dfh?.property?.[0].profiles).to.deepEqual([{
                fk_profile: 999,
                removed_from_api: true
            }])

        })
    });



});

