import { Component, Input, OnInit } from '@angular/core';
import { hasIn, clone } from 'ramda';
import { FormBuilder, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from '../../../../../../node_modules/rxjs';
import { debounceTime, map, mergeMap, startWith, takeUntil, filter, first } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, SysConfig, InfAppellation, InfTextProperty } from '../../../../core';
import { ListDefinition } from '../properties-tree/properties-tree.models';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { FormItem, FormPart, FormPartInitValueRole, FormPartInitValueTextProperty } from './FormPart';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';


export interface FormControlDefinition {
  listDefinition: ListDefinition
  formControlName: string
  sourceValue$: Observable<any>
  // mergeDef: MergeDef
}
export interface FormDef {
  formParts: FormPart[],
  resultTemplate;
  mergeDef: MergeDef
}
// export interface MergeInto {
//   // parent object
//   object: any,
//   // path of the property in the object, where the child needs to be appended
//   appendTo: string[]
//   // whether the child is part of an array (push) or directly attached to the property
//   appendMethod: 'push' | 'set'
// }
export interface MergeDef {
  // path of the property in the parent, where the child needs to be appended
  target: string[]

  targetType: 'object' | 'array'
  sourceType: 'object' | 'array'
  // // whether the child is part of an array (push) or directly attached to the property
  // appendMethod: 'push' | 'set' | 'append'
}

