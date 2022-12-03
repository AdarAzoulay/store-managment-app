import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MembersService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();


  constructor(private http: HttpClient) {}

  getMembers(page?:number, itemsPerPage?:number) {
    //create params, help to serialize parameters and adding to the query string
    let params = new HttpParams();

    if(page != null && itemsPerPage != null) 
    {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Member[]>(`${this.baseUrl}users`,
    {
      observe: 'response',
      params
    }).pipe(
      map(response=>{
        this.paginatedResult.result = response.body as Member[];
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
        }
        return this.paginatedResult;
      })
    );
  }
  
  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

}
