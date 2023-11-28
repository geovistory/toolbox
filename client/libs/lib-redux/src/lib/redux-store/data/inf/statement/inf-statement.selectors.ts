import { GvFieldId, GvFieldPage } from '@kleiolab/lib-sdk-lb4';
import { createSelector } from '@ngrx/store';
import { getInfState } from '../inf.selectors';
import { getFromTo } from './_lib/getFromTo';
import { subfieldIdToString } from './_lib/subfieldIdToString';
import { InfStatementObjectAndProperyFks, InfStatementObjectFks, InfStatementSubjectAndProperyFks, InfStatementSubjectFks, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty } from './inf-statement.reducer';

export const getStatementState = createSelector(getInfState, s => s?.statement);

export const getStatementPkEntityIdxtate = createSelector(getStatementState, state => state?.by_pk_entity);
export const getStatementByPkEntity = (pkEntity: number) => createSelector(getStatementPkEntityIdxtate, (state) => state?.[pkEntity]);

// Subject selectors

export const getStatementSubjectIdxState = createSelector(getStatementState, state => state?.by_subject);
export const getStatementBySubject = (key: InfStatementSubjectFks) => createSelector(getStatementSubjectIdxState, (state) => state?.[indexStatementBySubject(key)]);

export const getStatementSubjectAndPropertyIdxState = createSelector(getStatementState, state => state?.['by_subject+property']);
export const getStatementBySubjectAndProperty = (key: InfStatementSubjectAndProperyFks) => createSelector(getStatementSubjectAndPropertyIdxState, (state) => state?.[indexStatementBySubjectProperty(key)]);


// Object selectors

export const getStatementObjectIdxState = createSelector(getStatementState, state => state?.by_object);
export const getStatementByObject = (key: InfStatementObjectFks) => createSelector(getStatementObjectIdxState, (state) => state?.[indexStatementByObject(key)]);

export const getStatementObjectAndPropertyIdxState = createSelector(getStatementState, state => state?.['by_object+property']);
export const getStatementByObjectAndProperty = (key: InfStatementObjectAndProperyFks) => createSelector(getStatementObjectAndPropertyIdxState, (state) => state?.[indexStatementByObjectProperty(key)]);


// Pagination selectors

const getSubfieldPageState = createSelector(getStatementState, s => s?.by_subfield_page);
export const getPage = (page: GvFieldId) => createSelector(getSubfieldPageState, (state) => state?.[subfieldIdToString(page)]);
export const getPageCount = (page: GvFieldId) => createSelector(getSubfieldPageState, (state) => state?.[subfieldIdToString(page)]?.count);
export const getPageRows = (page: GvFieldId) => createSelector(getSubfieldPageState, (state) => state?.[subfieldIdToString(page)]?.rows);
export const getPageRow = (page: GvFieldId, rowIndex: number) => createSelector(getSubfieldPageState, (state) => state?.[subfieldIdToString(page)]?.rows?.[rowIndex]);
export const getPageLoadNeeded = (page: GvFieldPage) => createSelector(getSubfieldPageState, (state) => state?.[subfieldIdToString(page)]?.loading?.[getFromTo(page.limit, page.offset)]);
