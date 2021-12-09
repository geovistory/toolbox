import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-queries';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-factoid-property-display',
  templateUrl: './factoid-property-display.component.html',
  styleUrls: ['./factoid-property-display.component.scss']
})
export class FactoidPropertyDisplayComponent implements OnInit {

  @Input() pkClass: number;
  @Input() disabledProperties: Array<number> = [];
  @Output() onChange = new EventEmitter<Field>();

  sections: Array<{ name: string, fields$: Observable<Field[]>, display$: Observable<boolean> }>
  selected: Field;

  constructor(
    private c: ConfigurationPipesService
  ) { }

  ngOnInit(): void {
    this.sections = Object.keys(SectionName).map(section => {

      const toReturn = {
        name: section,
        fields$: this.c.pipeSection(this.pkClass, DisplayType.view, section as SectionName),
        display$: of(true),
      }

      toReturn.display$ = toReturn.fields$.pipe(map(f => f.length != 0))

      return toReturn;
    })
  }

  select(field: Field) {
    this.selected = field;
    this.onChange.emit(field);
  }


  isPropertyDisabled(pkProperty: number): boolean {
    return this.disabledProperties.some(p => p == pkProperty)
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
