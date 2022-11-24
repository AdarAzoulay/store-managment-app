import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../models/order';
import { OrdersService } from '../services/orders.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {
  customOrder!: Order;
  @ViewChild('editForm') editForm?: NgForm;
  @ViewChild('editForm2') editForm2?: NgForm;

  constructor(public bsModalRef: BsModalRef,private toastr: ToastrService,private orderService: OrdersService) {
   }

  ngOnInit() {
  }

  cancel(){
    this.bsModalRef.hide();
  }
 
  updateOrder(){
    this.orderService.updateOrder(this.customOrder).subscribe(()=>{
      this.toastr.success('Order updated successfully');
      this.editForm?.reset(this.customOrder);
      this.bsModalRef.hide();
    })
  }

}
