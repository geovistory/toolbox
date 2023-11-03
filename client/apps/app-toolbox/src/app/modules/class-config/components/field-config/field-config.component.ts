import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-field-config',
  templateUrl: './field-config.component.html',
  styleUrls: ['./field-config.component.scss']
})
export class FieldConfigComponent implements OnInit {
  @Input() fkProject: number

  @Input() fkSourceClass: number
  @Input() isOutgoing: boolean
  @Input() fkProperty: number
  @Input() fkPropertyDomain?: number
  @Input() fkPropertyRange?: number

  fieldLabel$: Observable<string>;

  constructor(
    private c: ConfigurationPipesService
  ) { }

  ngOnInit() {
    this.fieldLabel$ = this.c.pipeFieldLabel(this.fkSourceClass, this.isOutgoing, this.fkProperty)

  }

}
