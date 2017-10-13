import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'gv-naming',
  templateUrl: './naming.component.html',
  styleUrls: ['./naming.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*'
      })),
      state('collapsed', style({
        height: '0px'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out')),
      transition('collapsed => expanded', animate('400ms ease-in-out'))
    ])
  ]
})
export class NamingComponent implements OnInit {
  showCommunityData: boolean = false;

  cardState = 'expanded';

  constructor() { }

  ngOnInit() {
  }

  toggleCardBody(){
    this.cardState = this.cardState ==='expanded' ? 'collapsed':'expanded';
  }
}
