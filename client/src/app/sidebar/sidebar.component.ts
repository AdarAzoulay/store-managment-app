import { Component, Input, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() status: boolean = false;
  modalRef?: BsModalRef;
  currentUser$: Observable<User>;
  walmartUrl: string;

  constructor(
    private accountService: AccountService,
    private modalService: BsModalService,
    private productService: ProductsService,
    private toastr: ToastrService,
    private router : Router
  ) {
    this.currentUser$ = accountService.currentUser$;
  }
  ngOnInit() {
    console.log(this.status);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createDraft(form:NgForm) {
    let productId;
    if(/\d/.test(this.walmartUrl[this.walmartUrl.length-1]) && /\d/.test(this.walmartUrl.slice(-5))){
      productId = this.walmartUrl.substring(this.walmartUrl.length-11,this.walmartUrl.length );
      productId = productId.replace(/\D/g,'');
    }
    else{
      productId = this.walmartUrl.substring(this.walmartUrl.indexOf("?")-11,this.walmartUrl.indexOf("?"));
      productId = productId.replace(/\D/g,'');
    }
    console.log(productId)
    this.productService.createDraft(productId).subscribe((res) => {
      this.toastr.success('Draft Uploaded Successfully');
      this.modalRef?.hide();
      form.reset();
    },(error)=>{
      this.modalRef?.hide();
      form.reset();
    });
  }
}
