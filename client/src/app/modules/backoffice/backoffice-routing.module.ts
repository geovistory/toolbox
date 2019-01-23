import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { ClassFieldListComponent } from './components/class-field-list/class-field-list.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassMainComponent } from './components/class-main/class-main.component';
import { ClassUiContextComponent } from './components/class-ui-context/class-ui-context.component';
import { ClassComponent } from './components/class/class.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'classes',
        component: ClassListComponent
      },
      {
        path: 'classes/:pk_class',
        component: ClassComponent,
        children: [
          {
            path: '',
            component: ClassMainComponent
          },
          {
            path: 'ui-context/:pk_ui_context',
            component: ClassUiContextComponent
          }
        ]
      },
      {
        path: 'properties',
        component: PropertyListComponent
      },
      {
        path: 'class-fields',
        component: ClassFieldListComponent
      },
      {
        path: 'namespaces',
        component: NamespaceListComponent
      },
      {
        path: 'system-types',
        component: SystemTypeListComponent
      },
      {
        path: 'accounts',
        component: AccountListComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
