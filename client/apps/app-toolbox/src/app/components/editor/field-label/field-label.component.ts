import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-field-label',
    templateUrl: './field-label.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatTooltipModule,
        AsyncPipe,
    ],
})
export class FieldLabelComponent implements OnInit {
  @Input() fkSourceClass: number
  @Input() fkProperty: number
  @Input() isOutgoing: boolean;
  @Input() showTooltip: boolean
  label$: Observable<string>
  constructor(private c: ConfigurationPipesService) { }

  ngOnInit() {
    this.label$ = this.c.pipeFieldLabel(this.fkSourceClass, this.isOutgoing, this.fkProperty)
  }

}
