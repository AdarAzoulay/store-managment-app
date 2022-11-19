import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser$: Observable<User>;

  @Input() status: boolean = false;
  @Output() changeStatus : EventEmitter<boolean> = new EventEmitter();

  constructor(private accountService: AccountService , private router : Router){
    this.currentUser$ = this.accountService.currentUser$;

  }

  public clickEvent() {
    this.status = !this.status;
    this.changeStatus.emit(this.status);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login')
  }
  
}
