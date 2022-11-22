import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Order } from '../models/order';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent {
  orders: Order[] = [];
  bsModalRef?: BsModalRef;
  constructor(private memberService : MembersService,private modalService: BsModalService){}

  ngOnInit(): void {
    this.loadOrder();
  }
  loadOrder() {
    this.memberService.getOrders().subscribe(
      orders=>this.orders=orders)
  }

  openModalWithComponent(order:Order ){
        const initialState: ModalOptions = {
      initialState: {
        customOrder : order 
      } as Partial<Object>
    };
    this.bsModalRef = this.modalService.show(OrderModalComponent,initialState);

  }




}
