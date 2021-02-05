import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { map, filter } from 'rxjs/operators';
import { values } from 'ramda';

@Component({
  selector: 'gv-onto-property-info',
  templateUrl: './onto-property-info.component.html',
  styleUrls: ['./onto-property-info.component.scss']
})
export class OntoPropertyInfoComponent implements OnInit {
  @Input() pkProperty: number;
  url: string
  label$: Observable<string>

  constructor(public p: ActiveProjectService) { }

  ngOnInit() {
    const property$ = this.p.dfh$.property$.by_pk_property$.key(this.pkProperty).pipe(filter(i => !!i));
    this.label$ = property$.pipe(map((c) => {
      return values(c)[0].identifier_in_namespace
    }))
    this.url = 'https://ontome.dataforhistory.org/property/' + this.pkProperty
  }
}
