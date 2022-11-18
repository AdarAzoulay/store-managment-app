import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(private accountService: AccountService) 
  {
    this.currentUser$ = this.accountService.currentUser$;
  }


  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);

      })
  }


  
}
