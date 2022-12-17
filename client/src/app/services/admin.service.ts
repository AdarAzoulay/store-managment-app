import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserParams, UserParamsAdmin } from '../models/userParams';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient, private paginationSerivce: PaginationService) { }

  getUsersWithRoles(userParams : UserParamsAdmin){
    let params = this.paginationSerivce.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return this.paginationSerivce.getPaginatedResult<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles',params);
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(`${this.baseUrl}admin/edit-roles/${username}?roles=${roles}`, {});
  }
  
}
