import { DfhClass, DfhProperty, U, ComConfig, ComPropertySet, ComUiContextConfig } from 'app/core';
import { omit, pick, sort } from 'ramda';
import { Action } from 'redux';

import { ClassUiContext, Container, Widget } from '../../../admin.models';
import { ClassUiContextAPIAction, ClassUiContextAPIActions } from './class-ui-context.actions';
import { DfhConfig } from '../../../../information/shared/dfh-config';

const INITIAL_STATE: ClassUiContext = {
  class: {},
  loading: false,
  error: null,
};

const createContainers = (dfhClass: DfhClass, pkUiContext: number): { containerDisabled: Container, containerEnabled: Container } => {
  const enabledWidgets: Widget[] = [];
  const disabledWidgets: Widget[] = [];

  const addWidgetForRoleSet = (property: DfhProperty, isOutgoing: boolean) => {

    const roleSet = U.infProperties2RoleSets(isOutgoing, [property])[0];

    let uiContextConf = U.uiContextConfigFromRoleSet(roleSet);

    if (!uiContextConf) {
      uiContextConf = {
        fk_property: property.dfh_pk_property,
        property_is_outgoing: isOutgoing,
        fk_ui_context: pkUiContext
      } as ComUiContextConfig;
    }

    const ordNum = U.ordNumFromRoleSet(roleSet)

    const metaInfo = property.dfh_pk_property + '–' + (isOutgoing ? 'outgoing' : 'ingoing');

    if (ordNum !== null) {
      // if ordNum set, it is enabled
      enabledWidgets.push(new Widget(roleSet.label.default, metaInfo, roleSet, null, uiContextConf, property.property_profile_view))
    } else {
      // if ordNum falsy, it is disabled
      disabledWidgets.push(new Widget(roleSet.label.default, metaInfo, roleSet, null, uiContextConf, property.property_profile_view))
    }
  }

  // add widget for each ingoing property
  if (dfhClass.ingoing_properties) {
    dfhClass.ingoing_properties.forEach((property: DfhProperty) => {
      addWidgetForRoleSet(property, false);
    })
  }

  // add widget for each outgoing property
  if (dfhClass.outgoing_properties) {
    dfhClass.outgoing_properties.forEach((property: DfhProperty) => {
      addWidgetForRoleSet(property, true);
    })
  }

  // add widget for each ui-element in ui_class_config (custom elements that are not RoleSets / Properties)
  if (dfhClass.ui_context_configs) {
    dfhClass.ui_context_configs.forEach((uiContextConf) => {

      if (uiContextConf.fk_property_set) {

        const ordNum = uiContextConf.ord_num;

        const propSet = uiContextConf.property_set;

        if (ordNum !== null) {
          // if ordNum set, it is enabled
          enabledWidgets.push(new Widget(propSet.label, 'custom property set', null, propSet, uiContextConf, []))
        } else {
          // if ordNum falsy, it is disabled
          disabledWidgets.push(new Widget(propSet.label, 'custom property set', null, propSet, uiContextConf, []))
        }
      }

    })

  }

  // sort function
  const diff = (a: Widget, b: Widget) => a.uiContextConfig.ord_num - b.uiContextConfig.ord_num;

  return {
    containerEnabled: new Container('Enabled in UI context', sort(diff, enabledWidgets)),
    containerDisabled: new Container('Disabled in UI context', disabledWidgets),
  };;
}

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
        class: pick(['dfh_standard_label'], action.payload),
        ...createContainers(action.payload, action.meta.pkUiContext),
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

