import assert from 'assert';
import {EntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/EntityLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {EntityLabelConfigMock} from '../../../../helpers/data/whDb/EntityLabelConfigMock';
import {setupWarehouse} from '../../../../helpers/warehouse-helpers';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('EntityLabelService2', function () {
    let wh: Warehouse;
    let s: EntityLabelService;


    beforeEach(async function () {
        wh = await setupWarehouse()
        await wh.clearDB()
        s = wh.agg.entityLabel;
        await cleanDb()

    })

    it('should create entity label of naming', async () => {
        // TODO: find a way to initialize entity label config
        await wh.prim.entityLabelConfig.put(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)
        await createInfLanguage(InfLanguageMock.GERMAN)
        await createProProject(ProProjectMock.PROJECT_1)
        await createProProject(ProProjectMock.DEFAULT_PROJECT)
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING)
        await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
        await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)

        await wh.start()

        const result = await s.index.getFromIdx({
            fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1,
            pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1
        })
        assert.equal(result, 'Jack the Foo')
    })
    // it('should create entity label of person with recursive function', async () => {
    //     await main.agg.entityLabel.updater.addItemsToQueue([
    //         EntityMock.NAME_1_ID,
    //         EntityMock.PERS_1_ID,
    //     ])
    //     await main.agg.entityLabel.updater.startCylcling()
    //     const result = await main.agg.entityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
    //     assert.equal(result, 'Jack the Foo')
    // })
    // it('should create entity label of person with default start', async () => {
    //     await main.initUpdateRequests()
    //     await main.agg.start()
    //     const result = await main.agg.entityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
    //     assert.equal(result, 'Jack the Foo')
    // })
})
