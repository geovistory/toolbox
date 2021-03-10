import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { GvSubfieldPageScope } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-entity-with-fields',
  templateUrl: './entity-with-fields.component.html',
  styleUrls: ['./entity-with-fields.component.scss']
})
export class EntityWithFieldsComponent implements OnInit {
  @Input() pkEntity: number
  @Input() fkClass: number
  @Input() showOntoInfo$: Observable<boolean>
  @Input() scope: GvSubfieldPageScope

  fields$: Observable<Field[]>

  constructor(private c: ConfigurationPipesService) { }

  ngOnInit() {
    this.fields$ = this.c.pipeSpecificAndBasicFields(this.fkClass, true)
  }

}
