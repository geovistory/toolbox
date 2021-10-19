import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface LocalClass { pkClass: number, label: string, icon: string }


@Component({
  selector: 'gv-class-dropdown',
  templateUrl: './class-dropdown.component.html',
  styleUrls: ['./class-dropdown.component.scss']
})
export class ClassDropdownComponent implements OnInit {

  @Output() onChange = new EventEmitter<number>();

  classes$: Observable<LocalClass[]>
  selected: LocalClass;

  constructor(
    public c: ConfigurationPipesService,
  ) { }

  ngOnInit(): void {
    this.classes$ = this.c.pipeClassesEnabledByProjectProfiles().pipe(
      switchMap(klasses => combineLatestOrEmpty(klasses.map(klass => this.c.pipeClassLabel(klass.pk_class).pipe(
        map(label => ({
          label,
          pkClass: klass.pk_class,
          icon: klass.basic_type == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || klass.basic_type == 30 ? 'peit' : 'teen'
        }))
      )))
      )
    )
  }

  select(c: LocalClass) {
    this.selected = c;
    this.onChange.emit(c.pkClass);
  }

}
