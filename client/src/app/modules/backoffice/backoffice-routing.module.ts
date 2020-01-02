import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { HasTypeComponent } from './components/has-type/has-type.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { NamespaceListComponent } from './components/namespace-list/namespace-list.component';
import { SystemTypeListComponent } from './components/system-type-list/system-type-list.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ClassFieldListComponent } from './components/class-field-list/class-field-list.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      // {
      //   path: 'classes',
      //   component: ClassListComponent
      // },
      // {
      //   path: 'classes/:pk_class',
      //   component: ClassComponent,
      //   children: [
      //     {
      //       path: '',
      //       component: ClassMainComponent
      //     }
      //   ]
      // },
      // {
      //   path: 'properties',
      //   component: PropertyListComponent
      // },
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
      {
        path: 'warehouse',
        component: WarehouseComponent
      },
      {
        path: 'has-type',
        component: HasTypeComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
