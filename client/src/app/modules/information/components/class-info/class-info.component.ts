import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ClassConfig } from 'app/core';

@Component({
  selector: 'gv-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent  {


  @Input() classConfig: ClassConfig;
  @Input() iconPrimary;

}
