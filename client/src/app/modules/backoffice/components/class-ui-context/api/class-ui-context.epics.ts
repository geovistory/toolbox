import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProClassFieldConfig, DfhClass, LoadingBarAction, LoadingBarActions, DfhProperty, U, SysClassFieldApi, SysClassField } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ProClassFieldConfigApi } from 'app/core/sdk';
import { ClassUiContext, Widget, Container } from '../../../backoffice.models';
import { ClassUiContextAPIActions } from './class-ui-context.actions';
import { sort } from 'ramda';


@Injectable()
export class ClassUiContextAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private fieldsApi: SysClassFieldApi,
    private classFieldConfigApi: ProClassFieldConfigApi,
    private actions: ClassUiContextAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(subStore: ObservableStore<ClassUiContext>, pkClass: number, pkUiContext: number, until$: Subject<boolean>) {
    return combineEpics(
      this.createLoadClassEpic(subStore, pkClass, pkUiContext, until$),
      this.createupdateUiContextConfigEpic(subStore, pkClass, pkUiContext, until$),
    );
  }

  private createLoadClassEpic(
    subStore: ObservableStore<ClassUiContext>,
    pkClass: number, pkUiContext: number,
    until$: Subject<boolean>
  ): Epic {
    return (action$, store) => action$.pipe(
      ofType(ClassUiContextAPIActions.LOAD_CLASS_UI_CONTEXT),
      switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        subStore.dispatch(this.actions.loadStarted());
        combineLatest(
          this.fieldsApi.findComplex(),
          this.classApi.propertiesAndUiElements(pkClass, pkUiContext, null)
        )
          .subscribe((d) => {
            const classes: DfhClass[] = d[1], fields: SysClassField[] = d[0];
            globalStore.next(this.loadingBarActions.completeLoading());

            const r = this.createContainers(classes[0], fields, pkUiContext)
            subStore.dispatch(this.actions.loadSucceeded(r.containerEnabled, r.containerDisabledProperties, r.containerDisabledFields));
          }, error => {
            subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          })
      })),
      takeUntil(until$)
    )
  }


  private createupdateUiContextConfigEpic(
    subStore: ObservableStore<ClassUiContext>,
    pkClass: number,
    pkUiContext: number,
    until$: Subject<boolean>): Epic {
    return (action$, store) => action$.pipe(
      ofType(ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG),
      switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        subStore.dispatch(this.actions.updateUiContextConfigStarted());

        combineLatest(
          action.meta.uiPropConfigs.map(data => this.classFieldConfigApi.patchOrCreate(data))
        ).subscribe(() => {

          subStore.dispatch(this.actions.loadClassUiContext());

        }, error => {
          subStore.dispatch(this.actions.updateUiContextConfigFailed({ status: '' + error.status }))
        })
      })),
      takeUntil(until$)
    )
  }

  private createContainers = (dfhClass: DfhClass, fields: SysClassField[], pkUiContext: number): ClassUiContext => {
    const enabledWidgets: Widget[] = [];
    const disabledProperties: Widget[] = [];
    const disabledFields: Widget[] = [];

    const addWidgetForPropertyField = (property: DfhProperty, isOutgoing: boolean) => {

      const propertyField = U.infProperties2PropertyFields(isOutgoing, [property])[0];

      let uiContextConf = U.uiContextConfigFromPropertyField(propertyField);

      if (!uiContextConf) {
        uiContextConf = {
          fk_property: property.dfh_pk_property,
          property_is_outgoing: isOutgoing,
          fk_app_context: pkUiContext
        } as ProClassFieldConfig;
      }

      const ordNum = U.ordNumFromPropertyField(propertyField)

      const metaInfo = property.dfh_pk_property + '–' + (isOutgoing ? 'outgoing' : 'ingoing');

      if (ordNum !== null) {
        // if ordNum set, it is enabled
        enabledWidgets.push(new Widget(propertyField.label.default, metaInfo, propertyField, null, uiContextConf, property.property_profile_view))
      } else {
        // if ordNum falsy, it is disabled
        disabledProperties.push(new Widget(propertyField.label.default, metaInfo, propertyField, null, uiContextConf, property.property_profile_view))
      }
    }

    // add widget for each ingoing property
    if (dfhClass.ingoing_properties) {
      dfhClass.ingoing_properties.forEach((property: DfhProperty) => {
        addWidgetForPropertyField(property, false);
      })
    }

    // add widget for each outgoing property
    if (dfhClass.outgoing_properties) {
      dfhClass.outgoing_properties.forEach((property: DfhProperty) => {
        addWidgetForPropertyField(property, true);
      })
    }

    // add widget for each class_field in ui_context_config (custom elements that are not PropertyFields / Properties)
    const pkFieldsWithClassRelation = []
    if (dfhClass.class_field_configs) {
      dfhClass.class_field_configs.forEach((uiContextConf) => {

        if (uiContextConf.fk_class_field) {

          const ordNum = uiContextConf.ord_num;

          const propSet = uiContextConf.class_field;

          pkFieldsWithClassRelation.push(propSet.pk_entity)

          if (ordNum !== null) {
            // if ordNum set, it is enabled
            enabledWidgets.push(new Widget(propSet.label, 'Class Field', null, propSet, uiContextConf, []))
          } else {
            // if ordNum falsy, it is disabled
            disabledFields.push(new Widget(propSet.label, 'Class Field', null, propSet, uiContextConf, []))
          }
        }

      })

    }
    // add fields that have not yet been related to the class
    fields.forEach((field) => {
      if (pkFieldsWithClassRelation.indexOf(field.pk_entity) === -1) {
        disabledFields.push(new Widget(field.label, 'Class Field', null, field, null, []))
      }
    })

    // sort function
    const diff = (a: Widget, b: Widget) => a.uiContextConfig.ord_num - b.uiContextConfig.ord_num;

    return {
      containerEnabled: new Container('Enabled in UI context', sort(diff, enabledWidgets)),
      containerDisabledProperties: new Container('Disabled in UI context', disabledProperties),
      containerDisabledFields: new Container('Disabled in UI context', disabledFields),
    };
  }

}
