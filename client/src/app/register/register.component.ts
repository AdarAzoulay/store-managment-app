import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: any = {};

  constructor(private accountService : AccountService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('/');
    },
    (err)=>{
      console.log(err);
      this.toastr.error(err.error);
    })
  }

}
