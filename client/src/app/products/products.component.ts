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
  products?: Product[];
  pagination: Pagination;
  userParams: UserParams;
  modalRef?: BsModalRef;
  count:number= 0;
  options = [1, 5, 10];
  selectedValue :number;

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
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

  loadProducts() {
    this.productService.getUserProducts(this.userParams).subscribe((res) => {
      console.log(res)
      this.products = res.result;
      this.pagination = res.pagination;
      this.products.forEach(e=>{
        e.isChecked=false;
      })
    });
  }

  onChange(newValue: any) {
    this.userParams.pageSize = newValue;
    this.pagination!.currentPage = 1;
    this.loadProducts();
  }

  changed(){
    this.count = 0;
    this.products?.forEach(item=>{
      if(item.isChecked){
        this.count= this.count+1
      }  
    } )
  }

  checkUncheckAll(evt:any) {
    this.count = 0;
    this.products?.forEach((c) =>{
    c.isChecked = evt.target.checked
    if(c.isChecked){
      this.count= this.count+1
    }  
    })
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadProducts();
  }

  toDraft(draft: Product) {

    draft.isUploaded = false;
    this.productService.toProducts(draft).subscribe(() => {
      if(this.pagination!.totalPages - this.pagination!.currentPage == 1 && this.pagination!.totalItems - (this.pagination!.currentPage * this.pagination!.itemsPerPage) == 1){
        this.loadProducts();
      }
      if(this.products?.length == 1 && this.pagination?.totalPages !=1){
        this.userParams.pageNumber=1;
        this.loadProducts();
      }
      else{
        this.products?.splice(
        this.products.findIndex((m) => m.id === draft.id),1);
    }
      this.toastr.success('Draft uploaded successfully');
      this.pagination!.totalItems--;
    });
  }

  resetFilters() {
    this.userParams = new UserParams(); // to reset the params and reload the members data
    this.loadProducts();
  }

  remove(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      if(this.pagination!.totalPages - this.pagination!.currentPage == 1 && this.pagination!.totalItems - (this.pagination!.currentPage * this.pagination!.itemsPerPage) == 1){
        this.loadProducts();
      }
      if(this.products?.length == 1 && this.pagination?.totalPages !=1){
        this.loadProducts();
      }
      else{
        this.products?.splice(
        this.products.findIndex((m) => m.id === id),1);
    }
      this.toastr.success('Product Deleted successfully');
      this.pagination!.totalItems--;
    });
  }
  

  removeSelected(){
    this.products?.forEach(element => {
      if(element.isChecked){
        this.remove(element.id)
      }  
    });
    this.count = 0;
  }
}
