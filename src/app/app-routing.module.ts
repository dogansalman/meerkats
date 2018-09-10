import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Empty_layoutComponent } from './layouts/empty_layout/empty_layout.component';
import { Navbar_layoutComponent } from './layouts/navbar_layout/navbar_layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: Empty_layoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: '../app/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '',
    component: Navbar_layoutComponent,
    children:[
      {
        path: 'home',
        loadChildren: '../app/home/home.module#HomeModule'
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
