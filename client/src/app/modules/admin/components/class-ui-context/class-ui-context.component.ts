import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComConfig, ComUiContextConfig, IAppState, U } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { pathOr } from 'ramda';
import { addMiddleware, removeMiddleware } from 'redux-dynamic-middlewares';
import { Observable, Subscription, Subject } from 'rxjs';

import { ClassDetail, Container, ClassUiContext } from '../../admin.models';
import { ClassUiContextAPIActions } from './api/class-ui-context.actions';
import { ClassUiContextAPIEpics } from './api/class-ui-context.epics';
import { classUiContextReducer } from './api/class-ui-context.reducer';
import { RootEpics } from 'app/core/store/epics';



@AutoUnsubscribe({ blackList: ['until$'] })
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classUiContextReducer
})
@Component({
  selector: 'gv-class-ui-context',
  templateUrl: './class-ui-context.component.html',
  styleUrls: ['./class-ui-context.component.scss']
})
export class ClassUiContextComponent extends ClassUiContextAPIActions implements OnInit, OnDestroy {

  public readonly PK_UI_CONTEXT_DATAUNITS_EDITABLE = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
  public readonly PK_UI_CONTEXT_DATAUNITS_CREATE = ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;


  localStore: ObservableStore<ClassUiContext>

  // @select() class$: Observable<any>;
  @select() loading$: Observable<any>;

  @select() containerDisabledProperties$: Observable<Container>;
  containerDisabledProperties: Container;
  @select() containerDisabledFields$: Observable<Container>;
  containerDisabledFields: Container;
  @select() containerEnabled$: Observable<Container>;
  containerEnabled: Container;
  // disabledContainer$: Observable<Container>;

  pkUiContext: number;
  pkClass: number;
  description: string;

  subs: Subscription[] = []

  // emits when subscriptions to epic should be stopped
  until$: Subject<boolean> = new Subject<boolean>();

  enabledWidgetsExpanded = false;
  disabledPropertiesExpanded = false;
  disabledFieldsExpanded = false;

  constructor(
    private rootEpics: RootEpics,
    private epics: ClassUiContextAPIEpics,
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super()

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), classUiContextReducer)

    this.pkClass = this.activatedRoute.snapshot.parent.params['pk_class'];

    this.subs.push(this.activatedRoute.params.subscribe(params => {
      this.pkUiContext = params['pk_ui_context'];


      this.until$.next(true)
      this.until$.unsubscribe();
      this.until$ = new Subject<boolean>();

      this.rootEpics.addEpic(this.epics.createEpics(this.localStore, this.pkClass, this.pkUiContext, this.until$))

      this.loadClassUiContext()
    }))

    this.subs.push(this.containerDisabledFields$.subscribe(d => this.containerDisabledFields = d));
    this.subs.push(this.containerDisabledProperties$.subscribe(d => this.containerDisabledProperties = d));
    this.subs.push(this.containerEnabled$.subscribe(d => this.containerEnabled = d));

  }

  getBasePath = () => ['admin', 'classDetail', 'uiContext'];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.until$.next(true)
    this.until$.unsubscribe();
    this.subs.forEach(sub => sub.unsubscribe());
  }



  /**** Logic for drag-and-drop ****/

  /**
   * called when a item is dropped or moved in disabled container
   */
  droppedInDisabled() {
    const widgets = [...this.containerDisabledFields.widgets, ...this.containerDisabledProperties.widgets];

    this.checkAndUpdateEnabled()

    // check, if item still has a ord_num
    for (let i = 0; i < widgets.length; i++) {
      const widget = widgets[i];

      const uiContextConfig = widget.uiContextConfig;

      if (uiContextConfig && uiContextConfig.ord_num !== null) {
        uiContextConfig.ord_num = null;
        this.updateUiContextConfig([uiContextConfig]);
      }
    }

  }

  /**
 * called when a item is dropped or moved in disabled container
 */
  droppedInEnabled($event: any) {
    if ($event) {
      this.checkAndUpdateEnabled()
    }
  }

  checkAndUpdateEnabled() {
    const widgets = this.containerEnabled.widgets;

    const uiPropConfs: ComUiContextConfig[] = []

    // check, if ui_context_config needs update
    for (let i = 0; i < widgets.length; i++) {

      const widget = widgets[i];


      // if there is no uiContextConfig yet
      if (!widget.uiContextConfig && widget.propSet.pk_entity) {
        const newPropConf: ComUiContextConfig = {
          pk_entity: undefined,
          fk_project: undefined,
          fk_property: undefined,
          property_is_outgoing: undefined,
          fk_ui_context: this.pkUiContext,
          fk_class_for_property_set: this.pkClass,
          fk_property_set: widget.propSet.pk_entity,
          ord_num: i
        }

        uiPropConfs.push(newPropConf)

      } else if (widget.uiContextConfig.ord_num != i) {

        const newPropConf: ComUiContextConfig = {
          ...widget.uiContextConfig,
          ord_num: i,
          // fk_project: null
        }

        uiPropConfs.push(newPropConf)
      }
    }

    if (uiPropConfs.length) this.updateUiContextConfig(uiPropConfs);
  }
}
