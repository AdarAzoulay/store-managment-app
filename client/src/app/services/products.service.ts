import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, take, tap } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from './account.service';
import { Product, ProductUpload } from '../models/Product';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  baseUrl = environment.apiUrl;
  prevUser = '';
  drafts: Product[] = [];

  constructor(private http: HttpClient) {
  }

  getDrafts() {
    return this.http.get<Product[]>(`${this.baseUrl}drafts`)
      .pipe(tap((drafts) => (this.drafts = drafts)));
  }

//   getMemberOrders(username: string) {

//         return this.http.get<Order[]>(`${this.baseUrl}orders/${username}`)
//         // .pipe(tap((orders) => (this.userOrders = orders)));

//   }

  updateDraft(draft: Product) {
    return this.http.put(`${this.baseUrl}update-draft`, draft)
  }

  uploadDraft(draft: Product) {
    return this.http.put(`${this.baseUrl}update-draft`, draft).pipe(
      tap(() => {
        const index1 = this.drafts.indexOf(draft);
        this.drafts[index1] == draft;
      })
    );
  }

  deleteDraft(id:number) {
    return this.http.delete(this.baseUrl + 'delete-draft/' + id);
  }
}
