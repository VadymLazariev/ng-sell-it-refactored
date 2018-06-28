import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import {AddProductComponent} from "./add-product.component";
import {AuthService} from "../core/auth.service";
import {ProfileService} from "../core/profile.service";
import {SessionService} from "../core/session.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "../ui/ui.module";

@NgModule({
  imports: [
    CommonModule,
    AddProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ],
  declarations: [
    AddProductComponent
  ],
  providers:[AuthService,ProfileService,SessionService]
})
export class AddProductModule { }
