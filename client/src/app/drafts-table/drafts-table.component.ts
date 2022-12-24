import { Component } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DraftsModalComponent } from '../drafts-modal/drafts-modal.component';
import { Pagination } from '../models/pagination';
import { Product } from '../models/Product';
import { UserParams } from '../models/userParams';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-drafts-table',
  templateUrl: './drafts-table.component.html',
  styleUrls: ['./drafts-table.component.css'],
})
export class DraftsTableComponent {
  drafts?: Product[];
  pagination?: Pagination;
  userParams: UserParams;
  bsModalRef: any;
  options = [1, 5, 10];
  selectedValue :number;


  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {this.userParams = new UserParams}

  ngOnInit(): void {
    this.selectedValue = this.userParams.pageSize;
    this.loadDrafts();
  }

  onChange(newValue: any) {
    this.userParams.pageSize = newValue;
    this.pagination!.currentPage = 1;
    this.loadDrafts();
  }

  loadDrafts() {
    this.productService.getDrafts(this.userParams).subscribe((res) => {
      this.drafts = res.result;
      this.pagination = res.pagination;
      console.log(res)
    });
  }

  openModalWithComponent(draft: Product) {
    let copy = {...draft}

    const initialState: ModalOptions = {
      initialState: {
        customDraft: draft,
        copy : copy
      } as Partial<Object>,
    };
    this.bsModalRef = this.modalService.show(
      DraftsModalComponent,
      initialState
    );
  }

  import(draft: Product) {
    console.log(this.drafts)
    draft.isUploaded = true;
    this.productService.toProducts(draft).subscribe(() => {
      if(this.drafts?.length != 1){
      this.drafts?.splice(
        this.drafts.findIndex((m) => m.id === draft.id),1);
      }
      this.toastr.success('Draft uploaded successfully');
    });
  }

  remove(id: number) {
    this.productService.deleteDraft(id).subscribe(() => {
      if(this.drafts?.length != 1){
      this.drafts?.splice(
        this.drafts.findIndex((m) => m.id === id),1);
      }
      this.toastr.success('Draft Deleted successfully');
    });
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.loadDrafts();
  }

}
