import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, of, take, tap } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from './account.service';
import { Product, updatePhoto } from '../models/Product';
import { PaginatedResult } from '../models/pagination';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  baseUrl = environment.apiUrl;
  drafts: Product[] ;
  products: Product[] ;
  paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();

  constructor(private http: HttpClient) {}

  getDrafts(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    // if (this.drafts.length > 0) {
    //   return of(this.drafts);
    // }
    return this.http.get<Product[]>(`${this.baseUrl}drafts`,
    {
      observe:'response', 
      params
    }).pipe(
      map(response => {
        this.paginatedResult.result = response.body as Product[];
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
        }
        return this.paginatedResult;
      })
      );

      // .pipe(tap((drafts) => (this.drafts = drafts)));
  }

  getProducts(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    // if (this.products.length > 0) {
    //   return of(this.products);
    // }
    return this.http.get<Product[]>(`${this.baseUrl}products`,
    {
      observe:'response',
      params
    }).pipe(
      map(response => {
        this.paginatedResult.result = response.body as Product[];
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
        }
        return this.paginatedResult;
      })
      );

      // .pipe(tap((products) => (this.products = products)));
  }

  getDraftById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}drafts/${id}`);
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

  deleteDraft(id: number) {
    return this.http.delete(this.baseUrl + 'delete-draft/' + id);
  }

  createDraft(productId: string) {
    const createDraft = { productId: productId };
    return this.http
      .post(this.baseUrl + 'add-draft', createDraft)
      .pipe(tap((draft: any) => this.drafts.push(draft)));
  }

  setMainPhoto(updatePhoto: updatePhoto) {
    return this.http.put(`${this.baseUrl}set-main-photo`, updatePhoto);
  }

  deletePhoto(updatePhoto: updatePhoto) {
    return this.http.delete(`${this.baseUrl}delete-photo`, {
      body: updatePhoto,
    });
  }
}
