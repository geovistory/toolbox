import { NgModule } from '@angular/core';
import { TabEpics } from './tab.epics';
import { TabActions } from './tab.actions';
import { TabSelector } from './tab.service';


@NgModule({
  imports: [],
  providers: [TabEpics, TabActions, TabSelector]
})
export class TabModule { }
