import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { DfhPropertyProfileView, DfhLabel, DfhClassProfileView, DfhPropertyView } from '../sdk';

export const dfhRoot = 'dfh';

export const dfhDefinitions: ReducerConfigCollection = {
  klass: {
    indexBy: {
      keyInStore: 'dfh_pk_class',
      indexByFn: (item) => item.dfh_pk_class.toString()
    },
    groupBy: [
      {
        keyInStore: 'pk_entity',
        groupByFn: (d: DfhLabel): string => d.pk_entity.toString()
      },
    ]
  },
  class_profile_view: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: DfhClassProfileView) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'by_dfh_pk_class',
        groupByFn: (d: DfhClassProfileView): string => d.dfh_fk_class.toString()
      }
    ]
  },
  label: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString();
      }
    },
    groupBy: [
      {
        keyInStore: 'dfh_fk_class',
        groupByFn: (d: DfhLabel): string => d.dfh_fk_class.toString()
      },
      {
        keyInStore: 'dfh_fk_property',
        groupByFn: (d: DfhLabel): string => d.dfh_fk_property.toString()
      },
      {
        keyInStore: 'dfh_fk_property__com_fk_system_type',
        groupByFn: (d: DfhLabel): string => (!d.dfh_fk_property ? undefined : d.dfh_fk_property + '_' + d.com_fk_system_type)
      }
    ]
  },
  property_profile_view: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: DfhPropertyProfileView) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'dfh_pk_profile__fk_property',
        groupByFn: (d: DfhPropertyProfileView): string => d.dfh_has_domain + '_' + d.fk_property
      }
    ]
  },
  property_view: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: DfhPropertyView) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_property',
        groupByFn: (d: DfhPropertyView): string => d.fk_property.toString()
      },
      {
        keyInStore: 'dfh_has_domain__fk_property__dfh_has_range',
        groupByFn: (d: DfhPropertyView): string => d.dfh_has_domain + '_' + d.fk_property + '_' + d.dfh_has_range
      },
      {
        keyInStore: 'dfh_has_domain__fk_property',
        groupByFn: (d: DfhPropertyView): string => d.dfh_has_domain + '_' + d.fk_property
      },
      {
        keyInStore: 'dfh_has_range__fk_property',
        groupByFn: (d: DfhPropertyView): string => d.dfh_has_range + '_' + d.fk_property
      }
    ]
  }
};
