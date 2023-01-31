import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

 
@Pipe({ name: 'searchByUserId' })
export class searchByUserIdPipe implements PipeTransform {
  transform(products: Product[], searchText: string) {
    return products?.filter(product => product.userid.toString().indexOf(searchText) !== -1);
  }
}