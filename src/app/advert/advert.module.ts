import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvertRoutingModule} from './advert-routing.module';
import {AdvertComponent} from './advert.component';
import {AdvertItemComponent} from "./advert-item/advert-item.component";
import {ProductDataService} from "../core/product-data.service";
import {AdvertResolve} from "../core/advert.resolve";
import {DetailsComponent} from "../details/details.component";
import {UiModule} from "../ui/ui.module";
import {ScrollTopDirective} from "../shared/directives/scroll-top.directive";
import {InfinityScrollDirective} from "../shared/directives/infinity-scroll.directive";
import {ScrollTopComponent} from "../shared/scroll-top-button/scroll-top.component";
import {CarouselModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    AdvertRoutingModule,
    UiModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    AdvertComponent,
    AdvertItemComponent,
    DetailsComponent,
    ScrollTopDirective,
    ScrollTopComponent,
    InfinityScrollDirective,
  ],
  providers: [ProductDataService, AdvertResolve,
  ],
  exports: [AdvertComponent, AdvertItemComponent]
})
export class AdvertModule {
}
