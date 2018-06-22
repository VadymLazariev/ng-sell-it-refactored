import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdvertComponent} from "./advert.component";
import {AdvertItemComponent} from "./advert-item/advert-item.component";
import {AdvertResolve} from "../core/advert.resolve";
import {DetailsComponent} from "../details/details.component";

const routes: Routes = [
  {path:'', component: AdvertComponent},
  {path:':id', component: DetailsComponent, resolve: {data: AdvertResolve}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertRoutingModule { }
