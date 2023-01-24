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


  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
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
    this.productService.toDrafts(draft).subscribe(() => {
      this.products?.splice(
        this.products.findIndex((m) => m.id === draft.id),
        1
        );
        this.toastr.success('Product Back To Drafts..');
        this.pagination!.totalItems--;
    });
  }

  resetFilters() {
    this.userParams = new UserParams(); // to reset the params and reload the members data
    this.loadProducts();
  }

  remove(id: number) {
    this.productService.deleteDraft(id).subscribe(() => {
      this.products?.splice(
        this.products.findIndex((m) => m.id === id),
        1
      );
      this.toastr.success('Products Deleted successfully');
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
