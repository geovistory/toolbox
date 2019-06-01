import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActiveProjectService, IAppState, ProjectCrm, SysConfig, Tab, U, UiContext } from 'app/core';
import { AddOption, ClassInstanceLabel, CollapsedExpanded, ExistenceTimeDetail, FieldList, PropertyField, PropertyFieldForm, RoleDetail, TeEntAccentuation, TeEntDetail } from 'app/core/state/models';
import { createExistenceTimeDetail, getCreateOfEditableContext, similarPropertyField, StateSettings } from 'app/core/state/services/state-creator';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { dropLast } from 'ramda';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { RootEpics } from '../../../../../core/store/epics';
import { slideInOut } from '../../../shared/animations';
import { EntityBase } from '../../entity.base';
import { EntityAPIEpics } from '../../entity.epics';
import { TeEntDetailAPIActions } from './api/te-ent-detail.actions';
import { TeEntDetailAPIEpics } from './api/te-ent-detail.epics';
import { teEntDetailReducer } from './api/te-ent-detail.reducer';

export function getTeEntAddOptions(
  fkClass$: Observable<number>,
  pkUiContext$: Observable<number>,
  crm$: Observable<ProjectCrm>,
  parentPropertyField$: Observable<PropertyField>,
  _fields$: Observable<FieldList>
): Observable<AddOption[]> {
  return combineLatest(fkClass$, pkUiContext$, crm$, parentPropertyField$, _fields$).pipe(
    // only pass if no undefined value
    filter((d) => {
      const b = (d.filter(item => (item === undefined)).length === 0)
      return b;
    }),
    map((d) => {
      const fkClass = d[0], pkUiContext = d[1], crm = d[2], excludePropertyField = d[3], fields = d[4];

      const classConfig = crm.classes[fkClass];
      const uiContexts = classConfig.uiContexts[pkUiContext];
      const uiElements = !uiContexts ? [] : uiContexts.uiElements;

      // store the for each propertyField that is an inherited property.
      const inheritedPropertyFields = new Set();
      U.obj2Arr(fields)
        .filter(field => (field.type === 'PropertyField'))
        .forEach((field) => {
          const f = field as PropertyField;
          if (f.property.dfh_fk_property_of_origin) {
            inheritedPropertyFields.add(f.isOutgoing + '_' + f.property.dfh_fk_property_of_origin)
          }
        });


      return uiElements.map(el => {
        if (

          fields && el.fk_property && !fields[el.propertyFieldKey] &&
          !inheritedPropertyFields.has(el.property_is_outgoing + '_' + (crm.fieldList[el.propertyFieldKey] as PropertyField).property.dfh_fk_property_of_origin) &&
          !similarPropertyField(classConfig.propertyFields[el.propertyFieldKey], excludePropertyField)
        ) {
          const propertyField = crm.fieldList[el.propertyFieldKey];
          return {
            label: propertyField.label.default,
            uiElement: el,
            added: false
          };
        } else if (fields && el.fk_class_field && !fields[el.propSetKey]) {
          return {
            label: el.class_field.label,
            uiElement: el,
            added: false
          };
        }
      }).filter(o => (o));
    })
  )
}

