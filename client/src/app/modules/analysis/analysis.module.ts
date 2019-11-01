import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { AnalysisDetailComponent } from './components/analysis-detail/analysis-detail.component';
import { MatTooltipModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';


const components = [AnalysisListComponent, AnalysisDetailComponent]
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ListDrawerHeaderModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: components
})
export class AnalysisModule { }
