import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { combineLatest, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Field } from "@kleiolab/lib-queries";
import { ConfigurationPipesService } from "@kleiolab/lib-queries";


@Component({
  selector: 'gv-class-config',
  templateUrl: './class-config.component.html',
  styleUrls: ['./class-config.component.scss']
})
export class ClassConfigComponent implements OnInit {

  @HostBinding('class.mat-typography') true;

  @Input() fkAppContext: number
  @Input() fkClass: number
  @Input() fkProject: number

  classLabel$: Observable<string>

  constructor(
    private c: ConfigurationPipesService
  ) {

  }
  getKey(_, item) {
    return _;
  }
  ngOnInit() {


    this.classLabel$ = this.c.pipeClassLabel(this.fkClass)

  }


}
