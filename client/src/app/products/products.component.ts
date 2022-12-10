import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../models/pagination';
import { Product } from '../models/Product';
import { UserParams } from '../models/userParams';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products : Product[];
  pagination: Pagination;
  userParams: UserParams;
  modalRef?: BsModalRef;


  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {this.userParams = new UserParams}

  ngOnInit(): void {
    this.loadProducts();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  loadProducts() {
    this.productService.getProducts(this.userParams).subscribe((res) => {
      this.products = res.result;
      this.pagination = res.pagination;
      console.log(res);
    });
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.loadProducts();
  }

  toDraft(draft: Product) {
    draft.isUploaded = false;
    this.productService.toDrafts(draft).subscribe(() => {
      this.products.splice(
        this.products.findIndex((m) => m.id === draft.id),1);
      this.toastr.success('Product Back To Drafts..');
    });
  }

    resetFilters() {
    this.userParams = new UserParams(); // to reset the params and reload the members data
    this.loadProducts();
  }

  remove(id: number) {
    this.productService.deleteDraft(id).subscribe(() => {
      this.products.splice(
        this.products.findIndex((m) => m.id === id),1);
      this.toastr.success('Products Deleted successfully');
    });  }
}
