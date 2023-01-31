import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/pagination';
import { Product } from 'src/app/models/Product';
import { UserParams } from 'src/app/models/userParams';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent {
  products: Product[];
  pagination: Pagination;
  userParams: UserParams;
  modalRef?: BsModalRef;
  options = [1, 5, 10];
  count:number= 0;
  selectedValue :number;
  searchText = '';

  constructor(
    private productService: ProductsService,
    private modalService: BsModalService
  ) {
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    this.selectedValue = this.userParams.pageSize;
    this.loadProducts();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onChange(newValue: any) {
    this.userParams.pageSize = newValue;
    this.pagination!.currentPage = 1;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.userParams).subscribe((res) => {
      console.log(res)
      this.products = res.result;
      this.pagination = res.pagination;
      this.products.forEach(e=>{
        e.isChecked=false;
      })
    });
  }



  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadProducts();
  }



  resetFilters() {
    this.userParams = new UserParams(); // to reset the params and reload the members data
    this.loadProducts();
  }

}
