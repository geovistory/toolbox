import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils/public-api';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


gmutemp

@Component({
  selector: 'gv-class-dropdown',
  templateUrl: './class-dropdown.component.html',
  styleUrls: ['./class-dropdown.component.scss']
})
export class ClassDropdownComponent implements OnInit {

  @Output() onChange: EventEmitter<number>;

  classes$: Observable<{ pkClass: number, label: string }[]>

  constructor(
    public c: ConfigurationPipesService,
  ) { }

  ngOnInit(): void {
    this.classes$ = this.c.pipeClassesEnabledByProjectProfiles().pipe(
      switchMap(klasses => combineLatestOrEmpty(klasses.map(klass => this.c.pipeClassLabel(klass.pk_class).pipe(
        map(label => ({ label, pkClass: klass.pk_class }))
      )))
      )
    )
  }

}
