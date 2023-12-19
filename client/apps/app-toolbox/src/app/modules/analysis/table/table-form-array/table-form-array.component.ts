import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ClassAndTypeSelectModel } from '@kleiolab/lib-redux';
import { ColDef } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FormControlFactory } from '../../../../modules/form-factory/core/form-control-factory';
import { FilterDefinition } from '../../../../modules/queries/components/query-filter/query-filter.component';
import { TableFormControlComponent } from '../table-form-control/table-form-control.component';
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
@Pipe({
  name: 'coltype',
  standalone: true
})
export class ColtypePipe implements PipeTransform {
  transform(value: ColDef): string {
    return getLabelForDefaulType(value.defaultType)
  }
}

@Component({
  selector: 'gv-table-form-array',
  templateUrl: './table-form-array.component.html',
  styleUrls: ['./table-form-array.component.scss'],
  providers: [ColtypePipe],
  standalone: true,
  imports: [NgIf, MatListModule, MatLineModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatExpansionModule, CdkDropList, NgFor, CdkDrag, CdkDragHandle, NgClass, TableFormControlComponent, PortalModule, AsyncPipe, ColtypePipe]
})
export class TableFormArrayComponent {
  @Input() formArrayFactory: TableFormArrayFactory;

  constructor(private t: TableFormService) { }

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
