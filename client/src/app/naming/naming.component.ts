import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Appellation } from '../shared/sdk/models/Appellation';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';

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

  @Input() appellationUsages:Array<TemporalEntity>;

  showCommunityData: boolean = false;

  cardState = 'expanded';

  addingName: boolean = false;

  get footerVisible():boolean{
    return !this.addingName;
  }

  constructor() { }

  ngOnInit() {
  }

  toggleCardBody(){
    this.cardState = this.cardState ==='expanded' ? 'collapsed':'expanded';
  }

  addName(){
    this.addingName = true;
  }

  cancelAddName(){
    this.addingName = false;
  }



  // addAppellation(){
  //   this.newAppellation = new Appellation();
  //   this.appellations.push(this.newAppellation);
  // }
  //
  // cancelAddAppellation(){
  //
  // }

}
