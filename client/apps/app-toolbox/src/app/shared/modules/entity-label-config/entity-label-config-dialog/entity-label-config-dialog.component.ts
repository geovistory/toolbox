import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { LabelPart, LabelPartField, ProEntityLabelConfig, ProjectConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
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
    styleUrls: ['./entity-label-config-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, NgIf, MatProgressSpinnerModule, FormsModule, ReactiveFormsModule, NgFor, MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule, MatButtonModule, MatIconModule, AsyncPipe]
})
export class EntityLabelConfigDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  labelParts = new UntypedFormArray([], [Validators.required]);
  form: UntypedFormGroup;
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

    this.form = new UntypedFormGroup({
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
    return new UntypedFormGroup({
      'fieldId': new UntypedFormControl(fieldId, [
        Validators.required
      ]),
      'nrOfStmts': new UntypedFormControl(nrOfStmts, [
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
        });
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
      });
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
