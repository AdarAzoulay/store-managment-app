import { take } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user';

@Directive({
  selector: '[appHasRole]'
})

export class HasRoleDirective implements OnInit {
  user: User;
  @Input() appHasRole: string[];

  constructor(
    private viewContainerRef: ViewContainerRef,
    // in short this let us make the element a type of a hook for other html (templates) to added to or remove from

    private templateRef: TemplateRef<any>, 
    // this is a reference to the template (a chunk of html) that's inside the element.

    private accountService: AccountService 
  ) 
  {
    this.accountService.currentUser$.pipe(
      take(1) 
      ).subscribe(user => {
      this.user = user;
    }
    );
  }

  ngOnInit(): void {
    if(!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear(); // simply clear the container from the views that can be in there
      return;
    }

    if (this.user.roles?.some(r => this.appHasRole.includes(r))) { 
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainerRef.clear();
    }
  }
}
