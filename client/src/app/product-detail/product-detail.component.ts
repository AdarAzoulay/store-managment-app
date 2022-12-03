import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product : Product;
  galleryOptions: NgxGalleryOptions[]
  galleryImages: NgxGalleryImage[]

  constructor(private productService : ProductsService, private route : ActivatedRoute){}

  ngOnInit() : void {
    this.loadOrder();
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 5,// number of images in a row under the main image
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
    }];
  }

  loadOrder() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.productService.getDraftById(Number(id)).subscribe(product => 
    {
      this.product = product
      this.galleryImages = this.getImages();
    });
  }

  getImages():NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        // optional chaining because product may not have photos
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

}
