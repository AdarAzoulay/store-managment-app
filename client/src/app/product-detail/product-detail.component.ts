import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.isExists();
    this.loadOrder();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 5, // number of images in a row under the main image
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  loadOrder() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.productService.getDraftById(Number(id)).subscribe(
      {
        next: (product) => {
          this.product = product;
          this.galleryImages = this.getImages();
        },
        error: (e) => {
                this.router.navigate(['/products']);
        },
      }
    );
  }

  getImages(): NgxGalleryImage[] {
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

  // isExists() {
  //   const id = this.route.snapshot.paramMap.get('id') as string;
  //   this.productService.getDraftById(Number(id)).subscribe(
  //     {
  //       next: (v) => {},
  //       error: (e) => {
  //         if (e === null) {
  //               this.toastr.error(`No product found with ID: ${id}`)
  //               this.router.navigate(['/products']);
  //             }
  //       },
  //     }
  //   );
  // }
}
