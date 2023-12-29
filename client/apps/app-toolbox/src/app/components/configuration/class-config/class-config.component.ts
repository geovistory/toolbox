import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigurationPipesService } from "@kleiolab/lib-redux";
import { Observable } from 'rxjs';
import { OntoClassInfoComponent } from '../../misc/onto-class-info/onto-class-info.component';
import { ClassFieldsComponent } from '../class-fields/class-fields.component';
import { LabelsComponent } from '../labels/labels.component';


@Component({
  selector: 'gv-class-config',
  templateUrl: './class-config.component.html',
  styleUrls: ['./class-config.component.scss'],
  standalone: true,
  imports: [MatTabsModule, ClassFieldsComponent, LabelsComponent, OntoClassInfoComponent]
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
