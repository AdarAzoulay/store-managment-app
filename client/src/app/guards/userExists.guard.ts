import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({providedIn: 'root'})
export class UserExists implements CanActivate {
    constructor(private accountService: AccountService, private toastr: ToastrService, private router : Router) { }

    canActivate() : boolean  {
        if (this.accountService.isSignedIn) {
            this.router.navigate(["/"]); 
            return false;
          }
          return true;
        }
      }
