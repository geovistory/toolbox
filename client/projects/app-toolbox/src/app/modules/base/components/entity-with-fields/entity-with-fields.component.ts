import { Component, Input, OnInit, Optional } from '@angular/core';
import { ConfigurationPipesService, DisplayType, Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'gv-entity-with-fields',
  templateUrl: './entity-with-fields.component.html',
  styleUrls: ['./entity-with-fields.component.scss']
})
export class EntityWithFieldsComponent implements OnInit {
  @Input() source: GvFieldSourceEntity
  @Input() fkClass: number
  @Input() scope: GvFieldPageScope
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>

  fields$: Observable<Field[]>

  constructor(
    private c: ConfigurationPipesService,
    @Optional() public parentField: FieldComponent
  ) { }

  ngOnInit() {
    const errors: string[] = []
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.fkClass) errors.push('@Input() fkClass is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.fields$ = this.c.pipeAllSections(this.fkClass, DisplayType.view, true)
      .pipe(
        map(fields => fields.filter(field => !this.isCircular(field)))
      )
  }

  isCircular(field: Field): boolean {
    if (this.parentField
      && this.parentField.field.property.fkProperty === field.property.fkProperty
      && field.targetMaxQuantity === 1
    ) {
      return true
    }
    return false
  }

}
