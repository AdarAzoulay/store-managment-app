import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, take, tap } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from './account.service';
import { Product , updatePhoto} from '../models/Product';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  baseUrl = environment.apiUrl;
  drafts: Product[] = [];
  products: Product[] = [];
  constructor(private http: HttpClient) {
  }

  getDrafts() {
    if (this.drafts.length > 0) {
      return of(this.drafts); 
    }
    return this.http.get<Product[]>(`${this.baseUrl}drafts`)
      .pipe(tap((drafts) => (this.drafts = drafts)));
  }

  getProducts(){
    if (this.products.length > 0) {
      return of(this.products); 
    }
    return this.http.get<Product[]>(`${this.baseUrl}products`)
      .pipe(tap((products) => (this.products = products)));
  }

  getDraftById(id:number){
    return this.http.get<Product>(`${this.baseUrl}drafts/${id}`)
  }

  updateDraft(draft: Product) {
    return this.http.put(`${this.baseUrl}update-draft`, draft).pipe(
          tap(() => {
            const index1 = this.drafts.indexOf(draft);
            this.drafts[index1] == draft;
          })
        );
  }

  // uploadDraft(draft: Product) {
  //   return this.http.put(`${this.baseUrl}update-draft`, draft).pipe(
  //     tap(() => {
  //       const index1 = this.drafts.indexOf(draft);
  //       this.drafts[index1] == draft;
  //     })
  //   );
  // }

  deleteDraft(id:number) {
    return this.http.delete(this.baseUrl + 'delete-draft/' + id);
  }

  createDraft(productId:string){
    const createDraft = {productId: productId};
    return this.http.post(this.baseUrl + 'add-draft' , createDraft)
    .pipe(tap((draft:any) => ( this.drafts.push(draft))));
   
  }

  setMainPhoto(updatePhoto: updatePhoto) {
    return this.http.put(`${this.baseUrl}set-main-photo`, updatePhoto); 
  }

  deletePhoto(updatePhoto: updatePhoto) {
    return this.http.delete(`${this.baseUrl}delete-photo`, {body:updatePhoto}); 
  }
}
