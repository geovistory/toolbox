import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WithSubStore, select } from '@angular-redux/store';
import { roleSetReducer } from '../../role-set.reducer';
import { Observable, Subscription } from 'rxjs';
import { RoleSetForm, RoleDetailList } from '../../../information.models';
import { InfRole } from 'app/core';


@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
@Component({
  selector: 'gv-te-ent-role-set-form',
  templateUrl: './te-ent-role-set-form.component.html',
  styleUrls: ['./te-ent-role-set-form.component.scss']
})
export class TeEntRoleSetFormComponent implements OnInit, OnDestroy {

  @Input() parentPath: string[];

  @select() _role_set_form$: Observable<RoleSetForm>

  role_set_form: RoleSetForm;
  role_create_list: RoleDetailList;
  role_add_list: RoleDetailList;


  getBasePath = () => [...this.parentPath];

  roleCreateListPath:string[];

  subs: Subscription[] = []; // for unsubscribe onDestroy

  formGroup: FormGroup; // formGroup to create roles

  constructor(protected fb: FormBuilder) {
    this.initForm();

    this.initFormSubscription();

  }

  ngOnInit() {
    this.roleCreateListPath = [...this.parentPath, '_role_set_form'];

    this.subs.push(
      this._role_set_form$.subscribe(d => {
        this.role_set_form = d;
        if (d)
          this.role_create_list = d._role_create_list;

        this.initFormCtrls();

      })
    )
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }



  /**
 * Inits the formGroup used in template.
 */
  initForm() {
    //   create the formGroup used to create/edit the roleSet's InfRole[]
    this.formGroup = this.fb.group({});
  }


  /**
   * Subcscibes to form value changes
   */
  initFormSubscription() {

    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

      }

    }))
  }

  /**
    * Initializes the form controls
   */
  initFormCtrls() {

    let formCtrlDefs: { [controlName: string]: any } = {};
    let formCrtlsToRemove: string[] = [];

    // add controls for each child roleSet
    if (this.role_set_form && this.role_set_form._role_create_list)
      Object.keys(this.role_set_form._role_create_list).forEach((key) => {
        const roleDetail = this.role_set_form._role_create_list[key]
        if (roleDetail) {

          this.formGroup.addControl(key, new FormControl(
            roleDetail.role,
            [
              Validators.required
            ]
          ))


        }
      })

  }

  submit(){
    // (click)="createRoles()"
  }


}
