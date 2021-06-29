import { Component, Input, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { values } from 'ramda';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'gv-onto-property-info',
  templateUrl: './onto-property-info.component.html',
  styleUrls: ['./onto-property-info.component.scss']
})
export class OntoPropertyInfoComponent implements OnInit {
  @Input() pkProperty: number;
  url: string
  label$: Observable<string>
  ontomeUrl = SysConfig.ONTOME_URL

  constructor(public p: ActiveProjectService) { }

  ngOnInit() {
    const property$ = this.p.dfh$.property$.by_pk_property$.key(this.pkProperty).pipe(filter(i => !!i));
    this.label$ = property$.pipe(map((c) => {
      return values(c)[0].identifier_in_namespace
    }))
    this.url = this.ontomeUrl + '/property/' + this.pkProperty
  }
}
