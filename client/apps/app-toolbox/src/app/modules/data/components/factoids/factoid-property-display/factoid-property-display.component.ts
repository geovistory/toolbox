import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-redux';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { OntoPropertyInfoComponent } from '../../../../../shared/components/onto-info/onto-property-info/onto-property-info.component';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-factoid-property-display',
    templateUrl: './factoid-property-display.component.html',
    styleUrls: ['./factoid-property-display.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatSelectModule, NgFor, MatDividerModule, MatOptionModule, OntoPropertyInfoComponent, AsyncPipe]
})
export class FactoidPropertyDisplayComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkProperty: number; // initial value
  @Input() pkClass: number;
  @Input() disabledProperties: Array<number> = [];
  @Output() onChange = new EventEmitter<Field>();

  sections: Array<{ name: string, fields$: Observable<Field[]>, display$: Observable<boolean> }>
  selected: Field;

  constructor(
    private c: ConfigurationPipesService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.pkClass) errors.push('@Input() pkClass is required.');
    if (errors.length) throw new Error(errors.join('\n'));


    this.sections = Object.keys(SectionName).map(section => {
      const toReturn = {
        name: section,
        fields$: this.c.pipeSection(this.pkClass, DisplayType.view, section as SectionName),
        display$: of(true),
      }
      toReturn.display$ = toReturn.fields$.pipe(map(f => f.length != 0))
      return toReturn;
    })

    if (this.pkProperty) {
      //look for the right field
      this.sections.forEach(section => {
        section.fields$.pipe(takeUntil(this.destroy$)).subscribe(fields => {
          fields.forEach(f => {
            if (f.property.fkProperty == this.pkProperty) {
              this.selected = f;
            }
          })
        })
      })
    }
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
