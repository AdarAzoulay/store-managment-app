import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../models/order';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {
  customOrder!: Order;
  oldOrderDetails: Order;
  @ViewChild('editForm') editForm?: NgForm;
  @ViewChild('editForm2') editForm2?: NgForm;

  constructor(public bsModalRef: BsModalRef,private toastr: ToastrService,private memberService: MembersService) {
    this.oldOrderDetails =  this.customOrder;
   }

  ngOnInit() {
  }

  cancel(){
    this.bsModalRef.hide();
    this.customOrder = this.oldOrderDetails;
  }
 
  updateOrder(){
    this.memberService.updateOrder(this.customOrder).subscribe(()=>{
      this.toastr.success('Order updated successfully');
      this.editForm?.reset(this.customOrder);
      this.bsModalRef.hide();
    })
  }

}
