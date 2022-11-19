import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'login', 
    component: LoginComponent
  },
  {
    path:'register', 
    component: RegisterComponent
  },
  {
    path: '',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'',component: HomeComponent},
      {path:'dashboard',component: DashboardComponent},
      {path:'settings/:id',component: SettingsComponent},
      {path:'orders', loadChildren: () => import('./modules/products.module').then(m => m.ProductsModule)},
      {path:'products', component: ProductsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
