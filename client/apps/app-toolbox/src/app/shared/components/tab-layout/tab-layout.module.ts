import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularSplitModule } from 'angular-split';
import { TabLayoutComponent } from './tab-layout/tab-layout.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSplitModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [],
  exports: [
    TabLayoutComponent
  ],
  declarations: [
    TabLayoutComponent
  ]
})
export class TabBaseModule { }
