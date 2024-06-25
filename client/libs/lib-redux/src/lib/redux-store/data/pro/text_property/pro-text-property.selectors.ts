import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { createSelector } from '@ngrx/store';
import { values } from 'ramda';
import { getProState } from '../pro.selectors';
import { textPropertyByFksKey, textPropertyByFksWithoutLang } from './pro-text-property.reducer';

const getFeatureState = createSelector(getProState, s => s?.text_property);

export const byFksState = createSelector(getFeatureState, state => state?.by_fks);
export const getByFks = (d: Partial<ProTextProperty>) => createSelector(byFksState, (state) => state?.[textPropertyByFksKey(d)]);

export const byFksWithoutLangState = createSelector(getFeatureState, state => state?.by_fks_without_lang);
export const getByFksWithoutLang = (d: Partial<ProTextProperty>) => createSelector(byFksWithoutLangState, (state) => state?.[textPropertyByFksWithoutLang(d)]);

export const getTextPropAboutProject = (projectId: number, fkSystemType: number) =>
  createSelector(getByFksWithoutLang({
    fk_project: projectId,
    fk_pro_project: projectId,
    fk_system_type: fkSystemType
  }), s => values(s)?.[0]?.string)

