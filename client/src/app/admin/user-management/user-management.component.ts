import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParamsAdmin } from 'src/app/models/userParams';
import { RolesModalComponent } from 'src/app/roles-modal/roles-modal.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]> = [];
  pagination: Pagination;
  userParams: UserParamsAdmin;
  bsModalRef: BsModalRef;
  options = [1, 5, 10];
  selectedValue :number;

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.userParams = new UserParamsAdmin();
  }

  ngOnInit(): void {
    this.selectedValue = this.userParams.pageSize;
    this.getUsersWithRoles();
  }

  onChange(newValue: any) {
    this.userParams.pageSize = newValue;
    this.pagination.currentPage = 1;
    this.getUsersWithRoles();
  }

  // users: Partial<User[]>
  getUsersWithRoles() {
    this.adminService.getUsersWithRoles(this.userParams).subscribe((res) => {
      // this.drafts = res.result;
      this.pagination = res.pagination;
      console.log(res);
      this.users = res.result;
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.getUsersWithRoles();
  }

  openRolesModal(user: User) {
    const config: ModalOptions = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user),
      } as Partial<Object>,
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {
      const roleValues = values.filter((el) => el.checked).map((el) => el.name);

      if (roleValues.length) {
        this.adminService.updateUserRoles(user.username, roleValues).subscribe(
          () => {
            user.roles = roleValues;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.toastr.error(`User ${user.username} can't be with no roles!`);
      }
    });
  }

  getRolesArray(user: User) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Member', value: 'Member' },
    ];
    console.log(roles);
    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (userRole === role.value) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }
}
