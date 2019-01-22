import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Empty_layoutComponent} from '../../layouts/empty_layout/empty_layout.component';
import { Navbar_layoutComponent } from '../../layouts/navbar_layout/navbar_layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: Empty_layoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: '../../../app/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '',
    component: Navbar_layoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: '../../../app/home/home.module#HomeModule'
      },
      {
        path: 'kitchen',
        loadChildren: '../../../app/kitchen/kitchen.module#KitchenModule'
      },
      {
        path: 'tables',
        loadChildren: '../../../app/tables/tables.module#TablesModule'
      },
      {
        path: 'employees',
        loadChildren: '../../../app/employees/employees.module#EmployeesModule'
      },
      {
        path: 'products',
        loadChildren: '../../../app/products/products.module#ProductsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}