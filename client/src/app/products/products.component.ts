import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products : Product[] = [];

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(res);
    });
  }

  toDraft(draft: Product) {
    draft.isUploaded = false;
    this.productService.updateDraft(draft).subscribe(() => {
      this.products.splice(
        this.products.findIndex((m) => m.id === draft.id),1);
      this.toastr.success('Product Back To Drafts..');
    });
  }

  remove(id: number) {
    this.productService.deleteDraft(id).subscribe(() => {
      this.products.splice(
        this.products.findIndex((m) => m.id === id),1);
      this.toastr.success('Products Deleted successfully');
    });  }
}
