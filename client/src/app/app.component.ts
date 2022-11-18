import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'managment';
  users: any;
  status: boolean = false;
  loggedIn: boolean = false;

  constructor(private http: HttpClient,private accountService: AccountService) {}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userFromLS:any = localStorage.getItem('user');
    const user: User = JSON.parse(userFromLS);
    this.accountService.setCurrentUser(user);
  }
  

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('comleted');
      }
    );
  }
}
