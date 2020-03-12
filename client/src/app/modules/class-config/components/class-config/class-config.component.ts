import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from '../../../../../../node_modules/rxjs';
import { ConfigurationPipesService } from '../../../information/new-services/configuration-pipes.service';


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
