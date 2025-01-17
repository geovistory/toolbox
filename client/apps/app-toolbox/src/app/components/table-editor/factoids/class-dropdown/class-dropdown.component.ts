import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

interface LocalClass { pkClass: number, label: string, icon: string }


@Component({
    selector: 'gv-class-dropdown',
    templateUrl: './class-dropdown.component.html',
    styleUrls: ['./class-dropdown.component.scss'],
    standalone: true,
    imports: [MatMenuModule, MatDividerModule, NgFor, NgIf, MatFormFieldModule, MatInputModule, AsyncPipe]
})
export class ClassDropdownComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkClass: number; //initial value

  @Output() onChange = new EventEmitter<number>();

  classes$: Observable<LocalClass[]>
  selected: LocalClass;
  filter$ = new BehaviorSubject('')

  @ViewChild('filterinput', { static: false })
  filterInput: ElementRef;

  constructor(
    public c: ConfigurationPipesService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    const allClasses$ = this.c.pipeClassesOfProject().pipe(
      switchMap(klasses => combineLatestOrEmpty(klasses
        .filter(klass => klass.belongsToCategory?.entities?.showInAddMenu)
        .filter(klass => klass.projectRel?.enabled_in_entities)
        .map(klass => this.c.pipeClassLabel(klass.dfhClass.pk_class).pipe(
          map(label => ({
            label,
            pkClass: klass.dfhClass.pk_class,
            icon: klass.dfhClass.basic_type == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || klass.dfhClass.basic_type == 30 ? 'peit' : 'teen'
          }))
        )))
      )
    )

    this.classes$ = combineLatest([allClasses$, this.filter$]).pipe(
      map(([classes, theFilter]) => classes.filter(cl => cl.label.toLowerCase().indexOf(theFilter.toLowerCase()) != -1).sort())
    )

    if (this.pkClass) {
      this.classes$.pipe(takeUntil(this.destroy$)).subscribe(c => this.selected = c.find(k => k.pkClass == this.pkClass))
    }
  }

  select(c: LocalClass) {
    this.selected = c;
    this.onChange.emit(c.pkClass);
  }

  onFilter(e: KeyboardEvent) {
    this.filter$.next((<HTMLInputElement>e.target).value)
  }

  focusFilterInput() {
    setTimeout(() => {
      this.filterInput.nativeElement.focus();
    }, 0);
  }
}
