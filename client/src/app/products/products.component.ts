import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../models/pagination';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products : Product[];
  pagination: Pagination;
  pageNumber: number = 1;
  pageSize: number = 5;

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe((res) => {
      this.products = res.result;
      this.pagination = res.pagination;
      console.log(res);
    });
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadProducts();
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
