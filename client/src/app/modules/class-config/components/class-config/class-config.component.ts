import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActiveProjectService } from 'app/core';
import { combineLatest, Observable, of } from '../../../../../../node_modules/rxjs';
import { mergeMap } from '../../../../../../node_modules/rxjs/operators';
import { FieldDefinition } from '../../../base/components/properties-tree/properties-tree.models';
import { ConfigurationPipesService } from '../../../base/services/configuration-pipes.service';


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
