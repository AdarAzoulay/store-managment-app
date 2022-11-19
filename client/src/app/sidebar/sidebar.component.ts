import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() status: boolean = false;
  currentUser$: Observable<User>;
  
  constructor(private accountService : AccountService){
    this.currentUser$ = accountService.currentUser$;
  }
ngOnInit(){
  console.log(this.status)
}
  }

