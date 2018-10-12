import { Component, OnInit, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { ClassConfig } from 'app/core';

@Component({
  selector: 'gv-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent {

  @HostBinding('class.d-inline-block') get a() { return true };

  @Input() classConfig: ClassConfig;
  @Input() iconPrimary;

}
