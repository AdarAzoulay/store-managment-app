import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from '../models/member';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  @ViewChild('editForm') editForm: NgForm;

  member: Member;
  user: User;
  modalRef?: BsModalRef;
  changePasswordForm: FormGroup;
  validationErrors: string[] = [];
  changePassObj = {}

  constructor(
    private accountService: AccountService,
    private modalService: BsModalService,
    private memberService: MembersService,
    private toastr: ToastrService,
    private fb: FormBuilder

  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(){
    this.loadMember();
  }
  
  openModal(template: TemplateRef<any>) {
    this.initializeForm();
    this.modalRef = this.modalService.show(template,
      { class: 'modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  updateMember() {
    this.member.additionalProfit = parseFloat(this.member.additionalProfit.toFixed(2));
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });
}

initializeForm() {
  this.changePasswordForm = this.fb.group({
    currentPassword: ['', [
      Validators.required,
      Validators.minLength(6),
     ]],
     newPassword:['', [
      Validators.required,
      Validators.minLength(6),
    ]],
    confirmPassword:['', [
      Validators.required,
       this.matchValues('newPassword')
    ]],

  });
  this.changePasswordForm.get('newPassword')?.valueChanges.subscribe(() => {
    this.changePasswordForm.get('confirmPassword')?.updateValueAndValidity();
  });
}

matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control?.value === (control?.parent as FormGroup)?.controls[matchTo].value ? null : { isMatching: true };
    // if the control is not valid, return {isMatching: true} (the validator error)
  }
}

changePassword() {
   this.changePassObj ={...this.changePasswordForm.value , userName : this.user.username };
  this.accountService.changePassword(this.changePassObj).subscribe(res=>{
    this.toastr.success("Password change succefully");
    this.modalRef?.hide();
  },
  (err)=>{
    this.validationErrors= err;
  })

}
}
