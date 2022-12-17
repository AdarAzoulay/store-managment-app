import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable, take } from 'rxjs';
import { Order } from '../models/order';
import { User } from '../models/user';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent {
  bsModalRef?: BsModalRef;
  orders$: Observable<Order[]>
  user : User = {token: '', username: '',roles:[]};

  constructor(private orderService: OrdersService,private accountService: AccountService,private modalService: BsModalService){}

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.orders$ = this.orderService.getMemberOrders(this.user.username);
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
