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
    // const productId = this.walmartUrl.substring(this.walmartUrl.indexOf("?")-8,this.walmartUrl.indexOf("athpgid")-1)
    const productId = this.walmartUrl.substring(this.walmartUrl.indexOf("?")-9,this.walmartUrl.indexOf("?"));
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
