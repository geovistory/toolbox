import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ComUiContextConfig, DfhClass, LoadingBarAction, LoadingBarActions, DfhProperty, U, ComPropertySetApi, ComPropertySet } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ComUiContextConfigApi } from '../../../../../core/sdk/services/custom/ComUiContextConfig';
import { ClassUiContext, Widget, Container } from '../../../admin.models';
import { ClassUiContextAPIActions } from './class-ui-context.actions';
import { sort } from 'ramda';


@Injectable()
export class ClassUiContextAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private fieldsApi: ComPropertySetApi,
    private uiPropConfigApi: ComUiContextConfigApi,
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
            const classes: DfhClass[] = d[1], fields: ComPropertySet[] = d[0];
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
          action.meta.uiPropConfigs.map(data => this.uiPropConfigApi.patchOrCreate(data))
        ).subscribe((data: ComUiContextConfig[]) => {

          subStore.dispatch(this.actions.loadClassUiContext());

        }, error => {
          subStore.dispatch(this.actions.updateUiContextConfigFailed({ status: '' + error.status }))
        })
      })),
      takeUntil(until$)
    )
  }

  private createContainers = (dfhClass: DfhClass, fields: ComPropertySet[], pkUiContext: number): ClassUiContext => {
    const enabledWidgets: Widget[] = [];
    const disabledProperties: Widget[] = [];
    const disabledFields: Widget[] = [];

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
        disabledProperties.push(new Widget(roleSet.label.default, metaInfo, roleSet, null, uiContextConf, property.property_profile_view))
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

    // add widget for each class_field in ui_context_config (custom elements that are not RoleSets / Properties)
    const pkFieldsWithClassRelation = []
    if (dfhClass.ui_context_configs) {
      dfhClass.ui_context_configs.forEach((uiContextConf) => {

        if (uiContextConf.fk_property_set) {

          const ordNum = uiContextConf.ord_num;

          const propSet = uiContextConf.property_set;

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
