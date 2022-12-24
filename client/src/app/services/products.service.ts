import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, of, take, tap } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from './account.service';
import { Product, updatePhoto } from '../models/Product';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';
import { PaginationService } from './pagination.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  baseUrl = environment.apiUrl;
  drafts: number;
  products: Product[] ;
  cacheKey : string;
  productCache = new Map<string, PaginatedResult<Product[]>>();
  draftCache = new Map<string, PaginatedResult<Product[]>>();


  constructor(private http: HttpClient, private paginationSerivce: PaginationService) {}

  getDrafts(userParams : UserParams) {
    let params = this.paginationSerivce.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    const cacheKey = Object.values(userParams).join('-');
    this.cacheKey = cacheKey;
    const response = this.draftCache.get(cacheKey);
    console.log(response, )
    console.log(cacheKey)
    console.log(this.draftCache)
    if(response) return of(response);

    return this.paginationSerivce.getPaginatedResult<Product[]>(`${this.baseUrl}drafts`,params)
    .pipe(
      tap(res =>this.draftCache.set(cacheKey, res))
    );
  }

  getProducts(userParams : UserParams) {
    const cacheKey = Object.values(userParams).join('-');
    this.cacheKey = cacheKey;
    const response = this.productCache.get(cacheKey);
    if(response) return of(response);
    let params = this.paginationSerivce.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minBuyPrice', userParams.minBuyPrice.toString());
    params = params.append('maxBuyPrice', userParams.maxBuyPrice.toString());
    params = params.append('minSellPrice', userParams.minSellPrice.toString());
    params = params.append('maxSellPrice', userParams.maxSellPrice.toString());
    params = params.append('minProfit', userParams.minProfit.toString());
    params = params.append('maxProfit', userParams.maxProfit.toString());
    params = params.append('soldCount', userParams.soldCount.toString());
    params = params.append('orderBy', userParams.orderBy);


    return this.paginationSerivce.getPaginatedResult<Product[]>(`${this.baseUrl}products`,params)
    .pipe(
      tap(res =>this.productCache.set(cacheKey, res))
    );
  }

  getDraftById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}drafts/${id}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}products/${id}`);
  }

  updateDraft(draft: Product) {
    return this.http.put(`${this.baseUrl}update-draft`, draft).pipe(
      tap(() => {
        const index1 = this.draftCache.get(this.cacheKey)?.result.indexOf(draft);
        this.draftCache.get(this.cacheKey)?.result[index1!] == draft;
      })
    );
  }

  toProducts(draft: Product) {
    return this.http.put(`${this.baseUrl}update-draft`, draft).pipe(
      tap(() => {
        this.productCache.clear(); //To force getProducts to render
        if((this.draftCache.get(this.cacheKey)?.result.length == 1)){
        this.draftCache.get(this.cacheKey)!.pagination.currentPage--;
      }
      this.draftCache.clear()
      })
    );
  }

  toDrafts(draft: Product) {
    return this.http.put(`${this.baseUrl}update-draft`, draft).pipe(
      tap(() => {
        this.draftCache.clear(); //To force getDrafts to render
      })
    );
  }


  deleteDraft(id: number) {
    return this.http.delete(this.baseUrl + 'delete-draft/' + id)
    .pipe(tap( (t: any) => {
      if(this.draftCache.get(this.cacheKey)?.result.length == 1) {
        this.draftCache.get(this.cacheKey)!.pagination.currentPage--;
        this.draftCache.clear()
        // this.getDrafts(new UserParams())
      }
      else{
        this.decreaseTotalItemsCache()
        this.draftCache.clear()
      }
    }));
  }

  createDraft(productId: string) {
    const cache = this.draftCache.get(this.cacheKey);
    const createDraft = { productId };
    return this.http.post(this.baseUrl + 'add-draft', createDraft)
      .pipe(tap((draft: any) =>{
        if((cache?.pagination.currentPage == cache?.pagination.totalPages) && (cache!.pagination.totalItems % cache!.pagination.itemsPerPage !=0))
        {
        this.draftCache.get(this.cacheKey)?.result.push(draft);
        this.increaseTotalItemsCache()
        }
        else{
          this.increaseTotalItemsCache()
        }
      }
      ));
  }

  increaseTotalItemsCache(){
      for (const value of this.draftCache.values()) {
        value.pagination.totalItems++;
      }
    }

    decreaseTotalItemsCache(){
      for (const value of this.draftCache.values()) {
        value.pagination.totalItems--;
      }
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
