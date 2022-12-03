import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
    // {path:'products',component: ProductsComponent, pathMatch:'full'},
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
