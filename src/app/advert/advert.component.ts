import { Component, OnInit } from '@angular/core';
import {ProductDataService} from "../core/product-data.service";
import {Product} from "../core/models/product";

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  productList:Product[] = [];
  constructor(private productDataService:ProductDataService){}
  getProductList(){
    const limit:number = 12;
    for (let i = 0; i <11; i+=4) {
      this.productDataService.getProductList(limit,i).subscribe((res:Product[])=>
      {
        this.productList = res;
      });
    }

  }

  loadMoreProducts(){
    const limit:number = 4;
    this.productDataService.getProductList(limit,this.productList.length).subscribe((res:Product[]) =>
    {
      res.forEach(item => this.productList.push(item));
    });
  }

  ngOnInit(){
    this.getProductList();
  }

  ngOnDestroy(){
    this.productList = [];
  }

}
