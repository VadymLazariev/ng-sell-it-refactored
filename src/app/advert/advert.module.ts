import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertRoutingModule } from './advert-routing.module';
import { AdvertComponent } from './advert.component';
import {AdvertItemComponent} from "./advert-item/advert-item.component";
import {ProductDataService} from "../core/product-data.service";
import {AdvertResolve} from "../core/advert.resolve";
import {DetailsComponent} from "../details/details.component";

@NgModule({
  imports: [
    CommonModule,
    AdvertRoutingModule
  ],
  declarations: [
    AdvertComponent,
    AdvertItemComponent,
    DetailsComponent
  ],
  providers:[ProductDataService,AdvertResolve],
  exports:[AdvertComponent,AdvertItemComponent]
})
export class AdvertModule { }
