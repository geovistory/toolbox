import { Component, OnInit, HostBinding } from '@angular/core';
import { ActiveProjectService } from '../../../../core';

@Component({
  selector: 'gv-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {
  
  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {
  }


  openClassesSettings() {
    this.p.addTab({
      active: true,
      component: 'classes-settings',
      icon: 'settings',
      pathSegment: 'classesSettings'
    })
  }

}
