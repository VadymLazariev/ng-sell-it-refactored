import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {concatMap, map, switchMap} from "rxjs/operators";
import {ApiUrls} from "./api-urls";
import {DataResponse} from "./data-response";
import {Product} from "./models/product";
import {Observable} from "rxjs/internal/Observable";
import {from} from "rxjs/internal/observable/from";


@Injectable()
export class ProductDataService {
  constructor(private  http: HttpClient) {
  }

  getProductList(limit: number , offset: number ): Observable<Product[]> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<Product[]>(ApiUrls.adverts, {params: params})
      .pipe(
        map((response: DataResponse) => {
          let result: Product[] = [];
          response.results.forEach(
            item => {
              this.isNoImage(item);
              result.push(new Product(item));
            }
          );
          return result;
        }));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(ApiUrls.adverts + id.toString() + '/').pipe(
      map((product) => {
        this.isNoImage(product);
        return product;
      }))
  }

  public createProduct(productInfo: Product, images?: any) {
    return this.http.post(ApiUrls.adverts, productInfo)
      .pipe(
        switchMap((value: any) => {
          return from(images).pipe(
            concatMap((image: any) => {
              const body = {advert: value.pk, file: image};
              return this.http.post(`${ApiUrls.adverts}${value.pk}/image/`, body)
            })
          );
        })
      );
  }

  isNoImage(product: Product) {
    if (product.images[0] === undefined) {
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
