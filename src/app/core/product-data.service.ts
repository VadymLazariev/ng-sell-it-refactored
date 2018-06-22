import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ApiUrls} from "./api-urls";
import {DataResponse} from "./data-response";
import {Product} from "./models/product";
import {Observable} from "rxjs/internal/Observable";


@Injectable()
export class ProductDataService {
  constructor(private  http:HttpClient ) {
  }

  getProductList(limit:number = 4,offset:number = 0): Observable<Product[]>{
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<Product[]>(ApiUrls.adverts , {params:params})
      .pipe(
        map((response:DataResponse) => {
          let result: Product[] = [];
          response.results.forEach(
            item => {
              this.isNoImage(item);
              result.push(new Product(item))
              console.log('ITEM:'+item)
            }

          );
          return result;}));
  }

  getProduct(id:number) : Observable<Product>{
    return this.http.get<Product>(ApiUrls.adverts  + id.toString() + '/').pipe(
      map((product) => {
          this.isNoImage(product);
          return product;
        }))
  }

  isNoImage(product:Product){
      if(product.images[0] === undefined){
          product.images.push(
            {
              pk: null,
              advert: null,
              file: ApiUrls.noImage
            }
          );
      }

  }
}
