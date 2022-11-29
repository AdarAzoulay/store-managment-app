import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../models/photo';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent {
  @Input() draft: Product;

  constructor(private productService : ProductsService, private toatsr : ToastrService) { }

  ngOnInit(): void {
  }
  setMainPhoto(photo: Photo) {
    this.productService.setMainPhoto({productId : this.draft.id, photoId : photo.id}).subscribe(() => {
      this.draft.photoUrl = photo.url;
      this.draft.photos.forEach((p: Photo) => { 
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
      this.toatsr.success("Main image saved !")
    });
  }

  deletePhoto(photo: Photo) {
    this.productService.deletePhoto({productId : this.draft.id, photoId : photo.id}).subscribe(() => {
     this.draft.photos =  this.draft.photos.filter((p : Photo) => p.id !== photo.id);
      this.toatsr.success("Image Deleted !")
    });
  }
}
