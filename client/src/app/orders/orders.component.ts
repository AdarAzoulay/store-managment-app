import { Component } from '@angular/core';
import { Order } from '../models/order';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];

  constructor(private memberService : MembersService){}

  ngOnInit(): void {
    this.loadOrder();
  }
  loadOrder() {
    this.memberService.getOrders().subscribe(
      orders=>this.orders=orders)
  }
}
