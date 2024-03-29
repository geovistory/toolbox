import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { LabelPart, LabelPartField, ProEntityLabelConfig, ProjectConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
export interface EntityLabelConfigDialogData {
  fkProject: number,
  fkClass: number
}
interface SelectFieldOption {
  label: string,
  id: string
  removedFromAllProfiles: boolean
}
interface FieldId { fkProperty: number, isOutgoing: boolean }


@Component({
  selector: 'gv-entity-label-config-dialog',
  templateUrl: './entity-label-config-dialog.component.html',
  styleUrls: ['./entity-label-config-dialog.component.scss']
})
export class EntityLabelConfigDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  labelParts = new FormArray([], [Validators.required]);
  form: FormGroup;
  loading = false;
  defaultConfig: ProEntityLabelConfig;
  editing = false;
  fields$: Observable<SelectFieldOption[]>
  classLabel$: Observable<string>

  shouldDeleteCustomConfig = false;
  submitted = false;

  // The max number of fields contributing to entity label
  maxLabelFieldNumber = 10;


  constructor(
    public dialogRef: MatDialogRef<EntityLabelConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityLabelConfigDialogData,
    private projectConfigApi: ProjectConfigurationService,
    c: ConfigurationPipesService,
    public dialog: MatDialog

  ) {
    if (!data.fkClass) console.error('You must provide a fkClass.')
    if (!data.fkProject) console.error('You must provide a fkProject.')

    this.form = new FormGroup({
      'labelParts': this.labelParts
    })

    this.fields$ = c.pipeFields(data.fkClass).pipe(
      map(items => {
        return items
          .map(item => {
            const option: SelectFieldOption = {
              label: item.label,
              id: fieldIdToString({
                fkProperty: item.property.fkProperty,
                isOutgoing: item.isOutgoing
              }),
              removedFromAllProfiles: item.allSubfieldsRemovedFromAllProfiles
            }
            return option
          })
      })
    )
    this.classLabel$ = c.pipeClassLabel(data.fkClass)

  }

  ngOnInit() {
    this.loadConfig()
  }

  loadConfig() {
    this.loading = true
    this.projectConfigApi.createProjectConfigControllerGetEntityLabelConfig(
      this.data.fkProject,
      this.data.fkClass
    )
      .pipe(first())
      .subscribe(
        res => {

          this.defaultConfig = res.defaultConfig;

          let customLabelParts: LabelPart[];
          if (res.customConfig) customLabelParts = res.customConfig.config.labelParts
          // if we have a custom config ...
          if (customLabelParts && customLabelParts.length) {

            // ...show custom config
            for (const labelPart of customLabelParts) {
              this.addLabelPartFg(labelPart.field);
            }
            this.editing = true

          }
          // else if we have a default config ...
          else if (this.defaultConfig) {
            // ... show default config
            this.setFormToDefault();
          }
          // else...
          else {
            // ... show empty form with one empty labelPart
            this.editing = true;
            this.addLabelPartFg()
          }


          this.loading = false


        }, rej => {
          this.loading = false
          // TODO handle error
        }
      )
  }

  public addLabelPartFg(field?: LabelPartField) {
    this.labelParts.push(this.createLabelPartFromGroup(field));
  }

  public removeLabelPartFg(index: number) {
    this.labelParts.removeAt(index)
  }

  createLabelPartFromGroup(field?: LabelPartField) {
    let fieldId: string | null = null;
    let nrOfStmts = 1;
    if (field) {
      fieldId = fieldIdToString({ fkProperty: field.fkProperty, isOutgoing: field.isOutgoing })
      nrOfStmts = field.nrOfStatementsInLabel
    }
    return new FormGroup({
      'fieldId': new FormControl(fieldId, [
        Validators.required
      ]),
      'nrOfStmts': new FormControl(nrOfStmts, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ])
    })
  }

  saveConfig() {
    this.submitted = true
    if (this.shouldDeleteCustomConfig) {
      // delete config of this project
      this.deleteCustomConfig();
    }
    else if (this.form.valid) {
      this.loading = true
      // generate ProEntityLabelConfig
      const result: ProEntityLabelConfig = this.generateCustomConfig()
      // upsert it
      this.upsertCustomConfig(result);

    } else {
      this.form.markAllAsTouched()
    }
  }

  private deleteCustomConfig() {
    this.projectConfigApi.createProjectConfigControllerDeleteEntityLabelConfig(
      this.data.fkProject,
      this.data.fkClass,
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.classLabel$.pipe(first()).subscribe(classLabel => {
          const data: ConfirmDialogData = {
            hideNoButton: true,
            noBtnText: '',
            yesBtnText: 'Acknowledge',
            title: 'Success',
            paragraphs: [
              'The default Geovistory configuration has been restored.',
              `In a few seconds, all your ${classLabel}-entities will be updated with new labels.`,
            ]
          };
          this.dialog.open(ConfirmDialogComponent, { data });
          this.dialogRef.close();
        }, rej => { });
      });
  }

  private upsertCustomConfig(result: ProEntityLabelConfig) {
    this.projectConfigApi.createProjectConfigControllerPostEntityLabelConfig(result)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.classLabel$.pipe(first()).subscribe(classLabel => {
          const data: ConfirmDialogData = {
            hideNoButton: true,
            noBtnText: '',
            yesBtnText: 'Acknowledge',
            title: 'Success',
            paragraphs: [
              'Your configuration has been saved.',
              `In a few seconds, all your ${classLabel}-entities will be updated with new labels.`,
            ]
          };
          this.dialog.open(ConfirmDialogComponent, { data });
          this.dialogRef.close();
        });
      }, rej => { });
  }

  private generateCustomConfig(): ProEntityLabelConfig {
    return {
      fk_class: this.data.fkClass,
      fk_project: this.data.fkProject,
      config: {
        labelParts: this.labelParts.value.map((item: {
          fieldId: string;
          nrOfStmts: number;
        }, i) => {
          const fieldId: FieldId = stringToFieldId(item.fieldId);
          const labelPart: LabelPart = {
            field: {
              fkProperty: fieldId.fkProperty,
              isOutgoing: fieldId.isOutgoing,
              nrOfStatementsInLabel: item.nrOfStmts
            },
            ordNum: i
          };
          return labelPart
        })
      }
    };
  }

  restoreDefault() {
    this.shouldDeleteCustomConfig = true
    this.setFormToDefault();
  }




  private setFormToDefault() {
    this.editing = false;
    this.removeLabelParts();
    // set default config to form vals and make all controls disabled
    for (const p of this.defaultConfig.config.labelParts) {
      this.addLabelPartFg(p.field);
    }
    this.form.disable();
  }

  createOwn() {
    this.shouldDeleteCustomConfig = false
    this.editing = true
    this.removeLabelParts();
    this.addLabelPartFg()
    this.form.enable()

  }

  private removeLabelParts() {
    while (this.labelParts.controls.length > 0) {
      this.labelParts.removeAt(0);
    }
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
function fieldIdToString(key: FieldId): string {
  return key.fkProperty + '_' + key.isOutgoing

}
function stringToFieldId(str: string): FieldId {
  const [fkProperty, isOutgoing] = str.split('_')
  return { fkProperty: parseInt(fkProperty, 10), isOutgoing: isOutgoing === 'true' };
}
