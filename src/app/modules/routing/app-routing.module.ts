import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmptyLayoutComponent} from '../../layouts/emptyLayout/emptyLayout.component';
import {NavbarLayoutComponent} from '../../layouts/navbarLayout/navbarLayout.component';
import {AuthGuard} from '../../services/authGuard/authGuard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'login',
        canLoad: [AuthGuard],
        loadChildren: '../../../app/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '',
    component: NavbarLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: '../../../app/home/home.module#HomeModule',
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
      },
      {
        path: 'account',
        loadChildren: '../../../app/account/account.module#AccountModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
