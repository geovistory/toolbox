import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { DfhClass, DfhLabel, DfhProperty, DfhProfile } from '../sdk';

export const dfhRoot = 'dfh';

export const dfhLabelByFksKey = (item: Partial<DfhLabel>) => `${item.type || null}_${item.language || null}_${item.fk_class || null}_${item.fk_profile || null}_${item.fk_property || null}_${item.fk_project || null}`;

export const dfhDefinitions: ReducerConfigCollection = {
  profile: {
    indexBy: {
      keyInStore: 'pk_profile',
      indexByFn: (item: DfhProfile) => item.pk_profile.toString()
    }
  },
  klass: {
    indexBy: {
      keyInStore: 'pk_class',
      indexByFn: (item: DfhClass) => item.pk_class.toString(),
    },
    groupBy: [
      {
        keyInStore: 'basic_type',
        groupByFn: (d: DfhClass): string => d.basic_type.toString()
      },
    ]
  },
  property: {
    indexBy: {
      keyInStore: 'pk_property__has_domain__has_range',
      indexByFn: (item: DfhProperty) => item.pk_property + '_' + item.has_domain + '_' + item.has_range
    },
    groupBy: [
      {
        keyInStore: 'pk_property',
        groupByFn: (d: DfhProperty): string => d.pk_property.toString()
      },
      {
        keyInStore: 'has_domain',
        groupByFn: (d: DfhProperty): string => d.has_domain.toString()
      },
      {
        keyInStore: 'has_range',
        groupByFn: (d: DfhProperty): string => d.has_range.toString()
      },
      {
        keyInStore: 'has_domain__fk_property',
        groupByFn: (d: DfhProperty): string => d.has_domain + '_' + d.pk_property
      },
      {
        keyInStore: 'has_range__fk_property',
        groupByFn: (d: DfhProperty): string => d.has_range + '_' + d.pk_property
      },
      {
        keyInStore: 'is_has_type_subproperty',
        groupByFn: (d: DfhProperty): string => d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined
      }
    ]
  },
  label: {
    indexBy: {
      keyInStore: 'fks',
      indexByFn: dfhLabelByFksKey
    },
    groupBy: [
      {
        keyInStore: 'fk_class__type',
        groupByFn: (d: DfhLabel): string => !d.fk_class ? undefined : `${d.fk_class}_${d.type}`
      },
      {
        keyInStore: 'fk_property__type',
        groupByFn: (d: DfhLabel): string => !d.fk_property ? undefined : `${d.fk_property}_${d.type}`
      },
      {
        keyInStore: 'fk_profile__type',
        groupByFn: (d: DfhLabel): string => !d.fk_profile ? undefined : `${d.fk_profile}_${d.type}`
      }
    ]
  },
};
