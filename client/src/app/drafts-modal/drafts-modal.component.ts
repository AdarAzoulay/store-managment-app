import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-drafts-modal',
  templateUrl: './drafts-modal.component.html',
  styleUrls: ['./drafts-modal.component.css']
})
export class DraftsModalComponent {
  customDraft: Product;


  constructor(private productService : ProductsService,private toastr: ToastrService,public bsModalRef: BsModalRef){}

  cancel(){
    this.bsModalRef.hide();
  }

  updateDraft(){
    this.productService.updateDraft(this.customDraft).subscribe(()=>{
      this.toastr.success('Order updated successfully');
      // this.editForm?.reset(this.customDraft);
      this.bsModalRef.hide();
    })
  }

}
