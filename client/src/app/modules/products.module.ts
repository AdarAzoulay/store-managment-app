import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
// import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
  // {path:'',component: ProductsComponent, pathMatch:'full'},
  // {path:':id',component: ProductDetailComponent},
  ];
  

@NgModule({
  imports: 
  [CommonModule,
    RouterModule.forChild(routes) // these are child routes (not starting from the root path)],
  ],
  // declarations: [ProductsComponent],
  // exports: [RouterModule,ProductsComponent],
  providers: [],
})
export class ProductsModule {}
