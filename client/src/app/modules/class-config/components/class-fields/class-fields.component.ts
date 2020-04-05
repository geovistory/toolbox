import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, combineLatest, of, pipe, Subject } from 'rxjs';
import { ConfigurationPipesService } from 'app/modules/base/new-services/configuration-pipes.service';
import { mergeMap, tap, takeUntil, first, map } from 'rxjs/operators';
import { FieldDefinition } from 'app/modules/base/new-components/properties-tree/properties-tree.models';
import { MatDialog } from '@angular/material';
import { FieldConfigDialogComponent, FieldConfigDialogData } from '../field-config-dialog/field-config-dialog.component';
import { ProClassFieldConfig, ActiveProjectService } from 'app/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

interface FieldConfig extends FieldDefinition {
  propertyField?: {
    isIdentityDefining: boolean,
    // labelTable: {
    //   fkProperty: number,
    //   fkDomainClass: number,
    //   fkRangeClass: number
    // },
    // classTable: {
    //   displayedColumns: string[],
    //   rows: {
    //     label: string,
    //   }[]
    // },
    targetClasses: {
      label: string,
      pkClass: number
    }[]
  },
  fieldConfig?: ProClassFieldConfig
}
@Component({
  selector: 'gv-class-fields',
  templateUrl: './class-fields.component.html',
  styleUrls: ['./class-fields.component.scss']
})
export class ClassFieldsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() fkProject: number
  @Input() fkClass: number
  // @Input() fkAppContext: number


  defaultFields$: Observable<FieldConfig[]>
  specificFields$: Observable<FieldConfig[]>

  reordering = false;

  constructor(
    private c: ConfigurationPipesService,
    private p: ActiveProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.defaultFields$ = this.c.pipeDefaultFieldDefinitions(this.fkClass)
      .pipe(
        map((fields: FieldDefinition[]) => this.mapFields(fields))
      )

    this.specificFields$ = this.c.pipeSpecificFieldDefinitions(this.fkClass)
      .pipe(
        map((fields: FieldDefinition[]) => this.mapFields(fields))
      )



  }

  mapFields = (fields: FieldDefinition[]) => fields
    .map(field => {

      // If this field is a class Field
      if (!field.pkProperty) {
        return {
          ...field
        }
      }
      // If this field is a property field
      const f: FieldConfig = {
        ...field,
        propertyField: {
          isIdentityDefining: field.listDefinitions[0].isIdentityDefining,
          targetClasses: field.listDefinitions.map(ld => ({
            pkClass: ld.targetClass,
            label: ld.targetClassLabel
          }))
        }
      }
      return f
    })


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openFieldDialog(row: FieldConfig) {
    const l = row.listDefinitions[0];
    const o = l.isOutgoing;
    const data: FieldConfigDialogData = {
      fkProject: this.fkProject,
      fkProperty: row.pkProperty,
      fkPropertyDomain: o ? l.sourceClass : null,
      fkPropertyRange: o ? null : l.sourceClass
    }
    this.dialog.open(FieldConfigDialogComponent, {
      data,
      height: 'calc(100% - 30px)',
      // width: 'calc(100% - 30px)',
      width: '690px',
      // maxWidth: '100%',
      maxHeight: '100%'
    })
  }

  onRowReorder(event: { dragIndex: number, dropIndex: number }) {
    this.reordering = true
    this.specificFields$.pipe(first()).subscribe((specificFields) => {
      //
      const items = specificFields.map(field => {
        const item: Partial<ProClassFieldConfig> = {
          fk_property: field.pkProperty,
          fk_domain_class: field.isOutgoing ? field.sourceClass : undefined,
          fk_range_class: field.isOutgoing ? undefined : field.sourceClass,
          fk_project: this.fkProject,
          pk_entity: field.fieldConfig && field.fieldConfig.fk_project === this.fkProject ?
            field.fieldConfig.pk_entity : undefined
        }
        return item
      })

      moveItemInArray(items, event.dragIndex, event.dropIndex);

      const reordered = items.map((item, index) => {
        item.ord_num = index;
        return item;
      }) as ProClassFieldConfig[]

      this.p.pro$.class_field_config.upsert(reordered, this.fkProject).resolved$
        .pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(() => {
          this.reordering = false

        })

    })
  }

}
