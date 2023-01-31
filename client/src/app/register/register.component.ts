import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private fb: FormBuilder,private accountService : AccountService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();

  }
  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
       ]],
      confirmPassword:['', [
        Validators.required,
         this.matchValues('password')
      ]],

    });
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control?.value === (control?.parent as FormGroup)?.controls[matchTo].value ? null : { isMatching: true };
      // if the control is not valid, return {isMatching: true} (the validator error)
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(res=>{
      this.router.navigateByUrl('/');
    },
    (err)=>{
      this.validationErrors= err;
    })

  }

}
