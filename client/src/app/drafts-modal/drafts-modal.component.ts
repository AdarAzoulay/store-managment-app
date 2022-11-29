import { Component } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
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
  draft:Product;
  customDraft: Product;
  

  constructor(private productService : ProductsService,private toastr: ToastrService,public bsModalRef: BsModalRef){}

  ngOnInit(){
 
  }

  cancel(){
    this.bsModalRef.hide();
  }

  updateDraft(){
    this.productService.updateDraft(this.customDraft).subscribe(()=>{
      this.toastr.success('Draft updated successfully');
      // this.editForm?.reset(this.customDraft);
      this.bsModalRef.hide();
    })
  }



}
