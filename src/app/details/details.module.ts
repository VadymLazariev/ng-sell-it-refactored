import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import {ProductDataService} from "../core/product-data.service";
import {DetailsComponent} from "./details.component";
import {UiModule} from "../ui/ui.module";
import {AuthService} from "../core/auth.service";

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    UiModule
  ],
  declarations: [

  ],
  providers: [ProductDataService,AuthService]
})
export class DetailsModule { }
