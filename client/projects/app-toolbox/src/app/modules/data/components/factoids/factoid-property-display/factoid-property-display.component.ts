import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-factoid-property-display',
  templateUrl: './factoid-property-display.component.html',
  styleUrls: ['./factoid-property-display.component.scss']
})
export class FactoidPropertyDisplayComponent implements OnInit {

  @Input() pkClass: number;
  @Output() onChange = new EventEmitter<Field>();

  fields$: Observable<Field[]>
  selected: Field;

  constructor(
    private c: ConfigurationPipesService
  ) { }

  ngOnInit(): void {
    this.fields$ = this.c.pipeFields(this.pkClass)
  }

  select(field: Field) {
    this.selected = field;
    this.onChange.emit(field);
  }

}
