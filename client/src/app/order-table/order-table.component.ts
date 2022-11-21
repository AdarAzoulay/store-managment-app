import { Component } from '@angular/core';
import { Order } from '../models/order';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent {
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