@WithSubStore({
  localReducer: teEntDetailReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-te-ent-editable',
  templateUrl: './te-ent-editable.component.html',
  styleUrls: ['./te-ent-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeEntEditableComponent extends EntityBase implements TabLayoutComponentInterface {

  @Input() basePath: string[];
  @Input() asPeItChild: boolean;
  @Input() pkEntity: number;
  @Input() tab: Tab;

  parentPath: string[];

  localStore: ObservableStore<TeEntDetail>;

  // Visibility of right area
  @select() showRightArea$: Observable<boolean>;

  @select() toggle$: Observable<boolean>
  @select() _field_48$: Observable<ExistenceTimeDetail>; // TODO check if needed
  @select() _existenceTime_edit$: Observable<ExistenceTimeDetail>; // TODO check if needed
  @select() accentuation$: Observable<TeEntAccentuation>;
  @select() editing$: Observable<boolean>;
  @Output() onLabelChange = new EventEmitter<{ teEn: ClassInstanceLabel, cla: string }>();

  addOptionsTeEnt$: Observable<AddOption[]>;

  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];

  /**
   * Other Store Observables
   */
  showOntoInfo$: Observable<boolean>
  showCommunityStats$: Observable<boolean>
  parentPropertyField$: Observable<PropertyField> = new BehaviorSubject(null);

  /**
   * Class properties that filled by a store observable
   */
  parentRoleState: RoleDetail;
  teEnState: TeEntDetail;

  uiContext: UiContext;

  // used for storing previous accentuation when mouse enters
  previousAccentuation: TeEntAccentuation;


  t: TabLayout;

  constructor(
    protected rootEpics: RootEpics,
    protected entityEpics: EntityAPIEpics,
    protected epics: TeEntDetailAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    protected actions: TeEntDetailAPIActions,
    protected fb: FormBuilder,
    public ref: ChangeDetectorRef,
    private p: ActiveProjectService,
  ) {
    super(ngRedux, fb, rootEpics, entityEpics);

  }

  getBasePath = () => this.basePath;

  /**
   * Methods
   */
  // gets called by base class onInit
  initStore() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, teEntDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this))

    if (!this.asPeItChild) {
      this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

      this.showRightArea$.pipe(first(b => b !== undefined), takeUntil(this.destroy$)).subscribe((b) => {
        this.t.setShowRightArea(b)
      })

      combineLatest(
        this.p.pkProject$,
        this.p.crm$
      ).pipe(first((x => !x.includes(undefined) && !!this.tab)), takeUntil(this.destroy$))
        .subscribe(([pkProject, crm]) => {
          this.localStore.dispatch(this.actions.load(
            this.pkEntity,
            pkProject,
            this.tab.data.teEntDetailConfig.teEntDetail,
            this.tab.data.teEntDetailConfig.stateSettings,
            crm
          ))
        })
    }
  }


  // gets called by base class onInit
  init() {

    this.initPaths()

    // this.uiContext = this.classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE];

    this.initObservablesOutsideLocalStore();

    this.initTeEntSubscriptions();

  }

  destroy() {

  }

  /**
   * init paths to different slices of the store
   */
  initPaths() {
    this.parentPath = dropLast(1, this.basePath)
    // transforms e.g.  ['information', 'entityEditor', 'peItState', 'propertyFields', '1', '_role_list', '79060']
    // to               ['information', 'entityEditor', 'peItState']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 4));

  }

  /**
   * init observables to other slices of the store than the local store
   * (to select observables from local store, use @select decorator)
   */
  initObservablesOutsideLocalStore() {
    this.showOntoInfo$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'showOntoInfo']);

    if (this.asPeItChild) this.parentPropertyField$ = this.ngRedux.select<PropertyField>(this.parentPath.slice(0, (this.parentPath.length - 2)));

  }

  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initTeEntSubscriptions() {

    this.ngRedux.select<RoleDetail>(this.parentPath).takeUntil(this.destroy$).subscribe(d => this.parentRoleState = d)

    this.localStore.select<TeEntDetail>('').takeUntil(this.destroy$).subscribe(d => {
      this.teEnState = d
    })

    this.addOptionsTeEnt$ = getTeEntAddOptions(this.fkClass$, this.pkUiContext$, this.crm$, this.parentPropertyField$, this._fields$)
  }


  addOptionSelected($event) {

    const o: AddOption = $event.item;

    // if this option is already added
    if (o.added) {

      this.stopSelectProperty();

    } else {

      if (o.uiElement.propertyFieldKey) {

        // if this is a role set

        // prepare the PropertyField

        const newPropertyField = {
          ...new PropertyField(this.classConfig.propertyFields[o.uiElement.propertyFieldKey]),
          toggle: 'expanded' as CollapsedExpanded,
          rolesNotInProjectLoading: true,
          roleStatesInOtherProjectsVisible: false,
          _property_field_form: new PropertyFieldForm()
        }

        this.addPropertyField(newPropertyField, undefined)

      } else if (o.uiElement.fk_class_field) {

        // if this is a prop set
        // TODO make this generic for all class fields
        if (o.uiElement.fk_class_field === SysConfig.PK_CLASS_FIELD_WHEN) {

          const settings: StateSettings = {
            pkUiContext: getCreateOfEditableContext(this.localStore.getState().pkUiContext)
          }

          const extDetail = createExistenceTimeDetail(new ExistenceTimeDetail({ toggle: 'expanded' }), [], this.ngRedux.getState().activeProject.crm, settings)
          this.addPropSet('_field_48', extDetail)

        }

      }

    }

  }



  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }

  click() {
    if (this.localStore.getState().accentuation !== 'selected') {
      this.localStore.dispatch(this.actions.setAccentuation('selected'))
    } else {
      this.localStore.dispatch(this.actions.setAccentuation('highlighted'))
    }
  }


  mouseenter() {
    if (this.localStore.getState().accentuation !== 'selected') {
      this.localStore.dispatch(this.actions.setAccentuation('highlighted'))
    }
  }

  mouseleave() {
    if (this.localStore.getState().accentuation === 'highlighted') {
      this.localStore.dispatch(this.actions.setAccentuation('none'))
    }
  }

  startEditing() {
    this.localStore.dispatch(this.actions.startEditing())
  }

  stopEditing() {
    this.localStore.dispatch(this.actions.stopEditing())
  }
}
