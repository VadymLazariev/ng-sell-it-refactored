import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddProductRoutingModule} from './add-product-routing.module';
import {AddProductComponent} from "./add-product.component";
import {AuthService} from "../core/auth.service";
import {ProfileService} from "../core/profile.service";
import {SessionService} from "../core/session.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "../ui/ui.module";
import {AppErrorHandlerModule} from "../shared/components/error-handler/app-error-handler.module";

@NgModule({
  imports: [
    CommonModule,
    AddProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    AppErrorHandlerModule
  ],
  declarations: [
    AddProductComponent,
  ],
  providers: [AuthService, ProfileService, SessionService]
})
export class AddProductModule {
}
