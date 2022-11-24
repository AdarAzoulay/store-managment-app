import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member, MemberWithoutProducts } from '../models/member';
import { Order } from '../models/order';
import { map } from 'rxjs';
import { OrderChange } from '../models/orderChange';

@Injectable({ providedIn: 'root' })
export class MembersService {
  baseUrl = environment.apiUrl;
  orders:Order[] = []

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}users`);
  }
  
  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  getOrders(){
    return this.http.get<Order[]>(`${this.baseUrl}orders`);
  }

  getMemberOrders(username: string) {
    return this.http.get<MemberWithoutProducts>(`${this.baseUrl}orders/${username}`).pipe(
        map((response: MemberWithoutProducts) =>{ 
            const orders = response.orders;
            return orders;
          })
    );
  }

  updateOrder(order: OrderChange) {
    return this.http.put(`${this.baseUrl}orders`, order);
  }
}
