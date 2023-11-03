import { Component, Input, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { StateFacade } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'gv-onto-class-info',
  templateUrl: './onto-class-info.component.html',
  styleUrls: ['./onto-class-info.component.scss']
})
export class OntoClassInfoComponent implements OnInit {
  @Input() pkClass: number;
  url: string
  label$: Observable<string>

  ontomeUrl = SysConfig.ONTOME_URL
  constructor(private state: StateFacade) { }

  ngOnInit() {
    const class$ = this.state.data.dfh.klass.select.byPkClass(this.pkClass).pipe(filter(c => !!c));
    this.label$ = class$.pipe(map((c) => c.identifier_in_namespace))
    this.url = this.ontomeUrl + '/class/' + this.pkClass
  }

}
