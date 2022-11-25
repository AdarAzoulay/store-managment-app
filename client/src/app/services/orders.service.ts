import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { of, take, tap } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  baseUrl = environment.apiUrl;
  prevUser = '';
  orders: Order[] = [];
  userOrders: Order[] = [];


  constructor(private http: HttpClient) {
  }

  getOrders() {
    if (this.orders.length > 0) {
      return of(this.orders); //'of' will create an observable with one value
    }
    return this.http.get<Order[]>(`${this.baseUrl}orders`)
      .pipe(tap((orders) => (this.orders = orders)));
  }

  getMemberOrders(username: string) {
    if(this.prevUser !== username)
    {
        this.prevUser = username;
        return this.http.get<Order[]>(`${this.baseUrl}orders/${username}`)
        .pipe(tap((orders) => (this.userOrders = orders)));
    }
    else return of(this.userOrders);

  }

  updateOrder(order: Order) {
    return this.http.put(`${this.baseUrl}orders`, order).pipe(
      tap(() => {
        const index1 = this.orders.indexOf(order);
        this.orders[index1] == order;
        const index2 = this.userOrders.indexOf(order);
        this.userOrders[index2] == order;
      })
    );
  }

}
