import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { map, of, tap } from 'rxjs';
import { UserParams } from '../models/userParams';

@Injectable({ providedIn: 'root' })
export class MembersService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  member : Member;


  constructor(private http: HttpClient) {}

  getMembers(userParams : UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    return this.getPaginatedResult<Member[]>(`${this.baseUrl}users`,params);
  }
  
  getMember(username: string) {
    if(this.member) return of(this.member)
    return this.http.get<Member>(`${this.baseUrl}users/${username}`).pipe(tap(res=>{
      this.member = res;
    }));
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}users`, member);
  }


  private getPaginatedResult<T>(url:string, params: HttpParams) {
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

  private getPaginationHeaders(pageNumber:number, pageSize:number) {
    const headers = new HttpParams();
    headers.append('Pagination', JSON.stringify({pageNumber,pageSize}));
    return headers;
  }

}
