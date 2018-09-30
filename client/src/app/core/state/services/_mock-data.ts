import { InfLanguage, InfAppellation, InfTimePrimitive, InfTemporalEntity, InfPlace, InfRole } from 'app/core/sdk';

/*** Configuration / Environment*/


export const place = new InfPlace({ pk_entity: 22, fk_class: 123, lat: 213.2, long: 789.12 });

export const language = new InfLanguage({ pk_entity: 17071, fk_class: 54, pk_language: 'aae', lang_type: 'living', scope: 'individual', iso6392b: null, iso6392t: null, iso6391: null, notes: 'Arbëreshë Albanian' });

export const appellation = new InfAppellation({ appellation_label: { tokens: [{ id: 4, string: 'Hügel', isSeparator: false }], latestTokenId: 4 }, fk_class: 40, notes: null, pk_entity: 80681 });

export const time_primitive = new InfTimePrimitive({ pk_entity: 25788, fk_class: 335, julian_day: 2431383, duration: '1 day' });

export const temporal_entity = new InfTemporalEntity({ pk_entity: 25788, fk_class: 363 });

export const role = new InfRole({ pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 363 });

export const roleWithPlace = new InfRole({ place, pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 4 });
export const roleWithLanguage = new InfRole({ language, pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 4 });
export const roleWithAppellation = new InfRole({ appellation, pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 4 });
export const roleWithTimePrimitive = new InfRole({ time_primitive, pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 4 });
export const roleWithTemporalEntity = new InfRole({ temporal_entity, pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 4 });
