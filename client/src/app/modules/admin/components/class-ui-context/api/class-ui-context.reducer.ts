import { DfhClass, DfhProperty, U, ComUiClassConfig, ComConfig } from 'app/core';
import { omit, pick, sort } from 'ramda';
import { Action } from 'redux';

import { ClassUiContext, Container, Widget } from '../../../admin.models';
import { ClassUiContextAPIAction, ClassUiContextAPIActions } from './class-ui-context.actions';

const INITIAL_STATE: ClassUiContext = {
  class: {},
  loading: false,
  error: null,
};

const createContainers = (dfhClass: DfhClass): { containerDisabled: Container, containerEnabled: Container } => {
  let enabledWidgets: Widget[] = [];
  let disabledWidgets: Widget[] = [];

  const addWidgetWithRoleSet = (property: DfhProperty, isOutgoing: boolean) => {

    const roleSet = U.infProperties2RoleSets(isOutgoing, [property])[0];

    const ordNum = U.ordNumOfRoleSet(roleSet)

    const metaInfo = property.dfh_pk_property + '–' + (isOutgoing ? 'outgoing' : 'ingoing');

    // if ordNum set, it is enabled
    if (ordNum !== null) {
      enabledWidgets.push(new Widget(roleSet.label.default, metaInfo, roleSet))
    }

    // if ordNum falsy, it is disabled
    else {
      disabledWidgets.push(new Widget(roleSet.label.default, metaInfo, roleSet))
    }
  }

  // add widget for each ingoing property 
  if (dfhClass.ingoing_properties)
    dfhClass.ingoing_properties.forEach((property: DfhProperty) => {
      addWidgetWithRoleSet(property, false);
    })

  // add widget for each outgoing property 
  if (dfhClass.outgoing_properties)
    dfhClass.outgoing_properties.forEach((property: DfhProperty) => {
      addWidgetWithRoleSet(property, true);
    })


  // add widget for each ui-element in ui_class_config (custom elements that are not RoleSets / Properties)
  if (dfhClass.ui_class_config) {
    dfhClass.ui_class_config.forEach((uiClassConf: ComUiClassConfig) => {
      const ordNum = uiClassConf.ord_num;
      // if ordNum set, it is enabled
      // if (ordNum !== null) {
      //   enabledWidgets.push(new Widget(uiClassConf.target_ui_context.description, metaInfo, roleSet))
      // }

      // // if ordNum falsy, it is disabled
      // else {
      //   disabledWidgets.push(new Widget(uiClassConf.target_ui_context.description, metaInfo, roleSet))
      // }

    })

    // add when-form elements to disabled, if not yet existing
    // if(dfhClass.ui_class_config.find(uiClassConf=>uiClassConf.target_ui_context === ComConfig.))

  }



  var diff = (a: Widget, b: Widget) => { return U.ordNumOfRoleSet(a.roleSet) - U.ordNumOfRoleSet(b.roleSet); };

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
        ...createContainers(action.payload),
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

