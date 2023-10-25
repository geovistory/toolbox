import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-queries';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { TableRowReorderEvent } from 'primeng/table';
import { values } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { FieldConfigDialogComponent, FieldConfigDialogData } from '../field-config-dialog/field-config-dialog.component';

interface FieldConfig extends Field {
  propertyField?: {
    identityDefiningForSource: boolean,
    targetClasses: {
      label: string,
      pkClass: number
    }[]
  },
  fieldConfig?: ProClassFieldConfig
}
@Component({
  selector: 'gv-class-fields-section',
  templateUrl: './class-fields-section.component.html',
  styleUrls: ['./class-fields-section.component.scss']
})
export class ClassFieldsSectionComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() fkProject: number
  @Input() fkClass: number
  @Input() section: SectionName
  @Input() comment: string
  // @Input() fkAppContext: number


  fields$: Observable<FieldConfig[]>
  reordering = false;

  constructor(
    private c: ConfigurationPipesService,
    private state: StateFacade,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fields$ = this.c.pipeSection(this.fkClass, DisplayType.view, this.section)
      .pipe(map((fields: Field[]) => this.mapFields(fields)))
  }

  mapFields = (fields: Field[]) => fields
    .map(field => {

      // If this field is a class Field
      if (!field.property) {
        return {
          ...field
        }
      }

      // If this field is a property field
      const f: FieldConfig = {
        ...field,
        propertyField: {
          identityDefiningForSource: field.identityDefiningForSource,
          targetClasses: values(field.targets).map(ld => ({
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
    const l = row;
    const o = l.isOutgoing;
    const data: FieldConfigDialogData = {
      fkProject: this.fkProject,
      fkProperty: row.property.fkProperty,
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

  onRowReorder(event: TableRowReorderEvent) {
    if (this.section == SectionName.basic) return;

    this.reordering = true
    this.fields$.pipe(first()).subscribe((fields) => {
      //
      const items = fields.map(field => {
        const item: Partial<ProClassFieldConfig> = {
          fk_property: field.property.fkProperty,
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

      this.state.data.upsertClassFieldConfig(this.fkProject, reordered)
        .pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(() => {
          this.reordering = false
        })
    })
  }

  toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
