import { Component, OnInit, OnChanges, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { addOffset } from './addOffset';

const animationTime = '300ms ease-in-out';

// Style of state 0 => collapsed
const s0 = {
  position:'absolute',
  'z-index': 1001
};

// Style of keyframe 0 almost collapsed
const k0 = {
  height: '20px',
  '-webkit-box-orient': 'vertical',
  '-webkit-box-direction': 'normal',
  '-ms-flex-direction': 'column',
  'flex-direction': 'column',
  '-webkit-box-flex': '0',
  '-ms-flex': '0 0 0%',
  flex: '0 0 0%',
  position: 'relative',
  'min-height': '1px',
  overflow: 'hidden'
};

// Style of state with 50% width
const s50 = {
  height: 'calc(100vh - 56px)',
  '-webkit-box-orient': 'vertical',
  '-webkit-box-direction': 'normal',
  '-ms-flex-direction': 'column',
  'flex-direction': 'column',
  '-webkit-box-flex': '0',
  '-ms-flex': '0 0 50%',
  flex: '0 0 50%',
  position: 'relative',
  'min-height': '1px',
  overflow: 'hidden',
};

// Style of state with 100% width
const s100 = {
  height: 'calc(100vh - 56px)',
  '-webkit-box-orient': 'vertical',
  '-webkit-box-direction': 'normal',
  '-ms-flex-direction': 'column',
  'flex-direction': 'column',
  '-webkit-box-flex': '0',
  '-ms-flex': '0 0 100%',
  flex: '0 0 100%',
  position: 'relative',
  'min-height': '1px',
  overflow: 'hidden',
};



@Component({
  selector: 'gv-project-edit-panel',
  templateUrl: './project-edit-panel.component.html',
  styleUrls: ['./project-edit-panel.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('s100', style(s100)),
      state('s50', style(s50)),
      state('s0', style(s0)),
      transition('s100 => s50', animate(animationTime, keyframes([
        style({
          height: 'calc(100vh - 56px)',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 100%',
          flex: '0 0 100%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: 'calc(100vh - 56px)',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 50%',
          flex: '0 0 50%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 1
        })
      ]))),
      transition('s50 => s0', animate(animationTime, keyframes([
        style({
          height: 'calc(100vh - 56px)',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 50%',
          flex: '0 0 50%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '20px',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 0%',
          flex: '0 0 0%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 1
        })
      ]))),
      transition('s0 => s50', animate(animationTime, keyframes([
        style({
          height: '20px',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 0%',
          flex: '0 0 0%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: 'calc(100vh - 56px)',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 50%',
          flex: '0 0 50%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 1
        })
      ]))),
      transition('s50 => s100', animate(animationTime, keyframes([
        style({
          height: 'calc(100vh - 56px)',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 50%',
          flex: '0 0 50%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: 'calc(100vh - 56px)',
          '-webkit-box-orient': 'vertical',
          '-webkit-box-direction': 'normal',
          '-ms-flex-direction': 'column',
          'flex-direction': 'column',
          '-webkit-box-flex': '0',
          '-ms-flex': '0 0 100%',
          flex: '0 0 100%',
          position: 'relative',
          'min-height': '1px',
          overflow: 'hidden',
          offset: 1
        })
      ])))
      // transition('s100 => s50', animate(animationTime, keyframes([
      //   style(addOffset(0, s100)),
      //   style(addOffset(1, s50))
      // ]))),
      // transition('s50 => s0', animate(animationTime, keyframes([
      //   style(addOffset(0, s50)),
      //   style(addOffset(1, k0))
      // ]))),
      // // transition('s0 => s50', animate(animationTime, keyframes([
      //   style(Object.assign({offset:0}, k0)),
      //   style(Object.assign({offset:1}, s50))
      // ]))),
      // transition('s50 => s100', animate(animationTime, keyframes([
      //   style(Object.assign({offset:0}, s50)),
      //   style(Object.assign({offset:1}, s100))
      // ])))
    ]),
    trigger('panelDisplay', [
      state('s50', style({

      })),
      state('s0', style({
        display: 'none'
      })),
      transition('s50 => s0',
      animate(animationTime, keyframes([
        style({
          offset: 0
        }),
        style({
          display: 'none',
          offset: 1
        })
      ])))
    ]),
    trigger('expandButton', [
      state('s50', style({display: 'none'})),
      state('s0', style({display: 'block'})),
      transition('s50 => s0',
      animate(animationTime, keyframes([
        style({display: 'none', offset: 0}),
        style({display: 'block', offset: 1})
      ])))
    ])
  ]
})
export class ProjectEditPanelComponent implements OnInit, OnChanges {
  @HostBinding('@expandCollapse') state;

  @Input() stateInput;

  @Output() goToState0Start = new EventEmitter();
  @Output() goToState50Start = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.state = this.stateInput;
  }
  ngOnChanges(){
    this.state = this.stateInput;
  }


  goToState0(){
    if(this.state !== 's0'){
      this.state = 's0';
      this.goToState0Start.emit();
    }
  }
  goToState50(){
    if(this.state !== 's50'){
      this.state = 's50';
      this.goToState50Start.emit();
    }
  }
  goToState100(){
    if(this.state !== 's100'){
      this.state = 's100';
    }
  }
  expand(){
    this.goToState50()
  }

}
