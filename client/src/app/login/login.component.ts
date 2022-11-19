import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
 
  model: any = {};
  currentUser$: Observable<User>;

  constructor(private accountService: AccountService,private router :Router,private toastr: ToastrService) 
  {
    this.currentUser$ = this.accountService.currentUser$;
  }


  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        this.router.navigateByUrl('/');
        console.log(response);
      },
      )
  }


  
}