@Component({
  selector: 'gv-create-role-form',
  templateUrl: './create-role-form.component.html',
  styleUrls: ['./create-role-form.component.scss']
})
export class CreateRoleFormComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() listDefinition: ListDefinition;
  @Input() pkEntity: number;


  appContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;


  formGroup: FormGroup;

  value$: Observable<any>
  valueChanges$ = new BehaviorSubject(undefined);

  /**
   * This component creates an iterable object that contains definitions for each part of
   * the form. This definition specifies:
   * - what control component to add in DOM
   * - what formControl to add to that component
   * - wheter a value in this component is required
   * - whether the user can add more of the same elements
   * - a function that processes the resulting control value
   */
  formDef$ = new BehaviorSubject<FormDef>(null)

  submitted = false;
  // mergeInto: MergeInto

  constructor(
    public t: PropertiesTreeService,
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public inf: InfActions,
    public fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({})

    this.value$ = this.formDef$.pipe(filter(x => !!x), mergeMap((formDef) => {
      const controlResult$: Observable<{ sourceValue: any, target: any, mergeDef: MergeDef }>[] = [];
      formDef.formParts.forEach(formPart => formPart.items.filter(i => !!i.formControlDef).forEach(item => {
        controlResult$.push(item.formControlDef.sourceValue$.pipe(startWith(null), map(sourceValue => ({
          sourceValue, mergeDef: formPart.mergeDef, target: formPart.resultTemplate
        }))));
      }));
      return combineLatest(controlResult$)
        .pipe(map((results) => {
          let target = {}
          results.filter(x => x.sourceValue !== null).forEach(result => {
            this.mergeValue(target, result.sourceValue, result.mergeDef);
          });
          return target;
        })).pipe(map(source => {
          const target = clone(formDef.resultTemplate)

          this.mergeValue(target, source, formDef.mergeDef);
          return target;
        }));
    }));

    this.value$.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.valueChanges$.next(val)
    })

  }

  getKey(_, item: FormItem) {
    return _
  }

  ngOnInit() {
    if (this.listDefinition.listType === 'temporal-entity') this.createTeEnForm();

    if (this.listDefinition.listType === 'text-property') this.createTextPropertyForm();

    if (['appellation', 'place', 'language', 'entity-preview'].includes(this.listDefinition.listType)) this.createRoleForm();
  }


  private createTextPropertyForm() {
    this.p.defaultLanguage$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(language => {
      const initTextProperty: FormPartInitValueTextProperty = {
        fkClassField: this.listDefinition.fkClassField,
        value: {
          language,
        } as InfTextProperty
      }
      const mergeDefa: MergeDef = { target: [], targetType: 'object', sourceType: 'object' }
      const formPart$ = new FormPart(this.formGroup, this.listDefinition.label, [this.listDefinition], {
        initListDefinition: this.listDefinition,
        initTextProperty
      }, null, mergeDefa).this$
      const resultTemplate = {
        fk_concerned_entity: this.pkEntity,
        fk_class_field: this.listDefinition.fkClassField,
      } as InfTextProperty;
      const mergeDef: MergeDef = { target: [], targetType: 'object', sourceType: 'object' };
      formPart$.pipe(takeUntil(this.destroy$)).subscribe(formPart => {
        const f: FormDef = { formParts: [formPart], resultTemplate, mergeDef };
        this.formDef$.next(f);
      });
    })
  }

  private createRoleForm() {
    const mergeDefa: MergeDef = { target: [], targetType: 'object', sourceType: 'object' }
    const formPart$ = new FormPart(this.formGroup, this.listDefinition.label, [this.listDefinition], null, null, mergeDefa).this$
    const resultTemplate = this.listDefinition.isOutgoing ?
      {
        fk_temporal_entity: this.pkEntity,
        fk_property: this.listDefinition.pkProperty
      } : {
        fk_entity: this.pkEntity,
        fk_property: this.listDefinition.pkProperty
      };
    const mergeDef: MergeDef = { target: [], targetType: 'object', sourceType: 'object' };
    formPart$.pipe(takeUntil(this.destroy$)).subscribe(formPart => {
      const f: FormDef = { formParts: [formPart], resultTemplate, mergeDef };
      this.formDef$.next(f);
    });
  }


  private createTeEnForm() {
    const initRole: FormPartInitValueRole = {
      targetClass: this.listDefinition.targetClass,
      value: this.pkEntity,
      fkProperty: this.listDefinition.pkProperty,
    };
    const resultTemplate = {
      fk_entity: this.pkEntity,
      fk_property: this.listDefinition.pkProperty,
      temporal_entity: {
        fk_class: this.listDefinition.targetClass,
      }
    };


    const formParts$ = this.c.pipeFieldDefinitions(this.listDefinition.targetClass, this.appContext).pipe(debounceTime(20), mergeMap(fields => {
      // empty formGroup
      Object.keys(this.formGroup.controls).forEach(key => this.formGroup.removeControl(key));
      // map the field to a form part
      return combineLatest(fields.map((field, i) => {
        let resultTemplate;
        let mergeDef: MergeDef;
        if (['appellation', 'place', 'language', 'entity-preview'].includes(field.listType)) {
          resultTemplate = {}
          mergeDef = { target: ['te_roles'], targetType: 'array', sourceType: 'object' }
        }
        if (['time-span'].includes(field.listType)) {
          resultTemplate = {}
          mergeDef = { target: ['te_roles'], targetType: 'array', sourceType: 'array' }
        }
        return new FormPart(this.formGroup, field.label, field.listDefinitions, {
          initListDefinition: this.listDefinition,
          initRole
        }, resultTemplate, mergeDef).this$
      }));
    }));

    const mergeDef: MergeDef = {
      target: ['temporal_entity'],
      targetType: 'object',
      sourceType: 'array'
    };

    formParts$.pipe(takeUntil(this.destroy$)).subscribe(formParts => {
      const f: FormDef = { formParts, resultTemplate, mergeDef };
      this.formDef$.next(f);
    });

  }


  private mergeValue(target: any, source: any, mergeDef: MergeDef) {
    let part = target ? target : mergeDef.targetType === 'array' ? [] : {};

    mergeDef.target.forEach(key => {
      if (!hasIn(key, part)) {
        mergeDef.targetType === 'array' ? part[key] = [] : part[key] = {};
      }
      part = part[key]
    });

    if (mergeDef.targetType === 'array') {
      if (mergeDef.sourceType === 'object') part.push(source)
      else if (mergeDef.sourceType === 'array') {
        source.forEach(s => part.push(s));
      }
    }
    else if (mergeDef.targetType === 'object') {
      Object.assign(part, source)
    }
    return target
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  submit() {
    this.submitted = true
    if (this.formGroup.valid) {
      this.valueChanges$.pipe(first(), takeUntil(this.destroy$)).subscribe(val => {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
          let api;

          if (this.listDefinition.listType !== 'text-property') api = this.inf.role
          else api = this.inf.text_property;

          api.upsert([val], pkProject).resolved$.pipe(takeUntil(this.destroy$)).subscribe(resolved => {
            if (resolved) {
              this.t.showCreateRole$.next(null)
            }
          })
        })
      })
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key).markAsTouched()
      })
    }
  }
}

