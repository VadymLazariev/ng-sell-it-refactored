import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "./models/product";
import {Observable} from "rxjs/internal/Observable";
import {ProductDataService} from "./product-data.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdvertResolve implements Resolve<Product> {
  constructor(private productService: ProductDataService) {

  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Product> | Promise<Product> | Product {
    return this.productService.getProduct(route.params.id)
  }
}

