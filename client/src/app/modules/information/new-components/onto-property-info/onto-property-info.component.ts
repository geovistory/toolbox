import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../../../../node_modules/rxjs';
import { ActiveProjectService } from '../../../../core';
import { map } from '../../../../../../node_modules/rxjs/operators';

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
    const class$ = this.p.dfh$.property_view$.by_dfh_pk_property$.key(this.pkProperty);
    this.label$ = class$.pipe(map((c) => c.dfh_identifier_in_namespace))
    this.url = 'http://ontologies.dataforhistory.org/property/' + this.pkProperty
  }
}
