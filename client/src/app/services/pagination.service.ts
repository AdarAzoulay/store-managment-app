import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from '../models/pagination';

@Injectable({providedIn: 'root'})
export class PaginationService {
    constructor(private http: HttpClient) { }
    
    getPaginatedResult<T>(url:string, params: HttpParams) {
        const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
        return this.http.get<T>(url,
          {
            observe: 'response',
            params
          }).pipe(
            map(response => {
              paginatedResult.result = response.body as T;
              if (response.headers.get('Pagination') !== null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
              }
              return paginatedResult;
            })
          );
      }
    
      getPaginationHeaders(pageNumber:number, pageSize:number) {
        let headers = new HttpParams();
        headers = headers.append('pageNumber', pageNumber.toString());
        headers = headers.append('pageSize', pageSize.toString());
        console.log(headers)
        return headers;
      }
}