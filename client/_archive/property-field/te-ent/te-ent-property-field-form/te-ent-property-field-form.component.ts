import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IAppState, ProInfoProjRel, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { RoleDetail, PropertyField, TeEntDetail } from 'app/core/state/models';
import { createRoleDetail, createPropertyField, getCreateOfEditableContext, StateSettings, createRoleDetailList } from 'app/core/state/services/state-creator';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { combineLatest, timer, Observable } from 'rxjs';
import { teEntReducer } from '../../../entity/te-ent/te-ent.reducer';
import { ClassService } from '../../../shared/class.service';
import { PropertyFieldFormBase } from '../../property-field-form.base';
import { PropertyFieldActions } from '../../property-field.actions';
import { propertyFieldReducer } from '../../property-field.reducer';
import { first, takeUntil } from '../../../../../../../node_modules/rxjs/operators';



@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: propertyFieldReducer
})
@Component({
  selector: 'gv-te-ent-property-field-form',
  templateUrl: './te-ent-property-field-form.component.html',
  styleUrls: ['./te-ent-property-field-form.component.scss']
})
export class TeEntPropertyFieldFormComponent extends PropertyFieldFormBase {


  @Input() parentTeEntPath: string[];

  parentTeEnt$: Observable<TeEntDetail>;

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected ref: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected actions: PropertyFieldActions,
    protected roleApi: InfRoleApi,
    protected classService: ClassService,
    private teEnApi: InfTemporalEntityApi

  ) {
    super(fb, ngRedux, ref, actions)

  }

  submit() {
    // (click)="createRoles()"
  }

  initPropertyFieldFormBaseChild(): void {
    this.parentTeEnt$ = this.ngRedux.select<TeEntDetail>(this.parentTeEntPath)

    this.loadAlternativeRoles()
  }


  loadAlternativeRoles() {

    this.parentTeEnt$.pipe(first(), takeUntil(this.destroy$)).subscribe(ps => {

      const s = this.localStore.getState();

      const fkProperty = s.property.dfh_pk_property;
      const fkTemporalEntity = ps.teEnt.pk_entity;
      const fkProject = this.ngRedux.getState().activeProject.pk_project;

      const waitAtLeast = timer(800);
      const apiCall = this.roleApi.alternativesNotInProjectByTeEntPk(fkTemporalEntity, fkProperty, fkProject)

      this.subs.push(combineLatest([waitAtLeast, apiCall])
        .subscribe((results) => {

          const rolesInOtherProjects = results[1].filter(role => parseInt(role.is_in_project_count, 10) > 0);
          const rolesInNoProject = results[1].filter(role => parseInt(role.is_in_project_count, 10) == 0);


          // update the state
          const roleDetailsInOtherProjects = createRoleDetailList(
            new PropertyField(this.localStore.getState()),
            rolesInOtherProjects,
            this.ngRedux.getState().activeProject.crm,
            {
              isViewMode: true,
              pkUiContext: this.localStore.getState().pkUiContext
            }
          );
          const roleDetailsInNoProjects = createRoleDetailList(
            new PropertyField(this.localStore.getState()),
            rolesInNoProject,
            this.ngRedux.getState().activeProject.crm,
            {
              isViewMode: true,
              pkUiContext: this.localStore.getState().pkUiContext
            }
          );
          this.localStore.dispatch(this.actions.alternativeRolesLoaded(
            roleDetailsInOtherProjects,
            roleDetailsInNoProjects
          ))


          if (rolesInOtherProjects.length === 0) {
            this.startCreateNewRole();
          } else {
            this.initAddFormCtrls(roleDetailsInOtherProjects)
          }
        }))
    })

  }


  /**
  * Called when user clicks on create new or when loading alternative roles returned 0 alt. roles
  * Creates a new RoleDetail of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {
    this.parentTeEnt$.pipe(first(), takeUntil(this.destroy$)).subscribe(ps => {

      const s = this.localStore.getState();

      const roleToCreate = {
        fk_property: s.property.dfh_pk_property,
        fk_temporal_entity: ps.teEnt.pk_entity,
      } as InfRole;

      const options: RoleDetail = { targetClassPk: s.targetClassPk, isOutgoing: s.isOutgoing }

      const settings: StateSettings = {
        pkUiContext: getCreateOfEditableContext(s.pkUiContext)
      }
      // initialize the state
      const roleStateToCreate = createRoleDetail(options, roleToCreate, this.ngRedux.getState().activeProject.crm, settings)
      this.initCreateFormCtrls(roleStateToCreate)
    })

  }


  createRoles() {
    this.parentTeEnt$.pipe(first(), takeUntil(this.destroy$)).subscribe(ps => {

      const s = this.localStore.getState();

      if (this.createForm.valid) {

        // prepare teEnt
        const t = new InfTemporalEntity(ps.teEnt);
        t.te_roles = [];

        Object.keys(this.createForm.controls).forEach(key => {
          if (this.createForm.get(key)) {
            const role: InfRole = this.createForm.get(key).value;
            role.entity_version_project_rels = [{ is_in_project: true } as ProInfoProjRel]
            // add roles to create to peIt
            t.te_roles.push(role)
          }
        })

        // call api
        this.subs.push(this.teEnApi.findOrCreateInfTemporalEntity(this.ngRedux.getState().activeProject.pk_project, t).subscribe(teEnts => {
          const roles: InfRole[] = teEnts[0].te_roles;


          // update the form group
          Object.keys(this.createForm.controls).forEach(key => {
            this.createForm.removeControl(key)
          })


          // update the state
          const propertyField = createPropertyField(
            new PropertyField({ isOutgoing: s.isOutgoing, property: s.property }),
            roles,
            this.ngRedux.getState().activeProject.crm,
            { pkUiContext: s.pkUiContext }
          )
          this.localStore.dispatch(this.actions.rolesCreated(propertyField._role_list))

        }))
      }
    })
  }

  addRoles() {
    const s = this.localStore.getState();

    if (this.addForm.valid) {

      // get pk_entities of roles selected by user
      const pk_roles = [];
      Object.keys(this.addForm.controls).forEach(key => {
        if (this.addForm.get(key)) {
          // add roles to pk_entity-array
          pk_roles.push(s._property_field_form._role_add_list[key].role.pk_entity)
        }
      })

      this.localStore.dispatch(this.actions.addRolesWithoutTeEnt(pk_roles))

    }
  }

  /**
  *  called when user cancels to create new roles
  *
  */
  cancelCreateRoles() {

    /** remove the RoleState from state */
    this.localStore.dispatch(this.actions.stopCreateNewRole());

  }
}