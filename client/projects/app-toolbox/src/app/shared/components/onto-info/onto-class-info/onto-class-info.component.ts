import { Component, Input, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
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
  constructor(public p: ActiveProjectService) { }

  ngOnInit() {
    const class$ = this.p.dfh$.class$.by_pk_class$.key(this.pkClass).pipe(filter(c => !!c));
    this.label$ = class$.pipe(map((c) => c.identifier_in_namespace))
    this.url = this.ontomeUrl + '/class/' + this.pkClass
  }

}
