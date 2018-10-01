import { RoleSet } from './role-set';
import { ExistenceTimeDetail } from './existence-time-detail';

export type CollapsedExpanded = 'collapsed' | 'expanded';
export type SelectPropStateType = 'init' | 'selectProp'
export type ExTimeModalMode = 'one-date' | 'begin-end' | 'advanced';
export type ExTimeHelpMode = 'hidden' | 'short' | 'long';
export type DataUnitChild = RoleSet | ExistenceTimeDetail;
export type DataUnitChildType = 'RoleSet' | 'ExistenceTimeDetail';
export type TeEntAccentuation = 'highlighted' | 'selected' | 'none';
