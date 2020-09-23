/* eslint-disable @typescript-eslint/camelcase */

import { createDfhApiClass, DfhApiClass } from '../atomic/dfh-api-class.helper';
import { createDfhApiProperty } from '../atomic/dfh-api-property.helper';
import { createInfPersistentItem } from '../atomic/inf-persistent-item.helper';
import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfTemporalEntity } from '../atomic/inf-temporal-entity.helper';
import { InfPersistentItem } from '../../../models';

export async function createPersonWithClassAndProperty(name: string): Promise<{ person: InfPersistentItem, class: DfhApiClass }> {
    const classAppelFL = await createDfhApiClass({ dfh_class_label: 'Appellation in a language (time-indexed)', dfh_pk_class: 365 });
    const classPerson = await createDfhApiClass({ dfh_class_label: 'Person', dfh_pk_class: 21 });
    const propertyIsAppelFL = await createDfhApiProperty({ dfh_pk_property: 1111, dfh_property_label: 'is appellation for language of' })
    const propertyRefersToName = await createDfhApiProperty({ dfh_pk_property: 1113, dfh_property_label: 'refers to name' })

    const teen = await createInfTemporalEntity({ fk_class: classAppelFL.dfh_pk_class });
    const peit = await createInfPersistentItem({ fk_class: classPerson.dfh_pk_class });
    const appel = await createInfAppellation({ string: name });

    await createInfStatement({ fk_subject_info: teen.pk_entity, fk_property: propertyIsAppelFL.dfh_pk_property, fk_object_info: peit.pk_entity })
    await createInfStatement({ fk_subject_info: teen.pk_entity, fk_property: propertyRefersToName.dfh_pk_property, fk_object_info: appel.pk_entity })

    return {
        person: peit,
        class: classPerson
    }
}