import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassComponent } from './components/class/class.component';
import { ClassUiContextComponent } from './components/class-ui-context/class-ui-context.component';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { PropertyListComponent } from './components/property-list/property-list.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'classes',
        component: ClassListComponent
      },
      {
        path: 'classes/:pk_class',
        component: ClassComponent,
        children: [
          {
            path: 'ui-context/:pk_ui_context',
            component: ClassUiContextComponent,
          }
        ]
      },
      {
        path: 'properties',
        component: PropertyListComponent
      },
      {
        path: 'namespaces',
        component: NamespaceListComponent
      },
      {
        path: 'system-types',
        component: SystemTypeListComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
