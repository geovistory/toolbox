import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, CtrlTimeSpanDialogData, CtrlTimeSpanDialogResult, DisplayType, Field, SectionName } from '@kleiolab/lib-redux';
import { indexBy, mapObjIndexed, omit, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { FormPart, MergeDef } from './FormPart';
import { ByPk } from '@kleiolab/lib-utils';
import { ValidationService } from '../../../../../core/validation/validation.service';

export type ExTimeModalMode = 'one-date' | 'begin-end' | 'advanced';
export type ExTimeHelpMode = 'hidden' | 'short' | 'long';

interface TimeSpanFormDef {
  formParts: FormPart[]
}
interface Cname {
  _150_outgoing?: string
  _151_outgoing?: string
  _152_outgoing?: string
  _153_outgoing?: string
  _71_outgoing?: string
  _72_outgoing?: string
}


interface F {
  _150_outgoing?: FormPart;
  _151_outgoing?: FormPart;
  _152_outgoing?: FormPart;
  _153_outgoing?: FormPart;
  _71_outgoing?: FormPart;
  _72_outgoing?: FormPart;
}

@Component({
  selector: 'gv-ctrl-time-span-dialog',
  templateUrl: './ctrl-time-span-dialog.component.html',
  styleUrls: ['./ctrl-time-span-dialog.component.scss']
})
export class CtrlTimeSpanDialogComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  showOntoInfo$: Observable<boolean>;
  helpMode$ = new BehaviorSubject<ExTimeHelpMode>('hidden');
  mode$ = new BehaviorSubject<ExTimeModalMode>('one-date')

  formGroup: UntypedFormGroup;
  fieldDefinitions$: Observable<ByPk<Field>>

  formDef$ = new BehaviorSubject<TimeSpanFormDef>(null)

  // Map of FormControlNames while the key is
  // '_150_outgoing' ect. and the value is a UUID
  // 09i09d09ajsd09asjd09asjdaöosidjöaoda09sdnuö
  cName: Cname


  // Map of key like '_150_outgoing' to state of activation
  active: { [key: string]: boolean }
  // map of pkProperty to key like '_150_outgoing'
  properties: { [pkPropery: string]: string }

  f: F

  constructor(public dialogRef: MatDialogRef<CtrlTimeSpanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlTimeSpanDialogData,
    protected validationService: ValidationService,
    protected fb: UntypedFormBuilder,
    private c: ConfigurationPipesService,
  ) {
    this.createFormGroup()
  }
  /**
 * Inits the formGroup used in template
 */
  createFormGroup() {
    this.formGroup = this.fb.group(
      {},
      {
        validator: (fg) => {
          if (this.cName) {
            const has = (ctrlName: string) => {
              if (fg.get(this.cName[ctrlName]).value) return true;
              else return false;
            }

            // The begin of 'Earliest possible begin' must be earlier than the end of 'Latest possible end'
            if (has('_152_outgoing') && has('_153_outgoing')) {
              this.validationService.mustBeginBeforeEnd(this.cName['_152_outgoing'], this.f['_152_outgoing'].title, this.cName['_153_outgoing'], this.f['_153_outgoing'].title)(fg);
            }
            // The begin of 'Begin' must be earlier than the end of 'End'
            if (has('_150_outgoing') && has('_151_outgoing')) {
              this.validationService.mustBeginBeforeEnd(this.cName['_150_outgoing'], this.f['_150_outgoing'].title, this.cName['_151_outgoing'], this.f['_151_outgoing'].title)(fg);
            }
            // 'Begin' can't begin before 'Earliest possible begin'
            if (has('_150_outgoing') && has('_152_outgoing')) {
              this.validationService.cantBeginBeforeBegin(this.cName['_150_outgoing'], this.f['_150_outgoing'].title, this.cName['_152_outgoing'], this.f['_152_outgoing'].title)(fg);
            }
            // 'Begin' can't begin before 'At some time within'
            if (has('_150_outgoing') && has('_72_outgoing')) {
              this.validationService.cantBeginBeforeBegin(this.cName['_150_outgoing'], this.f['_150_outgoing'].title, this.cName['_72_outgoing'], this.f['_72_outgoing'].title)(fg);
            }
            // 'Latest possible end' can't end before 'End'
            if (has('_153_outgoing') && has('_151_outgoing')) {
              this.validationService.cantEndBeforeEnd(this.cName['_153_outgoing'], this.f['_153_outgoing'].title, this.cName['_151_outgoing'], this.f['_151_outgoing'].title)(fg);
            }
            // 'Latest possible end' can't end before 'End'
            if (has('_153_outgoing') && has('_151_outgoing')) {
              this.validationService.cantEndBeforeEnd(this.cName['_153_outgoing'], this.f['_153_outgoing'].title, this.cName['_151_outgoing'], this.f['_151_outgoing'].title)(fg);
            }
            // 'Latest possible end' can't end before  'Ongoing throughout'
            if (has('_153_outgoing') && has('_71_outgoing')) {
              this.validationService.cantEndBeforeEnd(this.cName['_153_outgoing'], this.f['_153_outgoing'].title, this.cName['_71_outgoing'], this.f['_71_outgoing'].title)(fg);
            }
            // 'At some time within' can't end before 'End'
            if (has('_72_outgoing') && has('_151_outgoing')) {
              this.validationService.cantEndBeforeEnd(this.cName['_72_outgoing'], this.f['_72_outgoing'].title, this.cName['_151_outgoing'], this.f['_151_outgoing'].title)(fg);
            }
            // 'At some time within' can't end before 'Ongoing throughout'
            if (has('_72_outgoing') && has('_71_outgoing')) {
              this.validationService.cantEndBeforeEnd(this.cName['_72_outgoing'], this.f['_72_outgoing'].title, this.cName['_71_outgoing'], this.f['_71_outgoing'].title)(fg);
            }
            // 'Ongoing throughout' can't begin before 'At some time within'
            if (has('_71_outgoing') && has('_72_outgoing')) {
              this.validationService.cantBeginBeforeBegin(this.cName['_71_outgoing'], this.f['_71_outgoing'].title, this.cName['_72_outgoing'], this.f['_72_outgoing'].title)(fg);
            }
            // 'Ongoing throughout' can't begin before 'Earliest possible begin'
            if (has('_71_outgoing') && has('_152_outgoing')) {
              this.validationService.cantBeginBeforeBegin(this.cName['_71_outgoing'], this.f['_71_outgoing'].title, this.cName['_152_outgoing'], this.f['_152_outgoing'].title)(fg);
            }
          }
          // this.validationService.mustNotIntersect('endBeg', 'End of Begin', 'begEnd', 'Begin of End')(fg);
        }
      }
    );
  }


  ngOnInit() {

    this.createTimeSpanForm()

    const hasOnly = (key: number[], d: CtrlTimeSpanDialogResult): boolean => {
      const others = omit(key.map(k => k.toString()), d)
      for (const i of values(others)) {
        if (i.julianDay) return false
      }
      return true
    }

    if (!this.data.timePrimitives) this.mode$.next('one-date')
    else if (hasOnly([72], this.data.timePrimitives)) this.mode$.next('one-date')
    else if (hasOnly([150, 151], this.data.timePrimitives)) this.mode$.next('begin-end')
    else this.mode$.next('advanced')

  }




  /**
  * Takes the given statement sets and adds a form control for each of them.
  * Called by this class during ngOninit.
  */
  createTimeSpanForm() {

    const formParts$ = this.c.pipeSection(50, DisplayType.form, SectionName.timeSpan).pipe(
      debounceTime(20),
      map(fields => fields.filter(f => DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.includes(f.property.fkProperty))),
      mergeMap(fields => {
        // empty formGroup
        Object.keys(this.formGroup.controls).forEach(key => this.formGroup.removeControl(key));
        // map the field to a form part
        return combineLatest(fields.map((field, i) => {
          const resultTemplate = {}
          const mergeDef: MergeDef = undefined

          // mergeDef = { target: ['te_statements'],  }
          return new FormPart(
            this.formGroup,
            field.label,
            field,
            DfhConfig.CLASS_PK_TIME_PRIMITIVE,
            {
              initTimeSpan: this.data.timePrimitives
            },
            resultTemplate,
            mergeDef,
            false,
          ).this$
        }));
      }));

    formParts$.pipe(takeUntil(this.destroy$)).subscribe(formParts => {

      const ar = formParts.map(fp => ({
        key: '_' + fp.items[0].formControlDef.field.property.fkProperty + '_outgoing',
        val: fp
      })) as { key: keyof F, val: FormPart }[]
      this.f = mapObjIndexed((val: { key: string; val: FormPart; }, key, obj) => val.val, indexBy((f) => f.key, ar))

      this.cName = mapObjIndexed((val: FormPart) => val.items[0].formControlDef.formControlName, this.f)
      this.active = mapObjIndexed((val, key, obj) => false, this.f)
      this.properties = mapObjIndexed((val: { key: string; val: FormPart; }, key, obj) => val.key, indexBy((f) => f.val.field.property.fkProperty.toString(), ar))

      const f: TimeSpanFormDef = { formParts };
      this.formDef$.next(f);
    });

  }

  /**
 *
 * @param key key of the formPart to activate
 * @param inheritFrom array of keys of the formPart of which the value should be inherited
 * @param replace array of keys of formPart that should be removed, when this is added
 */
  activate(key: string) {
    const ctrl = this.getCtrl(key)
    // if this form control has no value yet
    if (!ctrl.value) {

      let inheritFrom: string[]
      let replace: string[]

      switch (key) {
        case '_72_outgoing':
          inheritFrom = ['_152_outgoing', '_153_outgoing'];
          replace = ['_152_outgoing', '_153_outgoing'];
          break;
        case '_152_outgoing':
          inheritFrom = ['_72_outgoing', '_153_outgoing'];
          replace = ['_72_outgoing'];
          break;
        case '_153_outgoing':
          inheritFrom = ['_72_outgoing', '_152_outgoing'];
          replace = ['_72_outgoing'];
          break;
        case '_71_outgoing':
          inheritFrom = ['_150_outgoing', '_151_outgoing'];
          replace = ['_150_outgoing', '_151_outgoing'];
          break;
        case '_150_outgoing':
          inheritFrom = ['_71_outgoing', '_151_outgoing'];
          replace = ['_71_outgoing'];
          break;
        case '_151_outgoing':
          inheritFrom = ['_71_outgoing', '_150_outgoing'];
          replace = ['_71_outgoing'];
          break;
        default:
          break;

      }
      // inherit from
      for (const k of inheritFrom) {
        const val = this.getCtrl(k).value;
        if (val) {
          ctrl.setValue(val);
          break;
        }
      }

      // replace
      for (const k2 of replace) {
        if (this.getCtrl(k2).value) {
          this.getCtrl(k2).setValue(null)
        }
      }
    }

  }
  getCtrl(key: string): AbstractControl {
    return this.formGroup.get(this.cName[key]);
  }

  onSubmit() {
    if (this.formGroup.valid) {

      const result: CtrlTimeSpanDialogResult = {}

      Object.keys(this.properties).forEach(pkProp => {
        const ctrlKey = this.properties[pkProp]
        const pkProperty = parseInt(pkProp)
        if (this.getCtrl(ctrlKey).value) {
          result[pkProperty] = this.getCtrl(ctrlKey).value
        }
      })

      if (this.data.beforeCloseCallback) {
        const x$ = this.data.beforeCloseCallback(result)
        x$.pipe(first(), takeUntil(this.destroy$)).subscribe(
          () => {
            this.dialogRef.close()
          },

        )
      } else {
        this.dialogRef.close(result)
      }


    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          this.formGroup.get(key).markAsTouched()
        }
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  switchMode(m: ExTimeModalMode) {
    if (m === 'one-date') {
      ['_152_outgoing', '_153_outgoing', '_71_outgoing', '_150_outgoing', '_151_outgoing'].forEach(key => {
        this.getCtrl(key).setValue(null)
      })
      this.mode$.next('one-date')
    }
    else if (m === 'begin-end') {
      ['_72_outgoing', '_152_outgoing', '_153_outgoing', '_71_outgoing'].forEach(key => {
        this.getCtrl(key).setValue(null)
      })
      this.mode$.next('begin-end')
    } else {
      this.mode$.next('advanced')
    }
  }

  selectedTabChange(i) {
    const tabs: ExTimeModalMode[] = ['one-date', 'begin-end', 'advanced'];
    this.switchMode(tabs[i])
  }

  setHelpMode(m: ExTimeHelpMode) {
    this.helpMode$.next(m)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getErrorMessage(formControl: AbstractControl) {
    for (const propertyName in formControl.errors) {
      if (formControl.errors[propertyName] && formControl.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, formControl.errors[propertyName]);
      }
    }

    return null;
  }
}
