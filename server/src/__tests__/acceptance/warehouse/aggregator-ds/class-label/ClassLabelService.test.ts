/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {ClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/ClassLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {setupWarehouse, wait} from '../../../../helpers/warehouse-helpers';
import {createProTextPropertyClassLabel, updateProTextProperty, deleteProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {AtmLanguages} from '../../../../helpers/atomic/inf-language.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';

describe('ClassLabelService', function () {

    let wh: Warehouse;
    let s: ClassLabelService;


    beforeEach(async function () {
        wh = await setupWarehouse()
        await wh.clearDB()
        s = wh.agg.classLabel;
        await cleanDb()
    })

    it('should create class label of Person: de-ontome', async () => {
        const p = await createProject('German')
        const c = await createDfhApiClass({
            dfh_pk_class: 1,
            dfh_class_label: 'Foo',
            dfh_class_label_language: 'de'
        })

        await wh.start()

        const result = await s.index.getFromIdx({
            pkClass: c.dfh_pk_class,
            fkProject: p.pk_entity ?? -1
        })
        expect(result).to.equal('Foo')
    })
    it('should create class label of Person: de-geovistory', async () => {
        await createTypes()
        const p = await createProject('German')
        const c = await createDfhApiClass({
            dfh_pk_class: 1,
            dfh_class_label: 'Foo',
            dfh_class_label_language: 'de'
        })
        await createProTextPropertyClassLabel(
            p.pk_entity ?? -1,
            1,
            'Geburt',
            AtmLanguages.GERMAN.id
        )

        await wh.start()

        const result = await s.index.getFromIdx({
            pkClass: c.dfh_pk_class,
            fkProject: p.pk_entity ?? -1
        })
        expect(result).to.equal('Geburt')
    })
    it('should update class label of Person: de-geovistory', async () => {
        await createTypes()
        const p = await createProject('German')
        const c = await createDfhApiClass({
            dfh_pk_class: 1,
            dfh_class_label: 'Foo',
            dfh_class_label_language: 'de'
        })
        const t = await createProTextPropertyClassLabel(
            p.pk_entity ?? -1,
            1,
            'Geburt',
            AtmLanguages.GERMAN.id
        )

        await wh.start()

        const classLabelId = {
            pkClass: c.dfh_pk_class,
            fkProject: p.pk_entity ?? -1
        }
        let result = await s.index.getFromIdx(classLabelId)
        expect(result).to.equal('Geburt')

        await updateProTextProperty(
            t.pk_entity ?? -1,
            {string: 'Niederkunft'}
        )

        await wait(200)
        result = await s.index.getFromIdx(classLabelId)
        expect(result).to.equal('Niederkunft')

    })

    it('should switch class label of Person: de-geovistory to de-ontome', async () => {
        await createTypes()
        const p = await createProject('German')
        const c = await createDfhApiClass({
            dfh_pk_class: 1,
            dfh_class_label: 'Foo',
            dfh_class_label_language: 'de'
        })
        const t = await createProTextPropertyClassLabel(
            p.pk_entity ?? -1,
            1,
            'Geburt',
            AtmLanguages.GERMAN.id
        )

        await wh.start()

        const classLabelId = {
            pkClass: c.dfh_pk_class,
            fkProject: p.pk_entity ?? -1
        }
        let result = await s.index.getFromIdx(classLabelId)
        expect(result).to.equal('Geburt')
        await deleteProTextProperty(t.pk_entity ?? -1)

        await wait(200)
        result = await s.index.getFromIdx(classLabelId)
        expect(result).to.equal('Foo')

    })


})
