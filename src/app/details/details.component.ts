import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductDataService} from "../core/product-data.service";
import {Product} from "../core/models/product";
import {Subject} from "rxjs/internal/Subject";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public loading$ = new BehaviorSubject(true);
  private destroy = new Subject();
  public product: Product;

  constructor(
    private dataProductsService: ProductDataService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      product => {
        this.product = product.data;
        console.log("product: " + JSON.stringify(product.data));
      },
      err => {
        console.log(err.message);
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.loading$.complete();
  }

}
