import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppState, ProClassFieldConfig, SysConfig } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { ClassUiContext, Container } from '../../backoffice.models';
import { ClassUiContextAPIActions } from './api/class-ui-context.actions';
import { ClassUiContextAPIEpics } from './api/class-ui-context.epics';
import { classUiContextReducer } from './api/class-ui-context.reducer';



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

  public readonly PK_UI_CONTEXT_DATAUNITS_EDITABLE = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
  public readonly PK_UI_CONTEXT_DATAUNITS_CREATE = SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;


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
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
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

  getBasePath = () => ['backoffice', 'classDetail', 'uiContext'];

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

    const uiPropConfs: ProClassFieldConfig[] = []

    // check, if ui_context_config needs update
    for (let i = 0; i < widgets.length; i++) {

      const widget = widgets[i];


      // if there is no uiContextConfig yet
      if (!widget.uiContextConfig && widget.propSet.pk_entity) {
        const newPropConf: ProClassFieldConfig = {
          pk_entity: undefined,
          fk_project: undefined,
          fk_property: undefined,
          fk_class: undefined,
          property_is_outgoing: undefined,
          fk_app_context: this.pkUiContext,
          fk_class_for_class_field: this.pkClass,
          fk_class_field: widget.propSet.pk_entity,
          ord_num: i
        }

        uiPropConfs.push(newPropConf)

      } else if (widget.uiContextConfig.ord_num != i) {

        const newPropConf: ProClassFieldConfig = {
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