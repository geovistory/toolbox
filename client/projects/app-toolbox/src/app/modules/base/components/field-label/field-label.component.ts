import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-field-label',
  templateUrl: './field-label.component.html',
})
export class FieldLabelComponent implements OnInit {
  @Input() fkSourceClass: number
  @Input() fkProperty: number
  @Input() isOutgoing: boolean;
  @Input() showTooltip: boolean
  label$: Observable<string>
  constructor(private c: ConfigurationPipesService) { }

  ngOnInit() {
    const domain = this.isOutgoing ? this.fkSourceClass : null
    const range = this.isOutgoing ? null : this.fkSourceClass
    this.label$ = this.c.pipeFieldLabel(this.fkProperty, domain, range)
  }

}
