import { Component } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DraftsModalComponent } from '../drafts-modal/drafts-modal.component';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-drafts-table',
  templateUrl: './drafts-table.component.html',
  styleUrls: ['./drafts-table.component.css'],
})
export class DraftsTableComponent {
  drafts: Product[] = [];
  bsModalRef: any;

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.loadDrafts();
  }
  loadDrafts() {
    this.productService.getDrafts().subscribe((res) => {
      this.drafts = res;
    });
  }

  openModalWithComponent(draft: Product) {
    const initialState: ModalOptions = {
      initialState: {
        customDraft: draft,
      } as Partial<Object>,
    };
    this.bsModalRef = this.modalService.show(
      DraftsModalComponent,
      initialState
    );
  }

  import(draft: Product) {
    draft.isUploaded = true;
    this.productService.updateDraft(draft).subscribe(() => {
      this.drafts.splice(
        this.drafts.findIndex((m) => m.id === draft.id),1);
      this.toastr.success('Draft uploaded successfully');
    });
  }

  remove(id: number) {
    this.productService.deleteDraft(id).subscribe(() => {
      this.drafts.splice(
        this.drafts.findIndex((m) => m.id === id),1);
      this.toastr.success('Draft Deleted successfully');
    });
  }
}
