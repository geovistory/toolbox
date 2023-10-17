import { createSelector } from '@ngrx/store';
import { getInfState } from '../inf.selectors';
import { indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, InfStatementObjectAndProperyFks, InfStatementObjectFks, InfStatementSubjectAndProperyFks, InfStatementSubjectFks } from './inf-statement.reducer';

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
