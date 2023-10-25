import { Component, Input, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
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

  constructor(private state: StateFacade) { }

  ngOnInit() {
    const property$ = this.state.data.dfh.property.getDfhProperty.byProperty(this.pkProperty).pipe(filter(i => !!i));
    this.label$ = property$.pipe(map((c) => {
      return values(c)[0].identifier_in_namespace
    }))
    this.url = this.ontomeUrl + '/property/' + this.pkProperty
  }
}
