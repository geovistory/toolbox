import { DfhClass, DfhProperty, U, ComConfig, SysClassField, ProClassFieldConfig } from 'app/core';
import { omit, pick, sort } from 'ramda';
import { Action } from 'redux';

import { ClassUiContext, Container, Widget } from '../../../backoffice.models';
import { ClassUiContextAPIAction, ClassUiContextAPIActions } from './class-ui-context.actions';
import { DfhConfig } from '../../../../information/shared/dfh-config';

const INITIAL_STATE: ClassUiContext = {
  class: {},
  loading: false,
  error: null,
};


export function classUiContextReducer(state: ClassUiContext = INITIAL_STATE, a: Action): ClassUiContext {

  const action = a as ClassUiContextAPIAction;


  switch (action.type) {
    case ClassUiContextAPIActions.LOAD_STARTED:
      return {
        ...omit(['containerDisabled', 'containerEnabled', 'class'], state),
        loading: true,
        error: null,
      };

    case ClassUiContextAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        // class: pick(['dfh_standard_label'], action.payload),
        containerEnabled: action.meta.containerEnabled,
        containerDisabledFields: action.meta.containerDisabledFields,
        containerDisabledProperties: action.meta.containerDisabledProperties,
        loading: false,
        error: null,
      };


    case ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };


  }


  return state;
};

