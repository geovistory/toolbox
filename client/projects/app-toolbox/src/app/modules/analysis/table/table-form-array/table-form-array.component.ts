import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ClassAndTypeSelectModel } from '@kleiolab/lib-queries';
import { ColDef } from '@kleiolab/lib-sdk-lb4';
import { FormControlFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-control-factory';
import { FilterDefinition } from 'projects/app-toolbox/src/app/modules/queries/components/query-filter/query-filter.component';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TableFormArrayFactory } from '../table-form/table-form.component';
import { TableFormService } from '../table-form/table-form.service';

/*
 * Returns a column type label for a ColDef
 * Takes a ColDef.
 * Usage:
 *   coldef | coltype
 * Example:
 *   {{ {defaultType: 'entity_preview'} | coltype }}
 *   formats to: Entity Preview
*/
@Pipe({ name: 'coltype' })
export class ColtypePipe implements PipeTransform {
  transform(value: ColDef): string {
    return getLabelForDefaulType(value.defaultType)
  }
}

@Component({
  selector: 'gv-table-form-array',
  templateUrl: './table-form-array.component.html',
  styleUrls: ['./table-form-array.component.scss'],
  providers: [ColtypePipe]
})
export class TableFormArrayComponent implements OnInit {
  @Input() formArrayFactory: TableFormArrayFactory;

  constructor(private t: TableFormService) { }

  ngOnInit() {
    // console.log(this.formArrayFactory.children)
  }

  /**
   * adds a new columnConfig
   */
  addPathColumn() {
    const colDef: Partial<ColDef> = { label: 'New Column' }
    const conf = this.t.columnConfig(colDef)
    this.formArrayFactory.append(conf)
  }
  /**
   * removes lineConfig with given index
   */
  removeColumn(index: number) {
    this.formArrayFactory.remove(index)
  }

  addDefaultColumn(defaultType: ColDef.DefaultTypeEnum) {
    const colDef: Partial<ColDef> = {
      defaultType,
      label: getLabelForDefaulType(defaultType),
      ofRootTable: true
    }
    const conf = this.t.columnConfig(colDef)
    this.formArrayFactory.append(conf)
  }


  addQueryDefinition(child: FormControlFactory<any>) {
    const selectedClasses$: Observable<ClassAndTypeSelectModel> = child.valueChanges$
    selectedClasses$.pipe(first()).subscribe(selectedClasses => {

      const initVal: FilterDefinition = {
        data: selectedClasses,
        children: []
      }
      const conf = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal), initVal);
      const [ctrlRoot, ...rest] = conf.config
      this.formArrayFactory.appendMany(rest)
      child.config.disabled$.next(true)
    })
  }

  removeQueryDefinition(child: FormControlFactory<any>) {
    this.formArrayFactory.removeLastChild()
    this.formArrayFactory.removeLastChild()
    child.config.disabled$.next(false)
  }



  columnDropped(event: CdkDragDrop<any>) {
    this.formArrayFactory.moveItemInArray(event.previousIndex, event.currentIndex);
  }

  getLabelForDefaulType = (d) => getLabelForDefaulType(d);
  getLabelForDefaulType$(d$: Observable<ColDef>) { d$.pipe(map(d => this.getLabelForDefaulType(d))) }
}

export function getLabelForDefaulType(defaultType?: ColDef.DefaultTypeEnum): string {
  if (defaultType === 'entity_preview') {

    return 'Entity Preview'
  }
  else if (defaultType === 'pk_entity') {

    return 'Entity ID'
  }
  else if (defaultType === 'class_label') {

    return 'Class Label'
  }

  else if (defaultType === 'type_label') {

    return 'Type Label'
  }
  else if (defaultType === 'fk_type') {

    return 'Type ID'
  }
  else if (defaultType === 'entity_label') {

    return 'Entity Label'

  }
  else {

    return 'Path to related Entities'

  }
}
