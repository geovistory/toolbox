import { Component, HostBinding, OnInit } from '@angular/core';
import { SysSystemType, SystemTypesService } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';


@Component({
    selector: 'gv-system-type-list',
    templateUrl: './system-type-list.component.html',
    styleUrls: ['./system-type-list.component.css'],
    standalone: true,
    imports: [NgFor, AsyncPipe]
})
export class SystemTypeListComponent implements OnInit {

  @HostBinding('class.gv-scroll-y-container') flexFh = true;

  // select observables of substore properties
  systemtypes$: Observable<SysSystemType[]>;

  constructor(
    private systemTypesApi: SystemTypesService
  ) { }

  ngOnInit() {
    this.systemtypes$ = this.systemTypesApi.sysTypeControllerGetSystemTypes();
  }
}
