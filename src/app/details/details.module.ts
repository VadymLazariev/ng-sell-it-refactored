import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import {ProductDataService} from "../core/product-data.service";
import {DetailsComponent} from "./details.component";

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule
  ],
  declarations: [

  ],
  providers: [ProductDataService]
})
export class DetailsModule { }
