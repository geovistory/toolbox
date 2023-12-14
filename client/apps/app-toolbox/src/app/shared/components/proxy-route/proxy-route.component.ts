import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'gv-proxy-route',
    templateUrl: './proxy-route.component.html',
    styleUrls: ['./proxy-route.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class ProxyRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
