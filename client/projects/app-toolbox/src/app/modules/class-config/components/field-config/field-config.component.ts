import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationPipesService } from "@kleiolab/lib-queries";

@Component({
  selector: 'gv-field-config',
  templateUrl: './field-config.component.html',
  styleUrls: ['./field-config.component.scss']
})
export class FieldConfigComponent implements OnInit {
  @Input() fkProject: number

  @Input() fkProperty: number
  @Input() fkPropertyDomain?: number
  @Input() fkPropertyRange?: number

  fieldLabel$: Observable<string>;

  constructor(
    private c: ConfigurationPipesService
  ) { }

  ngOnInit() {
    this.fieldLabel$ = this.c.pipeFieldLabel(this.fkProperty, this.fkPropertyDomain, this.fkPropertyRange)

  }

}