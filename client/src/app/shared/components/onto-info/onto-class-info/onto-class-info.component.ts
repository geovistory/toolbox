import { Component, OnInit, Input } from '@angular/core';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'gv-onto-class-info',
  templateUrl: './onto-class-info.component.html',
  styleUrls: ['./onto-class-info.component.scss']
})
export class OntoClassInfoComponent implements OnInit {
  @Input() pkClass: number;
  url: string
  label$: Observable<string>

  constructor(public p: ActiveProjectService) { }

  ngOnInit() {
    const class$ = this.p.dfh$.class$.by_pk_class$.key(this.pkClass).pipe(filter(c => !!c));
    this.label$ = class$.pipe(map((c) => c.identifier_in_namespace))
    this.url = 'http://ontologies.dataforhistory.org/class/' + this.pkClass
  }

}
