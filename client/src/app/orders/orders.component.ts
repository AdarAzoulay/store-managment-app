import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];

  constructor(private orderService : OrdersService){}

  ngOnInit(): void {
    // this.loadOrder();
  }
  // loadOrder() {
  //   this.orderService.getOrders().subscribe(
  //     orders=>this.orders=orders)
  // }
}
