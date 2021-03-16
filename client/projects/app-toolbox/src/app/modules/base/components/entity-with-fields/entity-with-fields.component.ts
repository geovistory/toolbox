import { Component, Input, OnInit, Optional } from '@angular/core';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'gv-entity-with-fields',
  templateUrl: './entity-with-fields.component.html',
  styleUrls: ['./entity-with-fields.component.scss']
})
export class EntityWithFieldsComponent implements OnInit {
  @Input() pkEntity: number
  @Input() fkClass: number
  @Input() showOntoInfo$: Observable<boolean>
  @Input() scope: GvFieldPageScope

  fields$: Observable<Field[]>

  constructor(
    private c: ConfigurationPipesService,
    @Optional() public parentField: FieldComponent
  ) { }

  ngOnInit() {
    this.fields$ = this.c.pipeSpecificAndBasicFields(this.fkClass, true)
      .pipe(
        map(fields => fields.filter(field => !this.isCircular(field)))
      )
  }

  isCircular(field: Field): boolean {
    if (this.parentField
      && this.parentField.field.property.pkProperty === field.property.pkProperty
      && field.targetMaxQuantity === 1
    ) {
      return true
    }
    return false
  }

}
