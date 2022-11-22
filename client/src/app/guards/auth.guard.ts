import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private toastr: ToastrService, private router : Router) { }

    canActivate() : Observable<boolean> {
        return this.accountService.currentUser$.pipe(
            map(user=>{
                if (user) return true;
                this.router.navigateByUrl("/login")
                this.toastr.error('Not allowed to pass');

                return false;
            })
        )
    }
}